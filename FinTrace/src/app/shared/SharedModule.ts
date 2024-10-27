import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { MaterialModule } from "../angular-material/material.module";
import { DialogExcluirComponent } from "./component/dialogExcluir/dialogExcluir.component";



@NgModule({
  declarations: [
    DialogExcluirComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule
  ],
  exports: [
    DialogExcluirComponent,
  ]
})
export class SharedModule {
}