import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { TransacoesService } from 'src/app/gerenciamentoTransacoes/service/transacoes.service';
import { CategoriaService } from '../service/categoria.service';
import { categoria } from '../model/categoria';
import { DialogExcluirComponent } from 'src/app/shared/component/dialogExcluir/dialogExcluir.component';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { CadCategoriaComponent } from '../cadCategoria/cadCategoria.component';
import { CadCategoriaLimiteComponent } from '../cadCategoriaLimite/cadCategoriaLimite.component';

@Component({
  selector: 'app-tabelaCategorias',
  templateUrl: './tabelaCategorias.component.html',
  styleUrls: ['./tabelaCategorias.component.css']
})
export class TabelaCategoriasComponent implements OnInit {

  lista: any[] = [
  ]

  lista2: any[] = [
  ]

  colunasTabela: string[] = ['descricao', 'alteracao']
  colunasTabela2: string[] = ['descricao', 'valor', 'alteracao']
  dados = new MatTableDataSource<categoria[]>()
  dados2 = new MatTableDataSource<categoria[]>() //mudar o tipo pra categoria nova
  excluirRegistro$!: Subscription

  start: number = 0
  limit: number = 10
  end: number = this.limit + this.start
  selectedRowIndex!: number

  get$!:Subscription
  delete$!:Subscription
  put$!:Subscription

  @ViewChild(MatPaginator, { static: false }) paginator!: MatPaginator;
  @ViewChild(MatPaginator, { static: false }) paginator2!: MatPaginator;

  @Output()
  registroExcluido: EventEmitter<number> = new EventEmitter

  constructor(
    protected service: TransacoesService,
    private categoriaService: CategoriaService, 
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
    this.dados.data = this.lista
    this.dados2.data = this.lista
    //this.dadoOriginal.data = this.lista
    this.dados.paginator = this.paginator
    this.dados2.paginator = this.paginator2
  }

  adicionaRegistro(item: any) {
    this.lista.push(item)
    console.log(this.lista)
    this.atualizaRegistros()
  }

  retornaRegistros() {
    return this.dados.data
  }

  buscaRegistros(){
    this.get$ = this.categoriaService.listarCategorias().subscribe(
      (dado) => {
        this.lista = dado
        this.atualizaRegistros()
      }
    )
  }

  editar(dado: categoria) {
    const dialogRef = this.dialog.open(CadCategoriaComponent, {
      width: '500px',
      height: '246px',
      data: {
        dado: dado
      }
    })

    dialogRef.afterClosed().subscribe(val=>{
      console.log(val)
      if(val?.id){
        this.put$ = this.categoriaService.atualizarCategoria(val.id, val).subscribe({
          next: (dado) => {
            console.log(dado),
            this.toast.success('Categoria atualizada com sucesso')
            this.buscaRegistros()
          },
          error: (dado) => {
            this.toast.error(dado)
          }
        })
      }
    })
  }

  editarLimite(dado: categoria) {
    const dialogRef = this.dialog.open(CadCategoriaLimiteComponent, {
      width: '500px',
      height: '246px',
      data: {
        dado: dado
      }
    })

    dialogRef.afterClosed().subscribe(val=>{
      console.log(val)
      if(val?.id){
        console.log('tenho valid')
        console.log(val, val.id)
        this.put$ = this.categoriaService.atualizarCategoria(val.id, val).subscribe({
          next: (dado) => {
            console.log(dado),
            this.toast.success('Limite atualizado com sucesso')
            this.buscaRegistros()
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
    this.delete$ = this.categoriaService.removerCategoria(id).subscribe({
      next: (dado) => {
        this.toast.success('Registro Excluído')
        this.registroExcluido.emit(id)
      }
    })


  }

  removerLimiteCategoria(registro: categoria) {
    const dialogRef = this.dialog.open(DialogExcluirComponent);
  
    dialogRef.afterClosed().subscribe(val=>{

      if(val){
        const remocaoLimite:categoria = {
          id: registro.id,
          name: registro.name,
          limit: 0
        }
        console.log('remocao limite: ', remocaoLimite)
        if(remocaoLimite.id){
          this.put$ = this.categoriaService.atualizarCategoria(remocaoLimite.id, remocaoLimite).subscribe(
            (dado)=> {
              this.toast.success('Limite Removido')
              this.buscaRegistros()
            }
          )
        }else{
          this.toast.error('Erro ao remover limite')
        }
      }
    })
  }


  reiniciar() {
    //this.dados.data = this.dadoOriginal.data
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
