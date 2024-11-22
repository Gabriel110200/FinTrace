import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TransacoesService } from 'src/app/gerenciamentoTransacoes/service/transacoes.service';
import { SharedService } from '../service/shared.service';

@Component({
  selector: 'app-dialogGenerico',
  templateUrl: './dialogGenerico.component.html',
  styleUrls: ['./dialogGenerico.component.css']
})
export class DialogGenericoComponent implements OnInit {

  limites = this?.data?.limites ?? null
  usuario:string = this.sharedService.obterUsuario()

  constructor(
    private sharedService: SharedService,
    private dialog: MatDialog,
    protected transacoes: TransacoesService,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { }

  ngOnInit() {
  }

}
