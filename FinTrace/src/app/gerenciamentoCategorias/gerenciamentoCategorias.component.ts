import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { CadTransacaoComponent } from '../gerenciamentoTransacoes/cadTransacao/cadTransacao.component';
import { TransacoesService } from '../gerenciamentoTransacoes/service/transacoes.service';
import { TabelaTransacoesComponent } from '../gerenciamentoTransacoes/tabelaTransacoes/tabelaTransacoes.component';
import { CadCategoriaComponent } from './cadCategoria/cadCategoria.component';
import { TabelaCategoriasComponent } from './tabelaCategorias/tabelaCategorias.component';
import { ActivatedRoute, Route, Router } from '@angular/router';

@Component({
  selector: 'app-gerenciamentoCategorias',
  templateUrl: './gerenciamentoCategorias.component.html',
  styleUrls: ['./gerenciamentoCategorias.component.css']
})
export class GerenciamentoCategoriasComponent implements OnInit {

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


  @ViewChild(TabelaCategoriasComponent)tabela!: TabelaCategoriasComponent

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

  dialogCategoria(){

    const dialogRef = this.dialog.open(CadCategoriaComponent, {
      width: '500px',
      height: '246px'
    })

    dialogRef.afterClosed().subscribe(val=>{
      if(val){
        this.tabela.adicionaRegistro(val)
      }
    })


    
  }


}
