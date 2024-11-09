import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { CategoriaService } from '../service/categoria.service';
import { categoria } from '../model/categoria';
import { ToastrService } from 'ngx-toastr';

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
  categoriaCadastrada = this.data.dado 

  constructor(
    private form: FormBuilder,
    private dialogRef: MatDialogRef<CadCategoriaLimiteComponent>,
    private toast: ToastrService,
    private categoriaService: CategoriaService,
    @Inject(MAT_DIALOG_DATA) public data:any,
  ) { }

  ngOnInit() {
    this.cadastro = this.form.group({
      categoria: [null,[Validators.required]],
      valor: [null, [Validators.required]]
    })

    this.get$ = this.categoriaService.listarCategorias().subscribe(
      (dado) => {
        this.categorias = dado
      }
    )
    console.log('cad cast:::',this.categoriaCadastrada)
    this.populaRegistro()
  }

  populaRegistro(){
    this.cadastro.patchValue({
      categoria: this.categoriaCadastrada.id,
      valor:  this.categoriaCadastrada.limit,
    })
  }

  enviarCategoria(){
    const id = this.categoriaCadastrada.id
    const categoriaCadastrada:categoria = {
      name: this.categoriaCadastrada.name,
      limit: this.cadastro.get('valor')?.value
    }
    if(id!=null){
      categoriaCadastrada.id = id
      this.dialogRef.close(categoriaCadastrada)
    } else {
      this.toast.error('Inserção de limites falhou. Identificador necessário')
    }
  }
}
