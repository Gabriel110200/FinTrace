import { Component, OnInit, ViewChild, Output, EventEmitter } from "@angular/core"
import { MatDialog } from "@angular/material/dialog"
import { MatPaginator } from "@angular/material/paginator"
import { MatTableDataSource } from "@angular/material/table"
import { ToastrService } from "ngx-toastr"
import { Subscription } from "rxjs"
import { DialogGenericoComponent } from "src/app/shared/dialogGenerico/dialogGenerico.component"
import { SharedService } from "src/app/shared/service/shared.service"
import { CadTransacaoComponent } from "../cadTransacao/cadTransacao.component"
import { Transacao, CadTransacao } from "../model/transacao"
import { TransacoesService } from "../service/transacoes.service"


@Component({
  selector: 'app-tabelaTransacoes',
  templateUrl: './tabelaTransacoes.component.html',
  styleUrls: ['./tabelaTransacoes.component.css']
})
export class TabelaTransacoesComponent implements OnInit {

  lista: any[] = [

  ]

  colunasTabela: string[] = ['transacao', 'categoria', 'valor', 'data', 'descricao', 'alteracao']
  dados = new MatTableDataSource<any>()
  dadoOriginal = new MatTableDataSource<any>()
  excluirRegistro$!: Subscription
  userId:number = +this.shared.obterId()

  start: number = 0
  limit: number = 10
  end: number = this.limit + this.start
  selectedRowIndex!: number
  limite = 0

  get$!:Subscription
  post$!:Subscription

  @ViewChild(MatPaginator, { static: false }) paginator!: MatPaginator;

  @Output()
  registroExcluido: EventEmitter<number> = new EventEmitter

  @Output()
  registroAlterado: EventEmitter<any> = new EventEmitter

  constructor(
    protected service: TransacoesService,
    private shared: SharedService,
    private dialog: MatDialog,
    private transacoesService: TransacoesService,
    private toast: ToastrService
  ) { }

  ngOnChanges() {
    console.log('xablau')
    this.atualizaRegistros()
  }

  ngOnInit() {
    this.atualizaRegistros()
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
    return this.dadoOriginal.data.filter((value, index) => index > start && index < end)
  }

  updateIndex() {
    this.start = this.end
    this.end = this.limit + this.start

  }

  atualizaRegistros() {
    console.log('lista: ', this.lista)
    this.dados.data = this.lista
    this.dadoOriginal.data = this.lista
    this.dados.paginator = this.paginator
  }

  adicionaRegistro(item: Transacao) {

    let dadosPreInsert = [];
    dadosPreInsert.push(...this.lista, item);

    console.log('pre: ', dadosPreInsert)

    const valido = this.service.verificaLimiteGasto(dadosPreInsert, true)

    if(valido){
      this.toast.error('Transação ultrapassou o limite de gastos para o mês. Tenha atenção nos gastos')

      const transacao:CadTransacao = {
        userId: this.userId,
        categoryId: item.category.id,
        type: item.type,
        amount: item.amount,
        date: item.date,
        description: item.description,
        goalId: null,
        recurring: item.recurring
      }

      this.post$ = this.transacoesService.cadastrarTransacao(transacao).subscribe(
        (dado) => {
          this.toast.success('Transacao cadastrada com sucesso')
          this.recuperarTransacoes()
        }
      )

    } else {
      console.log(item)

      const transacao:CadTransacao = {
        userId: this.userId,
        categoryId: item.category.id,
        type: item.type,
        amount: item.amount,
        date: item.date,
        description: item.description,
        goalId: null,
        recurring: item.recurring
      }

      this.post$ = this.transacoesService.cadastrarTransacao(transacao).subscribe(
        (dado) => {
          this.toast.success('Transacao cadastrada com sucesso')
          this.recuperarTransacoes()
        }
      )
    }
  }

  adicionaRecorrente(item: Transacao) {

    let transacoesInsert: Transacao[] = []
    let mes = +item.date.substring(5, 7)
    let ano = +item.date.substring(0, 4)

    for (let i = 0; i < 12; i++) {
        if (mes > 12) {
            mes = 1
            ano++
        }

        const mesFormatado = mes < 10 ? `0${mes}` : `${mes}`

        const trans: Transacao = {
            type: item.type,
            category: item.category,
            amount: item.amount,
            date: `${ano}-${mesFormatado}-01`,
            description: item.description,
            recurring: item.recurring
        }

        transacoesInsert.push(trans)
        mes++
    }

    let dadosPreInsert = [];
    dadosPreInsert.push(...this.lista, ...transacoesInsert);

    console.log('Lista que montei: ', dadosPreInsert)

    const valido = this.service.verificaLimiteGasto(dadosPreInsert, true)

    if(valido){
      this.toast.error('Transação ultrapassou o limite de gastos para o mês. Tenha atenção nos gastos')

      const transacao:CadTransacao = {
        userId: this.userId,
        categoryId: item.category.id,
        type: item.type,
        amount: item.amount,
        date: item.date,
        description: item.description,
        goalId: null,
        recurring: item.recurring
      }

      this.post$ = this.transacoesService.cadastrarTransacao(transacao).subscribe(
        (dado) => {
          this.toast.success(`Transações recorrentes cadastradas com sucesso`);
          this.recuperarTransacoes();
        }
      )

    } else {

      const transacao:CadTransacao = {
        userId: this.userId,
        categoryId: item.category.id,
        type: item.type,
        amount: item.amount,
        date: item.date,
        description: item.description,
        goalId: null,
        recurring: item.recurring
      }

      this.post$ = this.transacoesService.cadastrarTransacao(transacao).subscribe(
        (dado) => {
          this.toast.success(`Transações recorrentes cadastradas com sucesso`);
          this.recuperarTransacoes();
        }
      )
    }

  }


