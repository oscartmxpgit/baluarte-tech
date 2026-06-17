import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { UiService } from '../../services/ui.service';
import { LogoComponent } from '../logo/logo.component';
import { CtaButtonComponent } from '../cta-button/cta-button.component';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, LogoComponent, CtaButtonComponent],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  private uiService = inject(UiService);

  // Convertimos el BehaviorSubject directamente en una Signal reactiva y nativa.
  // El segundo parámetro establece el valor inicial de seguridad en false.
  public showMenuCta = toSignal(this.uiService.showCta$, { initialValue: false });
}