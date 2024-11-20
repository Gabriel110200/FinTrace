import { Component, OnInit } from '@angular/core';
import { TransacoesService } from 'src/app/gerenciamentoTransacoes/service/transacoes.service';
import { DashboardService } from '../services/dashboard.service';
import { forkJoin, Observable, Subscription } from 'rxjs';
import { transacao } from 'src/app/gerenciamentoTransacoes/model/transacao';
import { transacaoRecorrente } from 'src/app/gerenciamentoTransacoes/model/transacaoRec';

@Component({
  selector: 'app-dashboardResumo',
  templateUrl: './dashboardResumo.component.html',
  styleUrls: ['./dashboardResumo.component.css']
})
export class DashboardResumoComponent implements OnInit {

  hoje:string = new Date(Date.now()).toISOString().substring(0,10);
  mes = this.hoje.substring(5,7)
  ano = this.hoje.substring(0,4)
  Transacoes!:any[]
  totalReceitaTotal!:number
  totalDespesaTotal!:number
  totalReceitaPeriodo!:number
  totalDespesaPeriodo!:number
  $Transacoes!: Observable<transacao[]>
  $TransacoesRec!: Observable<transacaoRecorrente[]>

  campo:number = +this.ano
  campo2:string = this.mes
  anos:number[] = this.dashboard.retornaAnos()
  meses:string[] = this.dashboard.retornaMeses()

  constructor(
    protected transacoes: TransacoesService,
    protected dashboard: DashboardService
  ) { }

  ngOnInit() {
    const montante:any = []
    this.$Transacoes = this.transacoes.listarTransacoes() 
    this.$TransacoesRec = this.transacoes.listarTransacoesRecorrentes()

    forkJoin([this.$Transacoes, this.$TransacoesRec]).subscribe({
      next: ([dado1,dado2]) => {
        dado1.forEach(
          (dado) => {
            montante.push(dado)
          }
        )
        dado2.forEach(
          (dado) => {
            montante.push(dado)
          }
        )
        console.log(montante)
        this.Transacoes = montante
        this.preencherDados(this.mes, +this.ano)
      }
    })
  }

  preencherDados(mes:string, ano:number){
    const montante = this.Transacoes.filter(
      (dado) => {
        //console.log('dado: ', dado)
        //console.log('p1: ', +dado.date.substring(0,4), this.ano)
        //console.log('p2: ', +dado.date.substring(5,7), this.mes)
        return +dado.date.substring(0,4) <= +ano && +dado.date.substring(5,7) < +mes
      }
    )
    const atual = this.Transacoes.filter(
      (dado) => {
        //console.log('dado: ', dado)
        //console.log('p1: ', +dado.date.substring(0,4), this.ano)
        //console.log('p2: ', +dado.date.substring(5,7), this.mes)
        return +dado.date.substring(0,4) === ano && +dado.date.substring(5,7) == +mes
      }
    )

    this.totalReceitaTotal = this.transacoes.retornaTotalReceita(montante)
    this.totalDespesaTotal = this.transacoes.retornaTotalDespesa(montante)
    this.totalReceitaPeriodo = this.transacoes.retornaTotalReceita(atual)
    this.totalDespesaPeriodo = this.transacoes.retornaTotalDespesa(atual)
    //console.log(this.totalReceitaTotal)
    //console.log(this.totalDespesaTotal)
    //console.log(montante)
    //console.log(this.totalReceitaPeriodo)
    //console.log(this.totalDespesaPeriodo)
  }

  retornaFormatacao(total:number){
    if(total > 100){
      return 'textoSucesso'
    } else if(total <=100 && total >0){
      return 'textoAlerta'
    } else{
      return 'textoRisco'
    }
  }

}
