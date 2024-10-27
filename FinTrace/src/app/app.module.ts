import { ErroInterceptorService } from './shared/service/erro-interceptor.service';
import { NgModule, LOCALE_ID } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { MaterialModule } from './angular-material/material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { LoginComponent } from './login/login.component';
import { registerLocaleData } from '@angular/common';

import localePt from '@angular/common/locales/pt';
import { SharedModule } from './shared/SharedModule';

registerLocaleData(localePt);


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MaterialModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    SharedModule,
    FormsModule,
    ToastrModule.forRoot({positionClass:'toast-top-center'})
  ],
  providers: [
    {provide: LOCALE_ID, useValue: 'pt-BR' },
    {provide: HTTP_INTERCEPTORS, useClass: ErroInterceptorService, multi:true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
