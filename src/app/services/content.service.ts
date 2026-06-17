import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, shareReplay, tap } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ContentService {
  private http = inject(HttpClient);
  private contentCache$: Observable<any> | null = null;

  getContent(forceRefresh: boolean = false): Observable<any> {
    if (forceRefresh || !this.contentCache$) {
      const url = `${environment.contentGistUrl}?v=${Date.now()}`;
      
      this.contentCache$ = this.http.get<any>(url).pipe(
        shareReplay(1),
        // Si hay un error, reseteamos el caché para que el próximo intento sea fresco
        tap({
          error: () => { this.contentCache$ = null; }
        })
      );
    }
    return this.contentCache$;
  }
}