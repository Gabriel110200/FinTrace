import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { CategoriaService } from '../service/categoria.service';
import { categoria } from '../model/categoria';

@Component({
  selector: 'app-cadCategoriaLimite',
  templateUrl: './cadCategoriaLimite.component.html',
  styleUrls: ['./cadCategoriaLimite.component.css']
})
export class CadCategoriaLimiteComponent implements OnInit {

  cadastro!:FormGroup
  service$!:Subscription
  get$!:Subscription
  categorias!:categoria[]
  //categoriaCadastrada = this.data.dado 

  constructor(
    private form: FormBuilder,
    private dialogRef: MatDialogRef<CadCategoriaLimiteComponent>,
    private categoriaService: CategoriaService,
    @Inject(MAT_DIALOG_DATA) public data:any,
  ) { }

  ngOnInit() {
    this.cadastro = this.form.group({
      id: [null],
      categoria: [null,[Validators.required]],
      valor: [null, [Validators.required]]
    })

    this.get$ = this.categoriaService.listarCategorias().subscribe(
      (dado) => {
        this.categorias = dado
      }
    )

    /*if(this.categoriaCadastrada?.id){
      this.populaRegistro()
    }*/
  }

  populaRegistro(){
    /*this.cadastro.patchValue({
      id: this.categoriaCadastrada.id,
      descricao: this.categoriaCadastrada.name
    })*/
  }

  enviarCategoria(){
    /*const id = this.cadastro.get('id')?.value ?? null
    const categoriaCadastrada:categoria = {
      name: this.cadastro.get('descricao')?.value
    }
    if(id!=null){
      categoriaCadastrada.id = id
      this.dialogRef.close(categoriaCadastrada)
    } else {
      this.dialogRef.close(categoriaCadastrada)
    }*/
  }
}
