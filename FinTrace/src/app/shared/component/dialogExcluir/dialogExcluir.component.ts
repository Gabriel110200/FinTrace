import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-dialogExcluir',
  templateUrl: './dialogExcluir.component.html',
  styleUrls: ['./dialogExcluir.component.css']
})
export class DialogExcluirComponent {

  texto = this?.data?.texto ?? null

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { }


}
