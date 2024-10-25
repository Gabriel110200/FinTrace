import { ResponseAPI } from './../model/responseAPI';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Usuario } from '../model/usuario';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

constructor(
  private http: HttpClient
) { }

  API= "http://localhost:8081/api"

  cadastrarUsuario(formulario:Usuario){
    return this.http.post(`${this.API}/users/register`, formulario).pipe(
      map((dado:any) => dado.data)
    )
  }

  loginUsuario(formulario:Usuario){
    return this.http.post(`${this.API}/users/login`, formulario).pipe(
      map((dado:any) => dado.data)
    )
  }

  obterUsuario(){
    const user = localStorage.getItem('usuario')
    return JSON.parse(user!)
  }

}
