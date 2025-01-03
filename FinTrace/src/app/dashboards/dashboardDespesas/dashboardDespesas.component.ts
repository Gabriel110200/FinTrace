import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { single } from './data';
import { TransacoesService } from 'src/app/gerenciamentoTransacoes/service/transacoes.service';
import { transacao } from 'src/app/gerenciamentoTransacoes/model/transacao';
import { forkJoin, Observable } from 'rxjs';
import { transacaoRecorrente } from 'src/app/gerenciamentoTransacoes/model/transacaoRec';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

@Component({
  selector: 'app-dashboardDespesas',
  templateUrl: './dashboardDespesas.component.html',
  styleUrls: ['./dashboardDespesas.component.css']
})
export class DashboardDespesasComponent implements OnInit{

  @ViewChild('chart') chartElement!: ElementRef;

  basicData: any;
  basicOptions: any;
  $Transacoes!: Observable<transacao[]>
  $TransacoesRec!: Observable<transacaoRecorrente[]>

  rotulos:string[] = []
  valores:number[] = []
  itens:any[] = []
  presente = false

  constructor(
    private transacoes: TransacoesService
  ){}

  ngOnInit() {
    const montante:any = []
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
            return dado.type == "DESPESA"
          }
        )
        this.retornaCategorias(trans)
      }
    })

  }

  retornaCategorias(transacaoes:transacao[]){
    
    for(let i=0;i<transacaoes.length;i++){
      this.presente = false
      if(i==0){
        const item:any = {
          nome:transacaoes[i].category.name,
          acumulado:transacaoes[i].amount
        }
        this.itens.push(item)
      } else {
        this.itens.forEach(
          (dado) => {
            if(dado.nome == transacaoes[i].category.name){
              this.presente = true
              dado.acumulado += transacaoes[i].amount
            }
          }
        )
        if(!this.presente){
          const item:any = {
            nome:transacaoes[i].category.name,
            acumulado:transacaoes[i].amount
          }
          this.itens.push(item)
        }
      }
    }

    console.log(this.itens)
    this.populaTabela(this.itens)
  }

  populaTabela(item:any[]){
    console.log('meu item: ', item)
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');
    const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
    const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

    for(let i=0;i<item.length;i++){
      console.log(item[i].nome)
      console.log(item[i].acumulado)
      this.rotulos.push(item[i]?.nome)
      this.valores.push(item[i]?.acumulado)
    }
    this.basicData = {
      labels: this.rotulos,
      datasets: [
          {
              label: 'Despesas',
              data: this.valores,
              backgroundColor: ['rgba(255, 159, 64, 0.2)', 'rgba(75, 192, 192, 0.2)', 'rgba(54, 162, 235, 0.2)', 'rgba(153, 102, 255, 0.2)'],
              borderColor: ['rgb(255, 159, 64)', 'rgb(75, 192, 192)', 'rgb(54, 162, 235)', 'rgb(153, 102, 255)'],
              borderWidth: 1
          }
      ]
  };

  this.basicOptions = {
      plugins: {
          legend: {
              labels: {
                  color: textColor
              }
          }
      },
      scales: {
          y: {
              beginAtZero: true,
              ticks: {
                  color: textColorSecondary
              },
              grid: {
                  color: surfaceBorder,
                  drawBorder: false
              }
          },
          x: {
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
