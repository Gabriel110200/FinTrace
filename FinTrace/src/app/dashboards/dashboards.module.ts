import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardsComponent } from './dashboards.component';
import { DashboardRoutingModule } from './dashboards-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MaterialModule } from '../angular-material/material.module';
import { DashboardDespesasComponent } from './dashboardDespesas/dashboardDespesas.component';
import { DashboardFluxoCaixaComponent } from './dashboardFluxoCaixa/dashboardFluxoCaixa.component';
import { DashboardResumoComponent } from './dashboardResumo/dashboardResumo.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ChartModule } from 'primeng/chart';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
    DashboardRoutingModule,
    ChartModule,
  ],
  declarations: [
    DashboardsComponent,
    DashboardDespesasComponent,
    DashboardFluxoCaixaComponent,
    DashboardResumoComponent

  ]
})
export class DashboardsModule { }
