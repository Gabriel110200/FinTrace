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
          return 'Janeiro';
      case '02':
          return 'Fevereiro';
      case '03':
          return 'Março';
      case '04':
          return 'Abril';
      case '05':
          return 'Maio';
      case '06':
          return 'Junho';
      case '07':
          return 'Julho';
      case '08':
          return 'Agosto';
      case '09':
          return 'Setembro';
      case '10':
          return 'Outubro';
      case '11':
          return 'Novembro';
      case '12':
          return 'Dezembro';
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

retornaTotalReceitaPeriodo(transacoes:any[], periodo:string){
  //console.log('cheguei')
  let somaR = 0
  transacoes.forEach(transacao => {
    if (transacao.type === 'RECEITA' && 
        transacao.date.substring(5,7)===periodo
    ) {
        somaR += transacao.amount
    }
  })
  return somaR
}

retornaTotalDespesaPeriodo(transacoes:any[], periodo:string){
  let somaD = 0
  transacoes.forEach(transacao => {
    if (transacao.type === 'DESPESA' && 
        transacao.date.substring(5,7)===periodo
    ) {
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


verificaLimiteGasto(lista:transacao[], insert:boolean){
  const categorias: any[] = []
  for(let i=0;i<lista.length;i++){
    var novo = true
    if(i == 0){
      const par = {
        categoria: lista[i].category.name,
        tipo: lista[i].type,
        valor: lista[i].amount,
        limite: lista[i].category.limit,
        mes: lista[i].date.substring(5,7),
        ano: lista[i].date.substring(0,4),
      }
      categorias.push(par)
    } else {
      for(let j=0; j<categorias.length;j++){
        if(
          lista[i].category.name == categorias[j].categoria &&
          lista[i].type == categorias[j].tipo &&
          lista[i].date.substring(5,7) == categorias[j].mes &&
          lista[i].date.substring(0,4) == categorias[j].ano
         ){
          novo = false
          categorias[j].valor += lista[i].amount
         }
      }
      if(novo){
        const par = {
          categoria: lista[i].category.name,
          tipo: lista[i].type,
          valor: lista[i].amount,
          limite: lista[i].category.limit,
          mes: lista[i].date.substring(5,7),
          ano: lista[i].date.substring(0,4),
        }
        categorias.push(par)
      }
    }
  }
  console.log('minhas categorias: ', categorias)
  return this.checaDespesas(categorias, insert)
}

checaDespesas(categorias:any[], insert:boolean){
  const despesas:any[] = []
  console.log('checa despesas: ', categorias)
  categorias.forEach(
    (dado:any) => {
      if(dado.tipo == "DESPESA"){
        despesas.push(dado)
      }
    } 
  )

  if(insert){
    return this.verificaTransacaoExcedente(despesas)
  } else {
    return this.tetoDeGastos(despesas)
  }
  
  //this.tetoDeGastos(despesas)
}

verificaTransacaoExcedente(despesas:any[]){
  var possuiExcedente = false 
  despesas.forEach(
    (dado) => {
      if(dado.valor > dado.limite && dado.limite!=0){
        possuiExcedente = true
      }
    }
  )
  console.log('Possui excedente? ', possuiExcedente)
  return possuiExcedente

}

tetoDeGastos(despesas:any[]){
  const execentes:any = []
  console.log('minhas despesas: ', despesas)
  despesas.forEach(
    (dado) => {
      if(dado.valor > (dado.limite*0.8) && dado.limite!=0){
        execentes.push(dado)
      }
    }
  )
  console.log('excedentes', execentes)
  return execentes
}





}




