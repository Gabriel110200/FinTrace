import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CadTransacaoComponent } from './cadTransacao/cadTransacao.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TabelaTransacoesComponent } from './tabelaTransacoes/tabelaTransacoes.component';
import { TransacoesService } from './service/transacoes.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-gerenciamentoTransacoes',
  templateUrl: './gerenciamentoTransacoes.component.html',
  styleUrls: ['./gerenciamentoTransacoes.component.css']
})
export class GerenciamentoTransacoesComponent implements OnInit {

  pesquisa!:FormGroup

  tipoTransacao:any[] = [
    {id:'R', nome: 'Receita'},
    {id:'D', nome: 'Despesa'},
  ]

  tipoCategoria:any[] = [
    {id:'C', nome: 'Casa'},
    {id:'E', nome: 'Escola'},
    {id:'T', nome: 'Trabalho'},
    {id:'X', nome: 'Estudo'}
  ]

  meses:any[] = [
    'Janeiro',
    'Fevereiro',
    'Março',
    'Abril',
    'Maio',
    'Junho',
    'Julho',
    'Agosto',
    'Setembro',
    'Outubro',
    'Novembro',
    'Dezembro',
  ]

  anos:number[] = [] 


  @ViewChild(TabelaTransacoesComponent)tabela!: TabelaTransacoesComponent

  constructor(
    private dialog: MatDialog,
    private form: FormBuilder,
    private router: Router,
    protected service: TransacoesService
  ) { }

  ngOnInit() {

    this.pesquisa = this.form.group({
      transacao: [null],
      categoria: [null],
      dataInicio: [null],
      dataFim: [null],
      mes: [null, [Validators.required]],
      ano: [null, [Validators.required]]

    })
    this.criaAnos()
    setTimeout(()=> {this.anos}, 3000)
  }

  obtemDespesa(){
    const item = this.tabela?.retornaRegistros()
    if(item?.length > 0){
      return this.service.retornaTotalDespesa(item)
    }else{
      return 0
    }
  }

  obtemReceita(){
    const item = this.tabela?.retornaRegistros()
    if(item?.length > 0){
      return this.service.retornaTotalReceita(item)
    }else{
      return 0
    }
  }

  obtemSaldo(){
    const receita = this.obtemReceita()
    const despesa = this.obtemDespesa()
    return parseFloat(receita.toFixed(2)) - parseFloat(despesa.toFixed(2))
  }

  criaAnos(){
    const data = new Date()
    const anoAtual = data.getFullYear()
    
    for (let i = 0; i < 20; i++) {
      this.anos.push(anoAtual - i);
    }
  }

  pesquisar(){
    this.tabela?.pesquisar(this.pesquisa.value)
  }

  resetar(){
    this.pesquisa.reset()
    this.pesquisa.markAsPristine()
    this.tabela?.reiniciar()
  }

  home(){
    this.router.navigate(['/'])
  }

  dialogTransacao(acao:string){

    if(acao=='recorrente'){
      const dialogRef = this.dialog.open(CadTransacaoComponent, {
        width: '700px',
        height: '507px',
        data: {
          recorrente: acao,
          acaoTitulo: 'Cadastro'
        }
      })
  
      dialogRef.afterClosed().subscribe(val=>{
        if(val){
          this.tabela.adicionaRegistro(val)
        }
      })

    } else {
      const dialogRef = this.dialog.open(CadTransacaoComponent, {
        width: '700px',
        height: '507px',
        data: {
          recorrente: null,
          acaoTitulo: 'acao'
        }
      })
  
      dialogRef.afterClosed().subscribe(val=>{
        if(val){
          this.tabela.adicionaRegistro(val)
        }
      })

    }


    
  }

}
