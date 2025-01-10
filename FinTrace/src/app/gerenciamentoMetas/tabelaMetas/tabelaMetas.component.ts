import { SharedService } from './../../shared/service/shared.service';
import { Metas } from './../model/Metas';
import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { ProgressSpinnerMode } from '@angular/material/progress-spinner';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { Subscription, forkJoin } from 'rxjs';
import { categoria } from 'src/app/gerenciamentoCategorias/model/categoria';
import { CategoriaService } from 'src/app/gerenciamentoCategorias/service/categoria.service';
import { TransacoesService } from 'src/app/gerenciamentoTransacoes/service/transacoes.service';
import { MetasService } from '../service/metas.service';
import { GerMetasComponent } from '../gerMetas/gerMetas.component';
import { transacao } from 'src/app/gerenciamentoTransacoes/model/transacao';
import { CadMetasComponent } from '../cadMetas/cadMetas.component';
import { DialogExcluirComponent } from 'src/app/shared/component/dialogExcluir/dialogExcluir.component';
import { ContasTerceiro } from '../model/contasTerceiro';

@Component({
  selector: 'app-tabelaMetas',
  templateUrl: './tabelaMetas.component.html',
  styleUrls: ['./tabelaMetas.component.css']
})
export class TabelaMetasComponent implements OnInit {

  @Input()
  tipoMetas!:Metas[]

  @ViewChild('chart') chartElement!: ElementRef;

  userId = +this.shared.obterId()
  carregando = false

  basicData: any;
  basicOptions: any;
  data: any;
  contas = ['Conta Corrente Banco Alfa', 'Conta Poupança Banco Alfa', 'Conta Corrente Banco Gama', 'Conta Poupança Banco Gama', 'Conta Especial']
  contasRecuperadas:ContasTerceiro[] = []
  contasaAdicionar:ContasTerceiro [] = []
  mode: ProgressSpinnerMode = 'determinate';

  options: any;

  colunasTabela: string[] = ['descricao', 'descricao2', 'alteracao']
  colunasTabela2: string[] = ['descricao', 'valor', 'alteracao']
  dados = new MatTableDataSource<Metas>()
  dados2 = new MatTableDataSource<Metas>() //mudar o tipo pra categoria nova
  excluirRegistro$!: Subscription

  start: number = 0
  limit: number = 10
  end: number = this.limit + this.start
  selectedRowIndex!: number

  get$!:Subscription
  post$!:Subscription
  delete$!:Subscription
  put$!:Subscription

  @ViewChild(MatPaginator, { static: false }) paginator!: MatPaginator;
  @ViewChild(MatPaginator, { static: false }) paginator2!: MatPaginator;

  @Output()
  atualizacaoMeta: EventEmitter<any> = new EventEmitter

  constructor(
    protected service: MetasService,
    private shared: SharedService,
    private dialog: MatDialog,
    private toast: ToastrService
  ) { }

  ngOnChanges() {
    this.atualizaRegistros()
  }

  ngOnInit() {
  }

  tableScroll(e: any) {
    const tableViewHeight = e.target.offsetHeight
    const tableScrollHeight = e.target.scrollHeight
    const scrollLocation = e.target.scrollTop

    const buffer = 2000
    const limit = tableScrollHeight - tableViewHeight - buffer

    if ((scrollLocation > limit)) { //&& !this.pesquisa
      let data = this.getTableData(this.start, this.end)
      this.dados.data = this.dados.data.concat(data)
      this.updateIndex()
    }
  }

  getTableData(start: any, end: any) {
    return this.dados.data.filter((value, index) => index > start && index < end)
  }

  updateIndex() {
    this.start = this.end
    this.end = this.limit + this.start

  }

  atualizaRegistros() {
    this.dados.data = this.tipoMetas
    this.dados.paginator = this.paginator
  }

  calculaPorcentagem(item:Metas){
    return (((item.currentValue ?? 1)/item.necessaryValue)*100).toFixed(2);
  }

  abrirTabela(transacoes:transacao[]){
    console.log(transacoes)
    const dialogRef = this.dialog.open(GerMetasComponent, {
      width: '1000px',
      height: '400px',
      data: {
        transacoes: transacoes
      }
    })
  }

  atualizarMeta(meta:Metas){

    const dialogRef = this.dialog.open(CadMetasComponent, {
      width: '500px',
      height: '337px',
      data: {
        dado: meta
      }
    })

    dialogRef.afterClosed().subscribe(val=>{
      if(val){
        this.post$ = this.service.atualizarMeta(val).subscribe({
          next: (dado) => {
            console.log(dado),
            this.toast.success('Meta atualizada com sucesso!')
            this.atualizacaoMeta.emit(dado)
          },
          error: (dado) => {
            this.toast.error(dado)
          }
        })
      }
    })
  }

  remover(id: number) {
    const dialogRef = this.dialog.open(DialogExcluirComponent);

    dialogRef.afterClosed().subscribe(val=>{

      if(val){
      this.excluirForm(id);
    }
  })
  }

  excluirForm(id: number) {
    this.delete$ = this.service.removerMeta(id).subscribe({
      next: (dado) => {
        this.toast.success('Registro Excluído')
        this.atualizacaoMeta.emit(dado)
      }
    })
  }

  adicionaContas(){
    this.toast.info('Buscando dados de outras instituições')
    this.carregando = true
    const contasUsuario = Math.floor(Math.random() * 5) + 1
    let sucesso = 0

    for(let i=0;i<contasUsuario;i++){
      const conta:ContasTerceiro = {
        userId: this.userId,
        name: this.contas[i],
        amount: this.service.retornaSaldoAleatorio()
      }
      this.contasaAdicionar.push(conta)
    }

    const observables$ = this.contasaAdicionar.map(item => this.service.cadastrarContas(item))

    forkJoin(observables$).subscribe({
      next: (resultado) => {
        this.carregando = false
        this.listarContas()
        this.toast.success('Contas recuperadas com Sucesso')
      }
    })

  }

  listarContas(){
    this.get$ = this.service.listarContas().subscribe(
      (dado) =>{
        console.log(dado)
        this.contasRecuperadas = dado
      }
    )
  }



  // Método para gerar um filtro diferente baseado no índice
  getFilter(index: number): string {
    const colors = [
      'hue-rotate(0deg)',    // Sem alteração
      'hue-rotate(60deg)',   // Tons de azul
      'hue-rotate(120deg)',  // Tons de verde
      'hue-rotate(180deg)',  // Tons de amarelo
      'hue-rotate(240deg)'   // Tons de vermelho
    ];

    // Retorna o filtro baseado no índice, se necessário, use a lógica para mais variações
    return colors[index % colors.length];
  }



}






