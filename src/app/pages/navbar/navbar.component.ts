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

  // Mantenemos la señal reactiva
  public showMenuCta = toSignal(this.uiService.showCta$, { initialValue: false });
}