import { Component, OnInit } from '@angular/core';
import { transacao } from 'src/app/gerenciamentoTransacoes/model/transacao';
import { TransacoesService } from 'src/app/gerenciamentoTransacoes/service/transacoes.service';
import { DashboardService } from '../services/dashboard.service';
import { FormControl } from '@angular/forms';
import { forkJoin, Observable } from 'rxjs';
import { transacaoRecorrente } from 'src/app/gerenciamentoTransacoes/model/transacaoRec';

@Component({
  selector: 'app-dashboardFluxoCaixa',
  templateUrl: './dashboardFluxoCaixa.component.html',
  styleUrls: ['./dashboardFluxoCaixa.component.css']
})
export class DashboardFluxoCaixaComponent implements OnInit {

  basicData: any;
  basicOptions: any;
  campo:number = 2024

  rotulos:string[] = []
  valores:number[] = []
  itens:any[] = []
  anos:number[] = this.dashboard.retornaAnos()
  totalReceita!:number[]
  totalDespesa!:number[]
  totalBalanco!:number[]
  presente = false

  $Transacoes!: Observable<transacao[]>

  constructor(
    private transacoes: TransacoesService,
    private dashboard: DashboardService
  ){}

  ngOnInit() {
    this.listagem(2024)
    //this.populaTabela([])
  }

  listagem(ano:number){
    const montante:any = []
    this.totalReceita = []
    this.totalDespesa = []

    this.$Transacoes = this.transacoes.listarTransacoes() 

    forkJoin([this.$Transacoes]).subscribe({
      next: ([dado1]) => {
        dado1.forEach(
          (dado) => {
            montante.push(dado)
          }
        )
        console.log(montante)
        const trans = montante.filter(
          (dado:any) => {
            return +dado.date.substring(0,4) == ano
          }
        )
        this.retornaReceitaDespesas(trans)
      }
    })
  }

  retornaReceitaDespesas(transacaoes:transacao[]){
    console.log(transacaoes)
    for(let i = 1 ; i<=12; i++){
      let somatorioReceita = 0
      let somatorioDespesa = 0
      if(i<10){
        const mes = `${'0'+i}`
        somatorioReceita = this.transacoes.retornaTotalReceitaPeriodo(transacaoes, mes)
        somatorioDespesa = this.transacoes.retornaTotalDespesaPeriodo(transacaoes, mes)
        this.totalReceita.push(somatorioReceita)
        this.totalDespesa.push(somatorioDespesa)
      }else{
        const mes = `${i}`
        somatorioReceita = this.transacoes.retornaTotalReceitaPeriodo(transacaoes, mes)
        somatorioDespesa = this.transacoes.retornaTotalDespesaPeriodo(transacaoes, mes)
        this.totalReceita.push(somatorioReceita)
        this.totalDespesa.push(somatorioDespesa)
      }
    }
    this.retornaBalanco()
  }

  retornaBalanco(){
    this.totalBalanco = []
    for(let i=0;i<this.totalReceita.length;i++){
      this.totalBalanco.push(this.totalReceita[i]-this.totalDespesa[i])
    }
    this.populaTabela()
  }

  populaTabela(){
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');
    const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
    const surfaceBorder = documentStyle.getPropertyValue('--surface-border');


    this.basicData = {
      labels: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
      datasets: [
          {
              label: 'Total Receitas(mês)',
              backgroundColor: documentStyle.getPropertyValue('--blue-500'),
              borderColor: documentStyle.getPropertyValue('--blue-500'),
              data: this.totalReceita
          },
          {
              label: 'Total Despesas(mês)',
              backgroundColor: documentStyle.getPropertyValue('--pink-500'),
              borderColor: documentStyle.getPropertyValue('--pink-500'),
              data: this.totalDespesa
          },
          {
            label: 'Saldo Final(mês)',
            backgroundColor: documentStyle.getPropertyValue('--pink-500'),
            borderColor: documentStyle.getPropertyValue('--pink-500'),
            data: this.totalBalanco
        }
      ]
  };

  this.basicOptions = {
    maintainAspectRatio: false,
    aspectRatio: 0.8,
    plugins: {
        legend: {
            labels: {
                color: textColor
            }
        }
    },
    scales: {
        x: {
            ticks: {
                color: textColorSecondary,
                font: {
                    weight: 500
                }
            },
            grid: {
                color: surfaceBorder,
                drawBorder: false
            }
        },
        y: {
            ticks: {
                color: textColorSecondary
            },
            grid: {
                color: surfaceBorder,
                drawBorder: false
            }
        }

    }
};
  }





}
