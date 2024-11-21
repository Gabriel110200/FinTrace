import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { categoria } from 'src/app/gerenciamentoCategorias/model/categoria';
import { transacao } from '../model/transacao';
import { transacaoRecorrente } from '../model/transacaoRec';

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
      data: [null, [Validators.required, this.dataValidaValidator]],
      descricao: [null],
    })
  }

  enviarTransacao(){
    const transacao:transacao = {
      type: this.cadastro.get('tipoTransacao')?.value,
      category: this.cadastro.get('categoria')?.value,
      amount: this.cadastro.get('valor')?.value,
      date: this.cadastro.get('data')?.value,
      description: this.cadastro.get('descricao')?.value,
      recurring: this.recorrente ? true : false
    }

    this.dialogRef.close(transacao)
  }

  atualizaCampos(){
    this.cadastro.patchValue({
      tipoTransacao: this.formulario.tipoTransacao,
      categoria: this.formulario.categoria,
      valor: this.formulario.valor, 
      data: this.formulario.dataTransacao,
      descricao: this.formulario.descricao,
    })
  }

  dataValidaValidator(control: any) {
    const value = control.value;
    if (!value) return null; 
    
    const data = new Date(value);
    const dia = data.getDate();
    const mes = data.getMonth();
    const ano = data.getFullYear();

    if (dia !== new Date(ano, mes, dia).getDate()) {
      return { dataInvalida: true };
    }

    return null;
  }



}
