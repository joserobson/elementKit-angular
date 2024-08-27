import {
  Component,
  forwardRef,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { VirtualTextareaComponent } from '../virtual-textarea/virtual-textarea.component';

@Component({
  selector: 'app-text-selector',
  templateUrl: './text-selector.component.html',
  styleUrls: ['./text-selector.component.scss'],
  imports:[VirtualTextareaComponent],
  standalone:true,  
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TextSelectorComponent),
      multi: true,
    },
  ],
})
export class TextSelectorComponent
  implements OnInit, ControlValueAccessor, OnChanges
{
  @Input() todasAsTabelas: string[] = [];
  @Input() tabelasPreSelecionadas: string[] = [];
  @Input() size: number = 12;

  @ViewChild('leftTextarea') leftTextarea!: VirtualTextareaComponent;
  @ViewChild('rightTextarea') rightTextarea!: VirtualTextareaComponent;

  tabelasEnviadasParaLadoDireito: string[] = [];
  tabelasDisponiveisLadoEsquerdo: string[] = [];

  tabelasSelecionadasDoLadoEsquerdo: string[] = [];
  tabelasSelecionadasDoLadoDireito: string[] = [];

  private onChange: (value: string[]) => void = () => {};
  private onTouched: () => void = () => {};
  /**
   *
   */
  constructor() {}

  ngOnChanges(changes: SimpleChanges): void {
       
    if (changes['todasAsTabelas']) {
       this.tabelasDisponiveisLadoEsquerdo = [];
       
       if (this.tabelasEnviadasParaLadoDireito.length == 0) {  
        this.tabelasDisponiveisLadoEsquerdo.push(...this.todasAsTabelas);
       }else{       
        const tabelasNaoSelecionadas =this.todasAsTabelas.filter(t=> !this.tabelasEnviadasParaLadoDireito.includes(t));  
        this.tabelasDisponiveisLadoEsquerdo.push(...tabelasNaoSelecionadas);
       }
     }
  }

  writeValue(value: string[]): void {
    if (value) {
      this.tabelasEnviadasParaLadoDireito.push(...value);      
      this.tabelasDisponiveisLadoEsquerdo =
        this.tabelasDisponiveisLadoEsquerdo.filter(
          (table) => !this.tabelasEnviadasParaLadoDireito.includes(table)
        );
      this.ordenarDuasTabelas();
    }
  }

  registerOnChange(fn: (value: string[]) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    // No need to implement this for this component
  }

  ngOnInit(): void {}

  moveRight() {

    if (this.tabelasSelecionadasDoLadoEsquerdo.length === 0) return;

    let novas = this.tabelasSelecionadasDoLadoEsquerdo.filter(
      (t) => !this.tabelasEnviadasParaLadoDireito.includes(t)
    );
    this.tabelasEnviadasParaLadoDireito.push(...novas);

    this.tabelasDisponiveisLadoEsquerdo = this.tabelasDisponiveisLadoEsquerdo
       .filter(t => !this.tabelasSelecionadasDoLadoEsquerdo.includes(t));

    this.clearSelection();
    this.ordenarTabelasEnviadasParaLadoDireito();
    this.onChange(this.tabelasEnviadasParaLadoDireito);
  }

  moveLeft() {
    if (this.tabelasSelecionadasDoLadoDireito.length === 0) return;

    let tabelas = this.tabelasEnviadasParaLadoDireito.filter(
      (t) => !this.tabelasSelecionadasDoLadoDireito.includes(t)
    );

    this.tabelasEnviadasParaLadoDireito.length = 0; // Limpa o array mantendo a referência

    if (tabelas.length == 0) this.tabelasEnviadasParaLadoDireito = [];
    else this.tabelasEnviadasParaLadoDireito.push(...tabelas);    

    this.tabelasDisponiveisLadoEsquerdo.push(...this.tabelasSelecionadasDoLadoDireito);

    this.clearSelection();
    this.ordenarTabelasEnviadasParaLadoDireito();
    this.ordenarTabelasDisponiveisLadoEsquerdo();
    
    this.onChange(this.tabelasEnviadasParaLadoDireito);
  }

  onSelectedTabelasDisponiveis(selected: string[]) {
    this.tabelasSelecionadasDoLadoEsquerdo = [];
    this.tabelasSelecionadasDoLadoEsquerdo = [...selected];
  }

  onSelectedTabelasSelecionadas(selected: string[]) {
    this.tabelasSelecionadasDoLadoDireito = [];
    this.tabelasSelecionadasDoLadoDireito = [...selected];
  }

  moveAllRight() {
    this.tabelasEnviadasParaLadoDireito = [];
    this.tabelasEnviadasParaLadoDireito.push(...this.todasAsTabelas);

    this.tabelasDisponiveisLadoEsquerdo = [];

    this.leftTextarea.clearSelection();
    this.rightTextarea.clearSelection();

    this.clearSelection();
    this.ordenarTabelasEnviadasParaLadoDireito();
    this.onChange(this.tabelasEnviadasParaLadoDireito);
  }
  moveAllLeft() {
    this.tabelasDisponiveisLadoEsquerdo = [];
    this.tabelasDisponiveisLadoEsquerdo.push(...this.todasAsTabelas);
    this.tabelasEnviadasParaLadoDireito = [];

    this.clearSelection();    
    this.ordenarTabelasDisponiveisLadoEsquerdo();
    this.onChange(this.tabelasEnviadasParaLadoDireito);
  }

  ordenarDuasTabelas() {
    this.ordenarTabelasDisponiveisLadoEsquerdo();
    this.ordenarTabelasEnviadasParaLadoDireito();
  }

  ordenarTabelasDisponiveisLadoEsquerdo() {
    this.tabelasDisponiveisLadoEsquerdo.sort((a, b) => a.localeCompare(b));
  }

  ordenarTabelasEnviadasParaLadoDireito() {
    this.tabelasEnviadasParaLadoDireito.sort((a, b) => a.localeCompare(b));
  }

  // Função trackBy para otimizar a renderização
  trackByFn(index: number, item: string): string {
    return item; // Utilizando o próprio item como chave única
  }

  clearSelection() {
    this.leftTextarea.clearSelection();
    this.tabelasSelecionadasDoLadoEsquerdo = []
    
    this.rightTextarea.clearSelection();
    this.tabelasSelecionadasDoLadoDireito = [];
  }
}
