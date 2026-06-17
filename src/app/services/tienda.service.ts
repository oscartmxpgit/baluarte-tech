import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TiendaService {
  private http = inject(HttpClient);

  iniciarPasarelaPago(itemsCarrito: Array<{ id: string; cantidad: number }>): Observable<{ url: string }> {
    // Apuntamos a nuestra Pages Function interna de Cloudflare
    return this.http.post<{ url: string }>('/api/checkout', { items: itemsCarrito });
  }
}