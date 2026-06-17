import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      let errorMessage = 'Ha ocurrido un error inesperado';

      if (error.status === 404) {
        errorMessage = 'El recurso solicitado no se ha encontrado.';
      } else if (error.status >= 500) {
        errorMessage = 'Error en el servidor. Por favor, inténtalo más tarde.';
      }

      console.error('Error capturado por el interceptor:', errorMessage);
      // Aquí podrías disparar un servicio de notificaciones (Toasts)
      
      return throwError(() => new Error(errorMessage));
    })
  );
};