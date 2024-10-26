import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CadTransacaoComponent } from './cadTransacao/cadTransacao.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TabelaTransacoesComponent } from './tabelaTransacoes/tabelaTransacoes.component';
import { TransacoesService } from './service/transacoes.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { CategoriaService } from '../gerenciamentoCategorias/service/categoria.service';
import { categoria } from '../gerenciamentoCategorias/model/categoria';

@Component({
  selector: 'app-gerenciamentoTransacoes',
  templateUrl: './gerenciamentoTransacoes.component.html',
  styleUrls: ['./gerenciamentoTransacoes.component.css']
})
export class GerenciamentoTransacoesComponent implements OnInit {

  pesquisa!:FormGroup

  tipoTransacao:any[] = [
    {id:'RECEITA', nome: 'Receita'},
    {id:'DESPESA', nome: 'Despesa'},
  ]

  get$!:Subscription
  put$!:Subscription

  tipoCategoria!:categoria[]

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
    protected service: TransacoesService,
    private categoriaService: CategoriaService
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

    setTimeout(()=> {
      this.listarCategorias()
      this.criaAnos()
      this.tabela?.recuperarTransacoes()
    }, 0)
  }

  listarCategorias(){
    this.get$ = this.categoriaService.listarCategorias().subscribe(
      (dado) => {
        this.tipoCategoria = dado
      }
    )
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
    this.pesquisa.reset()
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
          acaoTitulo: 'Cadastro',
          categoria: this.tipoCategoria
        }
      })
  
      dialogRef.afterClosed().subscribe(val=>{
        if(val){
          console.log('recorrente:',val)
          this.tabela.adicionaRecorrente(val)
        }
      })

    } else {
      const dialogRef = this.dialog.open(CadTransacaoComponent, {
        width: '700px',
        height: '507px',
        data: {
          recorrente: null,
          acaoTitulo: 'acao',
          categoria: this.tipoCategoria
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
