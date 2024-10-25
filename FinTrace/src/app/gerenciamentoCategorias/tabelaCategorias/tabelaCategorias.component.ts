import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { TransacoesService } from 'src/app/gerenciamentoTransacoes/service/transacoes.service';

@Component({
  selector: 'app-tabelaCategorias',
  templateUrl: './tabelaCategorias.component.html',
  styleUrls: ['./tabelaCategorias.component.css']
})
export class TabelaCategoriasComponent implements OnInit {

  lista: any[] = [

  ]

  colunasTabela: string[] = ['descricao', 'alteracao']
  dados = new MatTableDataSource<any>()
  dadoOriginal = new MatTableDataSource<any>()
  excluirRegistro$!: Subscription

  start: number = 0
  limit: number = 10
  end: number = this.limit + this.start
  selectedRowIndex!: number

  @ViewChild(MatPaginator, { static: false }) paginator!: MatPaginator;

  @Output()
  registroExcluido: EventEmitter<number> = new EventEmitter

  constructor(
    protected service: TransacoesService
  ) { }

  ngOnChanges() {
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
    this.dados.data = this.lista
    this.dadoOriginal.data = this.lista
    this.dados.paginator = this.paginator
  }

  adicionaRegistro(item: any) {
    this.lista.push(item)
    console.log(this.lista)
    this.atualizaRegistros()
  }

  retornaRegistros() {
    return this.dados.data
  }

  editar(id: any) {


  }

  remover(id: number) {
    /*const dialogRef = this.dialog.open(DialogExcluirComponent);
  
    dialogRef.afterClosed().subscribe(val=>{

      if(val){
      this.excluirForm(id, this.cde);
    }
  })*/
  }

  excluirForm(id: number, cde: number) {
    /*this.excluirRegistro$ = this.service.excluirForm481(id, cde).subscribe({
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
      fevereiro: 28, // 29 em anos bissextos
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
    // O mês começa em 0 no objeto Date (0 = janeiro, 1 = fevereiro, etc.)
    const mesIndex = Object.keys(meses).indexOf(mes);
    
    // Retorna a primeira data do mês
    return new Date(ano, mesIndex, 1); // 1º dia do mês
  }

  retornaDataFim(mes: string, ano: number) {
    // Mapeia os meses e seus dias
    const meses:any = {
      janeiro: 31,
      fevereiro: 28, // 29 em anos bissextos
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
  
  
    // Verifica se o ano é bissexto
    if (mes.toLowerCase() === 'fevereiro' && this.anoBissexto(ano)) {
      return new Date(ano, 1, 29); // Fevereiro, 29 dias
    }
  
    return new Date(ano, Object.keys(meses).indexOf(mes.toLowerCase()), meses[mes.toLowerCase()]); // Último dia do mês
  }
  
  // Método auxiliar para verificar se um ano é bissexto
  anoBissexto(ano: number) {
    return (ano % 4 === 0 && ano % 100 !== 0) || (ano % 400 === 0);
  }
  

  listarDatas(form: any) {
    console.log('passando lista datas')
    const dataInicio = this.retornaDataInicio(form.mes, form.ano).toISOString().substring(0,10)
    const dataFim = this.retornaDataFim(form.mes, form.ano).toISOString().substring(0,10)
    console.log(dataInicio, dataFim)
    if (dataInicio && dataFim) {
      this.listarTransacao(
        form,
        this.lista.filter(
          (dado) => {
            return Date.parse(dado.dataTransacao.substring(0, 10)) >= Date.parse(dataInicio) && Date.parse(dado.dataTransacao.substring(0, 10)) <= Date.parse(dataFim)
          }
        )
      )
    } else if (form.dataInicio) {
      this.listarTransacao(
        form,
        this.lista.filter(
          (dado) => {
            return Date.parse(dado.dataTransacao.substring(0, 10)) >= Date.parse(form.dataInicio)
          }
        )
      )
    } else {
      this.listarTransacao(
        form,
        this.lista.filter(
          (dado) => {
            return Date.parse(dado.dataTransacao.substring(0, 10)) <= Date.parse(form.dataFim)
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
            return dado.tipoTransacao == form.transacao
          }
        )
      )
    } else if (form.transacao) {
      console.log('transacao')
      this.listarCategoria(
        form,
        this.lista.filter(
          (dado) => {
            return dado.tipoTransacao == form.transacao
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
          return dado.categoria == form.categoria
        }
      )
    } else if (form.categoria) {
      console.log('so categoria')
      this.dados.data = this.lista.filter(
        (dado) => {
          return dado.categoria == form.categoria
        }
      )
    } else if (dadoFiltrado) {
      console.log('o que sobro')
      this.dados.data = dadoFiltrado
    }
  }

}
