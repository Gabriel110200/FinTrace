import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { categoria } from 'src/app/gerenciamentoCategorias/model/categoria';
import { transacao } from '../model/transacao';

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
  tipoCategoria:categoria[] = this.data.categoria

  tipoTransacao:any[] = [
    {id:'RECEITA', nome: 'Receita'},
    {id:'DESPESA', nome: 'Despesa'},
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
    const transacao:transacao = {
      type: this.cadastro.get('tipoTransacao')?.value,
      category: this.cadastro.get('categoria')?.value,
      amount: this.cadastro.get('valor')?.value,
      date: this.cadastro.get('dataTransacao')?.value,
      description: this.cadastro.get('descricao')?.value
    }
    this.dialogRef.close(transacao)
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
