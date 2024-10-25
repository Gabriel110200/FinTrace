import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-cadTransacao',
  templateUrl: './cadTransacao.component.html',
  styleUrls: ['./cadTransacao.component.css']
})
export class CadTransacaoComponent implements OnInit {

  cadastro!:FormGroup
  acaoTitulo:string = 'Cadastro'
  desabilita:boolean = false
  recorrente = this.data.recorrente ?? null

  tipoTransacao:any[] = [
    {id:'R', nome: 'Receita'},
    {id:'D', nome: 'Despesa'},
  ]

  tipoCategoria:any[] = [
    {id:'C', nome: 'Casa'},
    {id:'E', nome: 'Escola'},
    {id:'T', nome: 'Trabalho'},
    {id:'X', nome: 'Estudo'}
  ]

  constructor(
    private form: FormBuilder,
    private dialogRef: MatDialogRef<CadTransacaoComponent>,
    @Inject(MAT_DIALOG_DATA) public data:any,
  ) { }

  ngOnInit() {
    this.cadastro = this.form.group({
      tipoTransacao: [null, [Validators.required]],
      categoria: [null, [Validators.required]],
      valor: [null, [Validators.required]], 
      dataTransacao: [null, [Validators.required]],
      descricao: [null],
    })

    this.removeData(this.recorrente)
  }

  enviarTransacao(){
    this.dialogRef.close(this.cadastro.value)
  }

  removeData(acao:string){
    if(acao=='recorrente'){
      const data = this.cadastro.get('dataTransacao')
      this.desabilita = true
      data?.clearValidators()
      data?.updateValueAndValidity()
    }
  }


}
