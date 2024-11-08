import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './homePage/homePage.component';

import { LoginComponent } from './login/login.component';
import { AuthGuard } from './shared/guard/authguard.guard';


const routes: Routes = [
  {path:'',component: HomePageComponent, canActivate: [AuthGuard]},
  {path: 'login',component: LoginComponent},
  {path: 'transacao', loadChildren:()=> import('./gerenciamentoTransacoes/gerenciamentoTransacoes.module').then(m=> m.GerenciamentoTransacoesModule), canActivate: [AuthGuard]},
  {path: 'categoria', loadChildren:()=> import('./gerenciamentoCategorias/gerenciamentoCategorias.module').then(m=> m.GerenciamentoCategoriasModule), canActivate: [AuthGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
