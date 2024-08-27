import { Component, OnInit } from '@angular/core';
import { RandomUserService } from '../_services/random-user.service';
import { TextSelectorComponent } from '../components/text-selector/text-selector.component';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-main-screen',  
  standalone: true,    
  templateUrl: './main-screen.component.html',
  imports:[TextSelectorComponent, ReactiveFormsModule],
  styleUrl: './main-screen.component.scss'
})
export class MainScreenComponent implements OnInit{
  
  /**
   *
   */
  todos:string[] = [];
  preSelecionados:string[] = [];
  form: FormGroup;
  

  constructor(private randomUserService: RandomUserService,private fb: FormBuilder) {        
    this.form = this.fb.group({
      selectedTables: [[]]  // Inicializa o controle com um array vazio
    });
  }
  
  ngOnInit(): void {
    
    this.preSelecionados = [];

    this.randomUserService.getNames()
    .subscribe(data => this.todos = data);   
  }

}
