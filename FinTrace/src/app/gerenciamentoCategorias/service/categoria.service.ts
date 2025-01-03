import { SharedService } from './../../shared/service/shared.service';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, take } from 'rxjs';
import { categoria } from '../model/categoria';
import { ResponseAPI, ResponseAPIList } from 'src/app/shared/model/responseAPI';
import { Usuario } from 'src/app/shared/model/usuario';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

  userId:number = +this.shared.obterId()

  constructor(
    private http: HttpClient,
    private shared: SharedService
  ) { }

  listarCategorias(){
    const PARAMS = new HttpParams().set('userId', this.userId)

    return this.http.get<ResponseAPIList<categoria>>(`/api/categories`, {
      params: PARAMS
    })
    .pipe(
      map((val) => val.data),
      take(1)
    );
  }

  listarCategoriaPorId(id:number){
    return this.http.get<ResponseAPI<categoria>>(`/api/categories/${id}`)
    .pipe(
      map((val) => val.data),
      take(1)
    );
  }

  cadastrarCategoria(objeto:categoria){
    return this.http.post<ResponseAPI<categoria>>(`/api/categories`, objeto)
    .pipe(
      map((val) => val.data),
      take(1)
    );
  }

  atualizarCategoria(id:number, objeto:categoria){
    return this.http.put<ResponseAPI<categoria>>(`/api/categories/${id}`, objeto)
    .pipe(
      map((val) => val.data),
      take(1)
    );
  }

  removerCategoria(id:number){
    return this.http.delete<ResponseAPI<categoria>>(`/api/categories/${id}`)
    .pipe(
      map((val:any) => val.data),
      take(1)
    );
  }


}
