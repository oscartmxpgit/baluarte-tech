import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, shareReplay } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContentService {
  private http = inject(HttpClient);
  // Almacenamos el observable para no repetir la petición HTTP
  private contentCache$: Observable<any> | null = null;

  getContent(): Observable<any> {
    // Si ya existe el caché, lo devolvemos directamente
    if (!this.contentCache$) {
      // Apuntamos directamente a la carpeta local de assets
      const url = '/assets/baluarte-content.json';
      
      this.contentCache$ = this.http.get<any>(url).pipe(
        // shareReplay(1) mantiene el valor y lo re-emite a nuevos suscriptores
        shareReplay(1)
      );
    }
    return this.contentCache$;
  }
}