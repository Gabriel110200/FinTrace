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
  editar:boolean = this.data.editar ?? null
  datas:number[] = []
  formulario:any = this.data.form 

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
    this.criaDatas()
    if(this.editar){
      this.atualizaCampos()
    }
  }

  enviarTransacao(){
    this.dialogRef.close(this.cadastro.value)
  }

  criaDatas(){
    for(let i=1;i<=31;i++){
      this.datas.push(i)
    }
  }

  atualizaCampos(){
    this.cadastro.patchValue({
      tipoTransacao: this.formulario.tipoTransacao,
      categoria: this.formulario.categoria,
      valor: this.formulario.valor, 
      dataTransacao: this.formulario.dataTransacao,
      descricao: this.formulario.descricao,
    })
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
