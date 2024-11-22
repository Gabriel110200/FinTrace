import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { MaterialModule } from "../angular-material/material.module";
import { DialogExcluirComponent } from "./component/dialogExcluir/dialogExcluir.component";
import { DialogGenericoComponent } from "./dialogGenerico/dialogGenerico.component";



@NgModule({
  declarations: [
    DialogExcluirComponent,
    DialogGenericoComponent
  ],
  imports: [
    CommonModule,
    MaterialModule
  ],
  exports: [
    DialogExcluirComponent,
    DialogGenericoComponent
  ]
})
export class SharedModule {
}