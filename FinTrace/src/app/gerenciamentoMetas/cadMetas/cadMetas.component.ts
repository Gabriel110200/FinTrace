import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { SharedService } from 'src/app/shared/service/shared.service';
import { Metas, PostMetas } from '../model/Metas';

@Component({
  selector: 'app-cadMetas',
  templateUrl: './cadMetas.component.html',
  styleUrls: ['./cadMetas.component.css']
})
export class CadMetasComponent implements OnInit {

  cadastro!:FormGroup
  acaoTitulo:string = 'Cadastro'
  service$!:Subscription
  categoriaCadastrada:Metas = this.data.dado
  userId:number = + this.shared.obterId()

  constructor(
    private form: FormBuilder,
    private shared: SharedService,
    private dialogRef: MatDialogRef<CadMetasComponent>,
    @Inject(MAT_DIALOG_DATA) public data:any,
  ) { }

  ngOnInit() {
    this.cadastro = this.form.group({
      id: [null],
      idMeta: [null],
      descricao: [null,[Validators.required]],
      valor: [null,[Validators.required]],
    })

    if(this.categoriaCadastrada?.id){
      this.populaRegistro()
    }
  }

  populaRegistro(){
    this.cadastro.patchValue({
      id: this.userId,
      idMeta: this.categoriaCadastrada.id,
      descricao: this.categoriaCadastrada.description,
      valor: this.categoriaCadastrada.necessaryValue,
    })
  }

  enviarMeta(){
    const idMeta = this.cadastro.get('idMeta')?.value

    if(idMeta){
      const cadastroMeta:PostMetas = {
        description: this.cadastro.get('descricao')?.value,
        necessaryValue: this.cadastro.get('valor')?.value,
        userId: this.userId,
        id: idMeta
      }

      this.dialogRef.close(cadastroMeta)

    } else {
      const cadastroMeta:PostMetas = {
        description: this.cadastro.get('descricao')?.value,
        necessaryValue: this.cadastro.get('valor')?.value,
        userId: this.userId
      }

      this.dialogRef.close(cadastroMeta)
    }



  }
}
