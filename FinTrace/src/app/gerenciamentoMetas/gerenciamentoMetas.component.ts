import { SharedService } from './../shared/service/shared.service';
import { Subscription, Observable, forkJoin } from 'rxjs';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { TabelaCategoriasComponent } from '../gerenciamentoCategorias/tabelaCategorias/tabelaCategorias.component';
import { CadMetasComponent } from './cadMetas/cadMetas.component';
import { Metas } from './model/Metas';
import { TabelaMetasComponent } from './tabelaMetas/tabelaMetas.component';
import { CadTransacaoComponent } from '../gerenciamentoTransacoes/cadTransacao/cadTransacao.component';
import { MetasService } from './service/metas.service';
import { cadTransacao } from '../gerenciamentoTransacoes/model/transacao';

@Component({
  selector: 'app-gerenciamentoMetas',
  templateUrl: './gerenciamentoMetas.component.html',
  styleUrls: ['./gerenciamentoMetas.component.css']
})
export class GerenciamentoMetasComponent implements OnInit {

  userId:number = +this.sharedService.obterId()

  tipoMetas: Metas[] = []
  Metas$!: Observable<Metas[]>

  post$!:Subscription

  constructor(
    private dialog: MatDialog,
    private form: FormBuilder,
    private router: Router,
    private toast: ToastrService,
    private service: MetasService,
    private sharedService: SharedService
    ) { }

  @ViewChild(TabelaMetasComponent)tabela!: TabelaMetasComponent

  ngOnInit() {
    this.listarMetas()
  }

  listarMetas(){
    this.Metas$ = this.service.listarMetas()

    forkJoin([this.Metas$]).subscribe({
      next: ([dado1]) => {
        console.log(dado1)
        this.tipoMetas = dado1
        this.tabela?.atualizaRegistros()
        this.tabela?.listarContas()
      }
    })
  }

  dialogNovaMeta(){

    const dialogRef = this.dialog.open(CadMetasComponent, {
      width: '500px',
      height: '337px',
      data: {
        dado: null
      }
    })

    dialogRef.afterClosed().subscribe(val=>{
      if(val){
        this.post$ = this.service.cadastrarMeta(val).subscribe({
          next: (dado) => {
            console.log(dado),
            this.toast.success('Nova Meta cadastrada com sucesso')
            this.listarMetas()
          },
          error: (dado) => {
            this.toast.error(dado)
          }
        })
      }
    })
  }

  home(){
    this.router.navigate(['/'])
  }

  dialogCadastroMeta(acao:string){

    const tamanho = this.tipoMetas.length

    if(tamanho == 0){
      this.toast.info('Nenhuma Meta cadastrada. Realize o cadastro da Meta previamente')
    } else {

      const dialogRef = this.dialog.open(CadTransacaoComponent, {
        width: '700px',
        height: '507px',
        data: {
          acaoTitulo: 'Cadastro',
          metas: this.tipoMetas
        }
      })

      dialogRef.afterClosed().subscribe(val=>{
        if(val){
          console.log('recorrente:',val)

          const meta: cadTransacao = {
            userId: this.userId,
            categoryId: null,
            type: val.type,
            amount: val.amount,
            date: val.date,
            description: val.description,
            goalId: val.category,
            recurring: val.recurring
          }

          this.post$ = this.service.cadastrarTransacao(meta).subscribe(
            (dado) => {
              this.toast.success("Meta atualizada com sucesso!")
              this.listarMetas()
            }
          )
          //this.tabela?.adicionaRecorrente(val)
        }
      })

    }
  }

  atualizaLista(e:any){
    this.listarMetas()
  }

  mostrarMetas(){
    const tamanho = this.tipoMetas.length
    if(tamanho > 0){
      return false
    } else {
      return true
    }
  }




}
