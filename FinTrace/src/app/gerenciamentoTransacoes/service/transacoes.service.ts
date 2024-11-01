import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TransacoesService {

constructor(
  private http: HttpClient
) { }

API= "http://localhost:8081/api"

obterTipoTransacao(transacao:string){
  switch(transacao){
    case 'R':
      return 'Receita'
    case 'D':
      return 'Despesa'
  }
  return
}

obterClasseTransacao(transacao:string){
  switch(transacao){
    case 'R':
      return 'marcarReceita'
    case 'D':
      return 'marcarDespesa'
  }
  return
}

obterTipoCategoria(categoria: string){
  switch(categoria){
    case 'C':
      return 'Casa'
    case 'E':
      return 'Escola'
    case 'T':
      return 'Trabalho'
    case 'X':
      return 'Estudo'
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

retornaTotalReceita(transacoes:any[]){
  let somaR = 0
  transacoes.forEach(transacao => {
    if (transacao.tipoTransacao === 'R') {
        somaR += transacao.valor
    }
  })
  return somaR
}

retornaTotalDespesa(transacoes:any[]){
  let somaD = 0
  transacoes.forEach(transacao => {
    if (transacao.tipoTransacao === 'D') {
        somaD += transacao.valor
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

}
