import { ResponseAPI } from './../model/responseAPI';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Usuario } from '../model/usuario';
import { map, take } from 'rxjs';
import { FeatureFlag } from '../model/featureFlag';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

constructor(
  private http: HttpClient,
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
      map((val:any) => val.data),
      take(1)
    );
  }

  obterFeaturesUsuario(){
    const idUser:number = this.obterId()

    return this.http.get<ResponseAPI<FeatureFlag[]>>(`/api/feature-flag/${idUser}`)
    .pipe(
      map((val) => val.data),
      take(1)
    );
  }

  obterDados(){
    const user = localStorage.getItem('usuario')
    return JSON.parse(user!)
  }

  obterUsuario(){
    const usr = this.obterDados()
    return usr.username
  }

  obterId(){
    const usr = this.obterDados()
    return usr.id
  }

}
