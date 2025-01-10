import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map, take } from "rxjs";
import { ResponseAPIList, ResponseAPI } from "src/app/shared/model/responseAPI";
import { SharedService } from "src/app/shared/service/shared.service";
import { Categoria } from "../model/categoria";


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

    return this.http.get<ResponseAPIList<Categoria>>(`/api/categories`, {
      params: PARAMS
    })
    .pipe(
      map((val) => val.data),
      take(1)
    );
  }

  listarCategoriaPorId(id:number){
    return this.http.get<ResponseAPI<Categoria>>(`/api/categories/${id}`)
    .pipe(
      map((val) => val.data),
      take(1)
    );
  }

  cadastrarCategoria(objeto:Categoria){
    return this.http.post<ResponseAPI<Categoria>>(`/api/categories`, objeto)
    .pipe(
      map((val) => val.data),
      take(1)
    );
  }

  atualizarCategoria(id:number, objeto:Categoria){
    return this.http.put<ResponseAPI<Categoria>>(`/api/categories/${id}`, objeto)
    .pipe(
      map((val) => val.data),
      take(1)
    );
  }

  removerCategoria(id:number){
    return this.http.delete<ResponseAPI<Categoria>>(`/api/categories/${id}`)
    .pipe(
      map((val:any) => val.data),
      take(1)
    );
  }


}
