import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { GerenciamentoMetasComponent } from "./gerenciamentoMetas.component";

const routes: Routes = [
  { path: '', component:GerenciamentoMetasComponent },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GerenciamentoMetasRoutingModule { }
