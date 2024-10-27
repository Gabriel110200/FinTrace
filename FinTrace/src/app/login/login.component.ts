import { Usuario } from './../shared/model/usuario';
import { ToastrService } from 'ngx-toastr';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SharedService } from '../shared/service/shared.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { comparaSenhas } from './validator/login';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  formLogin!:FormGroup
  cadastro!:boolean
  acao:string = "Login"
  conexaoAPI$!:Subscription
  toggle:boolean = false
  exibeSenha:string = 'password'
  exibeIcone:string = 'visibility'

  constructor(
    private toast: ToastrService,
    private form: FormBuilder,
    private service: SharedService,
    private router: Router
  ) { }

  ngOnInit() {
    this.formLogin = this.form.group({
      login: [null, [Validators.required]],
      senha: [null, [Validators.required]],
      senha2: [null]
    }, {
      validators: [comparaSenhas()]
    });

  }

  mudaExibicao(){
    if(!this.toggle){
      this.exibeSenha = 'text'
      this.exibeIcone = 'visibility_off'
      this.toggle = true

    }else{
      this.exibeSenha = 'password'
      this.exibeIcone = 'visibility'
      this.toggle = false
    }

  }

  ativarCadastro(){
    this.cadastro = true
    this.acao = "Registro"

    const validaSenha = this.formLogin.get('senha2');

    validaSenha?.setValidators([Validators.required]);
    validaSenha?.updateValueAndValidity();
  }

  checaForm(){
    if(this.formLogin.errors && this.formLogin.errors?.['senhasDiferentes']){
      if(this.toast.currentlyActive){
        this.toast.clear()
        this.toast.error('As senhas devem ser iguais')
      }else{
        this.toast.error('As senhas devem ser iguais')
      }
    }
  }

  enviarDados() {
    const formulario: Usuario = {
      username: this.formLogin.get('login')?.value,
      password: this.formLogin.get('senha')?.value
    }

    if(this.cadastro){

      const validaSenha = this.formLogin.get('senha2')

      this.conexaoAPI$ = this.service.cadastrarUsuario(formulario).subscribe(
        (dado) => {
          console.log('Resposta: ', dado)
          this.toast.info(dado)
          this.formLogin.reset()
          this.formLogin.markAsPristine()
          this.cadastro = false
          this.acao = "Login"
          validaSenha?.clearValidators()
          validaSenha?.updateValueAndValidity()
        }
      )

    }else{

      this.conexaoAPI$ = this.service.loginUsuario(formulario).subscribe(
        (dado) => {
          console.log('Resposta: ', dado)
          localStorage.setItem('usuario', JSON.stringify(formulario.username))
          this.router.navigate(['/'])

        }
      )
    }
  }



}