  retornaRegistros() {
    return this.dados.data
  }

  editar(element: any) {
    const dialogRef = this.dialog.open(CadTransacaoComponent, {
      width: '700px',
      height: '507px',
      data: {
        recorrente: null,
        acaoTitulo: 'Atualização',
        form: element,
        editar: true
      }
    });

    dialogRef.afterClosed().subscribe(val=>{
      let listaEstatica:any = []
      this.lista.forEach(
        (dado) => {
          if(dado.type == val.type){
            listaEstatica.push(val)
          } else {
            listaEstatica.push(dado)
          }
        }
      )
      this.lista = listaEstatica
      this.atualizaRegistros()
    })
  }

  reiniciar() {
    this.dados.data = this.dadoOriginal.data
  }

  recuperarTransacoes(){
    this.get$ = this.transacoesService.listarTransacoes().subscribe(
      (dado) => {
        console.log('transacoes: ',dado)
        this.lista = dado
        const limites = this.service.verificaLimiteGasto(this.lista, false)
        console.log('meus limites: ', limites)
        console.log('tamanho e limite', limites.length, this.limite)
        if(limites.length > this.limite){
          this.limite = limites.length
          this.dialog.open(DialogGenericoComponent, {
            data:{
              limites: limites
            }
          })

        }
        this.atualizaRegistros()
      }
    )
  }

  pesquisar(form: any) {
    console.log('chegamos: ', form)
    if (form.mes || form.ano) {
      this.listarDatas(form)
    } else if (form.transacao) {
      this.listarTransacao(form)
    } else {
      this.listarCategoria(form)
    }
  }


  retornaDataInicio(mes: string, ano: number): Date {
    const meses:any = {
      janeiro: 31,
      fevereiro: 28,
      março: 31,
      abril: 30,
      maio: 31,
      junho: 30,
      julho: 31,
      agosto: 31,
      setembro: 30,
      outubro: 31,
      novembro: 30,
      dezembro: 31
    };

    const mesIndex = Object.keys(meses).indexOf(mes.toLowerCase());
    return new Date(ano, mesIndex, 1)
  }

  retornaDataFim(mes: string, ano: number) {
    const meses:any = {
      janeiro: 31,
      fevereiro: 28,
      março: 31,
      abril: 30,
      maio: 31,
      junho: 30,
      julho: 31,
      agosto: 31,
      setembro: 30,
      outubro: 31,
      novembro: 30,
      dezembro: 31
    };

    if (mes.toLowerCase() === 'fevereiro' && this.anoBissexto(ano)) {
      return new Date(ano, 1, 29)
    }

    return new Date(ano, Object.keys(meses).indexOf(mes.toLowerCase()), meses[mes.toLowerCase()])
  }

  anoBissexto(ano: number) {
    return (ano % 4 === 0 && ano % 100 !== 0) || (ano % 400 === 0);
  }


  listarDatas(form: any) {
    console.log('passando lista datas')
    console.log(form)
    const dataInicio = this.retornaDataInicio(form.mes, form.ano).toISOString().substring(0,10)
    const dataFim = this.retornaDataFim(form.mes, form.ano).toISOString().substring(0,10)
    console.log(dataInicio, dataFim)
    if (dataInicio && dataFim) {
      this.listarTransacao(
        form,
        this.lista.filter(
          (dado) => {
            console.log(dado.date)
            console.log(dataInicio)
            console.log(dataFim)
            return Date.parse(dado.date) >= Date.parse(dataInicio) && Date.parse(dado.date) <= Date.parse(dataFim)
          }
        )
      )
    } else if (form.dataInicio) {
      this.listarTransacao(
        form,
        this.lista.filter(
          (dado) => {
            return Date.parse(dado.date) >= Date.parse(form.dataInicio)
          }
        )
      )
    } else {
      this.listarTransacao(
        form,
        this.lista.filter(
          (dado) => {
            return Date.parse(dado.date) <= Date.parse(form.dataFim)
          }
        )
      )
    }
  }

  listarTransacao(form: any, dadoFiltrado?: any[]) {
    console.log('passando lista id')
    if (form.transacao && dadoFiltrado) {
      console.log('transacao e categoria')
      this.listarCategoria(
        form,
        dadoFiltrado.filter(
          (dado) => {
            return dado.type == form.transacao
          }
        )
      )
    } else if (form.transacao) {
      console.log('transacao')
      this.listarCategoria(
        form,
        this.lista.filter(
          (dado) => {
            return dado.type == form.transacao
          }
        )
      )
    } else if (dadoFiltrado) {
      console.log('sem transacao')
      this.listarCategoria(
        form,
        dadoFiltrado
      )
    } else {
      this.listarCategoria(form)
    }
  }


  listarCategoria(form: any, dadoFiltrado?: any[]) {
    if (form.categoria && dadoFiltrado) {
      console.log('filtro e categoria')
      this.dados.data = dadoFiltrado.filter(
        (dado) => {
          return dado.category?.name == form.categoria.name
        }
      )
    } else if (form.categoria) {
      console.log('so categoria')
      this.dados.data = this.lista.filter(
        (dado) => {
          return dado.category?.name == form.categoria.name
        }
      )
    } else if (dadoFiltrado) {
      console.log('o que sobro')
      this.dados.data = dadoFiltrado
    }
  }

}


