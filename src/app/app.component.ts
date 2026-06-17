import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { UiService } from './services/ui.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent, FooterComponent],
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
  isModalOpen = false;
  constructor(private uiService: UiService) { }

  ngOnInit() {
    this.uiService.openModal$.subscribe(() => {
      this.isModalOpen = true;
      document.body.style.overflow = 'hidden';
    });
  }

  cerrarContacto() {
    this.isModalOpen = false;
    document.body.style.overflow = '';
  }
}