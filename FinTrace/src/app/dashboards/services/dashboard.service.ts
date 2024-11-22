import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

constructor() { }

  retornaAnos(){
    let intervalo = []
    const ano = + new Date(Date.now()).toISOString().substring(0,4)
    for(let i=0;i<10;i++){
      intervalo.push(ano-i)
    }
    return intervalo
  }

  retornaMeses(){
    let intervalo = []
    const ano = + new Date(Date.now()).toISOString().substring(0,4)
    for(let i=1;i<=12;i++){
      if(i<10){
        intervalo.push(`0${i}`)
      }else{
        intervalo.push(`${i}`)
      }
    }
    console.log('meses: intervalo', intervalo)
    return intervalo
  }

  retornaNomeMes(mes:string){
    switch(mes){
      case '01':
        return 'Janeiro'
      case '02':
        return 'Fevereiro'
      case '03':
        return 'Março'
      case '04':
        return 'Abril'
      case '05':
        return 'Maio'
      case '06':
        return 'Junho'
      case '07':
        return 'Julho'
      case '08':
        return 'Agosto'
      case '09':
        return 'Setembro'
      case '10':
        return 'Outubro'
      case '11':
        return 'Novembro'
      case '12':
        return 'Dezembro'
      default:
        return 'Mês Inválido'
    }
  }

}
