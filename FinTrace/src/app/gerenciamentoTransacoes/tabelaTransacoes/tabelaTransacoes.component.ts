import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { TransacoesService } from '../service/transacoes.service';
import { DialogExcluirComponent } from 'src/app/shared/component/dialogExcluir/dialogExcluir.component';
import { MatDialog } from '@angular/material/dialog';
import { CadTransacaoComponent } from '../cadTransacao/cadTransacao.component';
import { transacao } from '../model/transacao';
import { ToastrService } from 'ngx-toastr';
import { transacaoRecorrente } from '../model/transacaoRec';

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

  start: number = 0
  limit: number = 10
  end: number = this.limit + this.start
  selectedRowIndex!: number

  get$!:Subscription
  post$!:Subscription

  @ViewChild(MatPaginator, { static: false }) paginator!: MatPaginator;

  @Output()
  registroExcluido: EventEmitter<number> = new EventEmitter

  @Output()
  registroAlterado: EventEmitter<any> = new EventEmitter

  constructor(
    protected service: TransacoesService,
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

  adicionaRegistro(item: transacao) {
    
    this.post$ = this.transacoesService.cadastrarTransacao(item).subscribe(
      (dado) => {
        this.toast.success('Transacao cadastrada com sucesso')
        this.recuperarTransacoes()
      }
    )

    /*console.log(item)
    const data = this.service.retornaMes(item.date.substring(5,7))
    const ano = +item.date.substring(0,4)
    const idCategoria = item.category.id
    console.log(data)

    const dataInicio = this.retornaDataInicio(data, ano).toISOString().substring(0,10)
    const dataFim = this.retornaDataFim(data, ano).toISOString().substring(0,10)
    const valor = item.amount
    const despesas = this.dados.data.filter(
      (dado) => Date.parse(dado.date) >= Date.parse(dataInicio) && Date.parse(dado.date) <= Date.parse(dataFim) && dado.type == 'DESPESA' && dado.category.id == idCategoria
    )

    const totalDespesas = this.service.retornaTotalDespesa(despesas)
    console.log('limite: ',item.category.limit )
    console.log('despesas: ',totalDespesas )

    if((totalDespesas+item.amount)>item.category.limit && item.category.limit!=0){
      this.toast.error('Despesa irá ultrapassar o teto de gastos! Registro não adicionado')
    } else {
      if ((totalDespesas + item.amount) >= (item.category.limit * 0.8) && item.category.limit!=0) {
        this.post$ = this.transacoesService.cadastrarTransacao(item).subscribe(
          (dado) => {
            this.toast.warning('Atenção! Você já consumiu mais de 80% do Limite estipulado!')
            this.toast.success('Transacao cadastrada com sucesso')
            this.recuperarTransacoes()
          }
        )
      } else {
        this.post$ = this.transacoesService.cadastrarTransacao(item).subscribe(
          (dado) => {
            this.toast.success('Transacao cadastrada com sucesso')
            this.recuperarTransacoes()
          }
        )
      }
    }*/
  }

  adicionaRecorrente(item: transacao) {

    this.post$ = this.transacoesService.cadastrarTransacao(item).subscribe(
      (dado) => {
        this.toast.success(`Transações recorrentes cadastradas com sucesso`);
        this.recuperarTransacoes();
      }
    );

    /*console.log(item);
    const itemOriginal:transacaoRecorrente = {
      type: item.type,
      category: item.category,
      amount: item.amount,
      description: item.description,
      day: item.day
    }
    const valor = item.amount;
    let podeAdicionarTodas = true;*/
  
    // Loop para cada mês do ano especificado
    /*for (let mes = 1; mes <= 12; mes++) {
      let mesLocal = ''
      if(mes<10){
        mesLocal = `0${mes}`
      } else {
        mesLocal = `${mes}`
      }

      console.log(item)
      const data = this.service.retornaMes(mesLocal)
      const ano = 2024
      const idCategoria = item.category.id
      console.log(data)

      const dataInicio = this.retornaDataInicio(data, ano).toISOString().substring(0,10)
      const dataFim = this.retornaDataFim(data, ano).toISOString().substring(0,10)
      const valor = item.amount
      const despesas = this.dados.data.filter(
        (dado) => Date.parse(dado.date) >= Date.parse(dataInicio) && Date.parse(dado.date) <= Date.parse(dataFim) && dado.type == 'DESPESA' && dado.category.id == idCategoria
      )

      const totalDespesas = this.service.retornaTotalDespesa(despesas)
      console.log('limite: ',item.category.limit )
      console.log('despesas: ',totalDespesas )*/
      

      /*const data = this.service.retornaMes(mesLocal)

      console.log('mesLocal: ', data)
      console.log('ano: ', ano)
      console.log('return',this.retornaDataInicio(data, ano).toISOString().substring(0, 10))
      console.log('return',this.retornaDataFim(data, ano).toISOString().substring(0, 10))
      
      const dataInicio = this.retornaDataInicio(mesLocal, ano)?.toISOString()?.substring(0, 10);
      const dataFim = this.retornaDataFim(mesLocal, ano)?.toISOString()?.substring(0, 10);
  
      // Filtra as despesas existentes no mês e categoria especificados
      const despesas = this.dados.data.filter(
        (dado) => 
          Date.parse(dado.date) >= Date.parse(dataInicio) &&
          Date.parse(dado.date) <= Date.parse(dataFim) &&
          dado.type == 'DESPESA' &&
          dado.category.id == idCategoria
      );*/
  
      // Soma as despesas do mês
  
      // Verifica se a adição da transação ultrapassa o limite
     /* if ((totalDespesas + valor) > item.category.limit && item.category.limit!=0) {
        this.toast.error(`Despesa no mês ${data.toUpperCase()} ultrapassará o teto de gastos! Transação não adicionada`);
        podeAdicionarTodas = false;
        break;
      }
    }*/
  
    // Se passar em todas as validações, adiciona a transação para cada mês
    /*if (podeAdicionarTodas) {
      for (let mes = 1; mes <= 12; mes++) {
        let mesLocal = ''
        if(mes<10){
          mesLocal = `0${mes}`
        } else {
          mesLocal = `${mes}`
        }
  
        console.log(item)
        const data = this.service.retornaMes(mesLocal)
        const ano = 2024
        const idCategoria = item.category.id
        console.log(data)
  
        const dataInicio = this.retornaDataInicio(data, ano).toISOString().substring(0,10)
        const dataFim = this.retornaDataFim(data, ano).toISOString().substring(0,10)
        const valor = item.amount
        const despesas = this.dados.data.filter(
          (dado) => Date.parse(dado.date) >= Date.parse(dataInicio) && Date.parse(dado.date) <= Date.parse(dataFim) && dado.type == 'DESPESA' && dado.category.id == idCategoria
        )
  
        const totalDespesas = this.service.retornaTotalDespesa(despesas)
        console.log('limite: ',item.category.limit )

        if ((totalDespesas + valor) >= (item.category.limit * 0.8)  && item.category.limit!=0) {
          this.toast.warning(`Atenção! No mês de ${data.toUpperCase()}, você já consumiu mais de 80% do Limite estipulado!`);
        } else {
         
        }

      }
      this.post$ = this.transacoesService.cadastrarTransacoesRecorrentes(itemOriginal).subscribe(
        (dado) => {
          this.toast.success(`Transações recorrentes cadastradas com sucesso`);
          this.recuperarTransacoes();
        }
      );
    }*/
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
      const txt = this.lista.forEach(
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

  remover(id: number) {
    const dialogRef = this.dialog.open(DialogExcluirComponent);
  
    dialogRef.afterClosed().subscribe(val=>{

      if(val){
      this.excluirForm();
    }
  })
  }

  excluirForm() {
    /*this.excluirRegistro$ = this.service.excluir().subscribe({
      next: (dado) => {
        console.log('dado:: ', dado)
      },
      complete: () => {
        this.toast.success('Registro Excluído')
        this.registroExcluido.emit(id)

      },
    })*/


  }

  reiniciar() {
    this.dados.data = this.dadoOriginal.data
  }

  recuperarTransacoes(){
    this.get$ = this.transacoesService.listarTransacoes().subscribe(
      (dado) => {
        console.log('transacoes: ',dado)
        this.lista = dado
        this.recuperarRecorrentes()
      }
    )
  }

  recuperarRecorrentes(){
    this.get$ = this.transacoesService.listarTransacoesRecorrentes().subscribe(
      (dado) => {
        if(dado.length>0){
          console.log('dado: ', dado)
          this.lista.push(...dado)
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
function swicth(mes: string) {
  throw new Error('Function not implemented.');
}

