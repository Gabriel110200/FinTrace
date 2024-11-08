import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CadTransacaoComponent } from 'src/app/gerenciamentoTransacoes/cadTransacao/cadTransacao.component';
import { CategoriaService } from '../service/categoria.service';
import { Subscription } from 'rxjs';
import { categoria } from '../model/categoria';

@Component({
  selector: 'app-cadCategoria',
  templateUrl: './cadCategoria.component.html',
  styleUrls: ['./cadCategoria.component.css']
})
export class CadCategoriaComponent implements OnInit {

  cadastro!:FormGroup
  acaoTitulo:string = 'Cadastro'
  service$!:Subscription
  categoriaCadastrada = this.data.dado 

  constructor(
    private form: FormBuilder,
    private dialogRef: MatDialogRef<CadTransacaoComponent>,
    private categoriaService: CategoriaService,
    @Inject(MAT_DIALOG_DATA) public data:any,
  ) { }

  ngOnInit() {
    this.cadastro = this.form.group({
      id: [null],
      descricao: [null,[Validators.required]],
    })

    if(this.categoriaCadastrada?.id){
      this.populaRegistro()
    }
  }

  populaRegistro(){
    this.cadastro.patchValue({
      id: this.categoriaCadastrada.id,
      descricao: this.categoriaCadastrada.name
    })
  }

  enviarCategoria(){
    const id = this.cadastro.get('id')?.value ?? null
    const categoriaCadastrada:categoria = {
      limit: 0,
      name: this.cadastro.get('descricao')?.value
    }
    if(id!=null){
      categoriaCadastrada.id = id
      this.dialogRef.close(categoriaCadastrada)
    } else {
      this.dialogRef.close(categoriaCadastrada)
    }
  }


}
