import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-dialogExcluir',
  templateUrl: './dialogExcluir.component.html',
  styleUrls: ['./dialogExcluir.component.css']
})
export class DialogExcluirComponent implements OnInit {

  texto = this?.data?.texto ?? null

  constructor(
    private dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { }

  ngOnInit() {
  }

}
