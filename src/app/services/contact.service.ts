import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ContactLead } from '../models/contact.model';


@Injectable({
  providedIn: 'root'
})
export class ContactService {
  private http = inject(HttpClient);
  private readonly apiUrl = '/api/contacto';

  sendLead(data: ContactLead): Observable<any> {
    return this.http.post(this.apiUrl, data);
  }
}