import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter, HostListener, SimpleChanges, OnChanges, ElementRef } from '@angular/core';

@Component({
  selector: 'app-virtual-textarea',
  standalone:true,
  imports:[CommonModule],
  template: `
    <div class="virtual-textarea" [ngStyle]="{'height.px': size}" tabindex="0" (focus)="onFocus()" (blur)="onBlur()" (click)="focusTextarea()">
      <div *ngFor="let line of textArray; let i = index"
           [class.selected]="selectedLines.includes(i)"
           (click)="toggleSelection(i,$event)">
        {{ line }}
      </div>
    </div>
  `,
  styles: [`
    .virtual-textarea {
      border: 1px solid #ccc;
      padding: 10px;
      width: 100%;      
      overflow-y: auto;
      white-space: pre-wrap;
      font-family: monospace;
      cursor: pointer;
      box-sizing: border-box;
    }
    .virtual-textarea div {
      padding: 2px;
    }
    .virtual-textarea div.selected {
      background-color: #d3d3d3;
    }
  `]
})
export class VirtualTextareaComponent implements OnChanges{
  @Input() textArray: string[] = [];
  @Input() size: number = 12;
  @Output() textArrayChange = new EventEmitter<string[]>();

  selectedLines: number[] = [];
  private isFocused = false;

  constructor(private elRef: ElementRef){
    
  }

  onFocus() {
    this.isFocused = true;
  }

  onBlur() {
    this.isFocused = false;
  }

  focusTextarea() {
    this.elRef.nativeElement.querySelector('.virtual-textarea').focus();
  }
  ngOnChanges(changes: SimpleChanges) {
    if (changes['size']) {
      this.calculateHeight();
    }
  }
  
  toggleSelection(index: number,event: Event) {

    event.stopPropagation(); // Impede que o evento clique afete outros elementos

    if (this.selectedLines.includes(index)) {
      // Remove selection if already selected
      this.selectedLines = this.selectedLines.filter(i => i !== index);
    } else {
      // Add selection if not already selected
      this.selectedLines.push(index);
    }
    
    this.emitSelectedLines();
  }

  emitSelectedLines() {
    const selected = this.selectedLines.map(i => this.textArray[i]);
    if (this.selectedLines.length > 0) {
      this.textArrayChange.emit(selected);
    }    
  }

  clearSelection() {
    this.selectedLines = []; 
    this.emitSelectedLines();   
  }

   // Listener para eventos de teclado
   @HostListener('document:keydown.control.a', ['$event'])
   handleCtrlA(event: KeyboardEvent) {
    if (this.isFocused) {
      event.preventDefault(); // Evita o comportamento padrão do navegador
      this.selectAll();
    }
   }
 
   selectAll() {
     this.selectedLines = this.textArray.map((_, index) => index);
     this.emitSelectedLines();
   }

   private calculateHeight() {
    // Suponha que cada linha tenha uma altura fixa, ajustada conforme necessário
    const lineHeight = 20; // Altura de cada linha em pixels
    this.size = this.size * lineHeight;
  }
}
