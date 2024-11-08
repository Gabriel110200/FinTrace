import { HttpClient } from "@angular/common/http"
import { Injectable } from "@angular/core"
import { map, take } from "rxjs"
import { categoria } from "src/app/gerenciamentoCategorias/model/categoria"
import { ResponseAPIList, ResponseAPI } from "src/app/shared/model/responseAPI"
import { transacao } from "../model/transacao"
import { transacaoRecorrente } from "../model/transacaoRec"


@Injectable({
  providedIn: 'root'
})
export class TransacoesService {

constructor(
  private http: HttpClient
) { }

obterTipoTransacao(transacao:string){
  switch(transacao){
    case 'RECEITA':
      return 'Receita'
    case 'DESPESA':
      return 'Despesa'
  }
  return
}

obterClasseTransacao(transacao:string){
  switch(transacao){
    case 'RECEITA':
      return 'marcarReceita'
    case 'DESPESA':
      return 'marcarDespesa'
  }
  return
}

obtemSaldoStatus(valor: number){
  if(valor<=20 && valor>0){
    return 'balancoAlerta'
  }
  if(valor > 20){
    return 'balancoPositivo'
  }
  if(valor == 0){
    return 'balancoNulo'
  }
  if(valor <= 0){
    return 'balancoNegativo'
  }
  return
}

retornaMes(mes: string): string {
  switch (mes) {
      case '01':
          return 'janeiro';
      case '02':
          return 'fevereiro';
      case '03':
          return 'março';
      case '04':
          return 'abril';
      case '05':
          return 'maio';
      case '06':
          return 'junho';
      case '07':
          return 'julho';
      case '08':
          return 'agosto';
      case '09':
          return 'setembro';
      case '10':
          return 'outubro';
      case '11':
          return 'novembro';
      case '12':
          return 'dezembro';
      default:
          return 'Mês inválido';
  }
}

retornaTotalReceita(transacoes:any[]){
  //console.log('cheguei')
  let somaR = 0
  transacoes.forEach(transacao => {
    if (transacao.type === 'RECEITA') {
        somaR += transacao.amount
    }
  })
  return somaR
}

retornaTotalDespesa(transacoes:any[]){
  let somaD = 0
  transacoes.forEach(transacao => {
    if (transacao.type === 'DESPESA') {
        somaD += transacao.amount
    }
  })
  return somaD
}

formatarValor(valor: number): string {
  return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
  }).format(valor);
}

listarTransacoes(){
  return this.http.get<ResponseAPIList<transacao>>(`/api/transactions`)
  .pipe(
    map((val) => val.data),
    take(1)
  );
}

cadastrarTransacao(objeto:transacao){
  return this.http.post<ResponseAPI<categoria>>(`/api/transactions`, objeto)
  .pipe(
    map((val) => val.data),
    take(1)
  );
}


listarTransacoesRecorrentes(){
  return this.http.get<ResponseAPIList<transacaoRecorrente>>(`/api/recurrency-transactions`)
  .pipe(
    map((val) => val.data),
    take(1)
  );
}

cadastrarTransacoesRecorrentes(objeto:transacaoRecorrente){
  return this.http.post<ResponseAPI<transacaoRecorrente>>(`/api/recurrency-transactions`, objeto)
  .pipe(
    map((val) => val.data),
    take(1)
  );
}

}




