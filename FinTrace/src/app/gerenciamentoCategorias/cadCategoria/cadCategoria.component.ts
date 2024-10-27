import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CadTransacaoComponent } from 'src/app/gerenciamentoTransacoes/cadTransacao/cadTransacao.component';

@Component({
  selector: 'app-cadCategoria',
  templateUrl: './cadCategoria.component.html',
  styleUrls: ['./cadCategoria.component.css']
})
export class CadCategoriaComponent implements OnInit {

  cadastro!:FormGroup
  acaoTitulo:string = 'Cadastro'

  constructor(
    private form: FormBuilder,
    private dialogRef: MatDialogRef<CadTransacaoComponent>,
    @Inject(MAT_DIALOG_DATA) public data:any,
  ) { }

  ngOnInit() {
    this.cadastro = this.form.group({
      descricao: [null,[Validators.required]],
    })
  }

  enviarCategoria(){
    this.dialogRef.close(this.cadastro.value)
  }


}
