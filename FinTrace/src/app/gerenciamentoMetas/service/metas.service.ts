import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map, take } from "rxjs";
import { Categoria } from "src/app/gerenciamentoCategorias/model/categoria";
import { CadTransacao } from "src/app/gerenciamentoTransacoes/model/transacao";
import { ResponseAPI } from "src/app/shared/model/responseAPI";
import { SharedService } from "src/app/shared/service/shared.service";
import { ContasTerceiro } from "../model/contasTerceiro";
import { Metas, PostMetas } from "../model/Metas";

@Injectable({
  providedIn: 'root'
})
export class MetasService {

  userId:number = +this.shared.obterId()

  constructor(
    private http: HttpClient,
    private shared: SharedService
  ) { }

listarMetas(){
  const PARAMS = new HttpParams().set('userId', this.userId)

  return this.http.get<Metas[]>(`/api/goals`, {
    params: PARAMS
  })
  .pipe(
    map((val) => val),
    take(1)
  );
}

cadastrarMeta(objeto:PostMetas){
  return this.http.post<ResponseAPI<PostMetas>>(`/api/goals`, objeto)
  .pipe(
    map((val) => val),
    take(1)
  );
}

atualizarMeta(objeto:PostMetas){
  return this.http.put<ResponseAPI<PostMetas>>(`/api/goals/${objeto.id}`, objeto)
  .pipe(
    map((val) => val),
    take(1)
  );
}

removerMeta(id:number){
  return this.http.delete(`/api/goals/${id}`, { responseType: 'text' })
  .pipe(
    map((val) => val),
    take(1)
  );
}

cadastrarTransacao(objeto:CadTransacao){
  return this.http.post<ResponseAPI<Categoria>>(`/api/transactions`, objeto)
  .pipe(
    map((val) => val.data),
    take(1)
  );
}

retornaSaldoAleatorio(){
  const randomNumber = Math.random() * (10000 - 500) + 500;
  return parseFloat(randomNumber.toFixed(2));
}

cadastrarContas(objeto:ContasTerceiro){
  return this.http.post<ResponseAPI<ContasTerceiro>>(`/api/accounts/create`, objeto)
  .pipe(
    map((val) => val.data),
    take(1)
  );
}

listarContas(){
  const PARAMS = new HttpParams().set('userId', this.userId)

  return this.http.get<ContasTerceiro[]>(`/api/accounts`, {
    params: PARAMS
  })
  .pipe(
    map((val:any) => val.data),
    take(1)
  );
}

}
