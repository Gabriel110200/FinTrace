import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ErroInterceptorService implements HttpInterceptor{

  constructor(
    private toast : ToastrService,
  ) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(catchError((error)=>{

      switch (true) {
        case (error.message.includes("Unknown")) : this.toast.error("ops, Algo deu errado");
        break

       case error.message.includes("403") :
          this.toast.error("Acesso não Autorizado");
        break


        case error.message.includes("401") :
          this.toast.error("Acesso não Autorizado");
        break

        case error.message.includes("400") : console.log(error.error.data), this.toast.error(error.error.data);
        ;
        break


       default : this.toast.error("Algo deu errado");

      }

      return throwError(() => new Error(error.message))
    }))

}
  }
