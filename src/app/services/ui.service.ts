import { Injectable } from '@angular/core';
import { Subject, BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class UiService {
  private openModalSource = new Subject<void>();
  public openModal$ = this.openModalSource.asObservable();

  private showCtaSource = new BehaviorSubject<boolean>(false);
  public showCta$ = this.showCtaSource.asObservable();

  public abrirContacto(): void { 
    this.openModalSource.next(); 
  }

  public actualizarCta(mostrar: boolean): void { 
    this.showCtaSource.next(mostrar); 
  } 
}