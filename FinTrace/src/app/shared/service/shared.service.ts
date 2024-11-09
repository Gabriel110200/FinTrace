import { ResponseAPI } from './../model/responseAPI';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Usuario } from '../model/usuario';
import { map, take } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

constructor(
  private http: HttpClient
) { }


  cadastrarUsuario(formulario:Usuario){
    return this.http.post(`/api/users/register`, formulario, { responseType: 'text' })
    .pipe(
      map((val) => val),
      take(1)
    );
  }

  loginUsuario(formulario:Usuario){
    console.log('shared service')
    console.log(formulario)
    return this.http.post(`/api/users/login`, formulario)
    .pipe(
      map((val) => val),
      take(1)
    );
  }

  obterUsuario(){
    const user = localStorage.getItem('usuario')
    return JSON.parse(user!)
  }

}
