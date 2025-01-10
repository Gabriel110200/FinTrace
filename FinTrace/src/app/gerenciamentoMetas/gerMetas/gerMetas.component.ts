
import { Component, Inject, Input, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

import { TransacoesService } from 'src/app/gerenciamentoTransacoes/service/transacoes.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-gerMetas',
  templateUrl: './gerMetas.component.html',
  styleUrls: ['./gerMetas.component.css']
})
export class GerMetasComponent implements OnInit {


  colunasTabela: string[] = ['transacao', 'valor', 'data', 'descricao']
  dados = new MatTableDataSource<any>()
  dadoOriginal = new MatTableDataSource<any>()
  transacoes = this.data.transacoes

  start: number = 0
  limit: number = 10
  end: number = this.limit + this.start
  selectedRowIndex!: number
  limite = 0

  @ViewChild(MatPaginator, { static: false }) paginator!: MatPaginator;


  constructor(
    protected service: TransacoesService,
    @Inject(MAT_DIALOG_DATA) public data:any,
  ) { }

  ngOnChanges() {
    console.log('xablau')
    this.atualizaRegistros()
  }

  ngOnInit() {
    console.log()
    setTimeout(()=> {
      this.atualizaRegistros()
    },0)
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

  atualizaRegistros(){
    console.log(this.transacoes)
    this.dados.data = this.transacoes
    this.dadoOriginal.data = this.transacoes
    this.dados.paginator = this.paginator
  }



}
