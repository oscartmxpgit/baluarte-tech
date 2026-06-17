import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContentService } from '../../services/content.service';

@Component({
  selector: 'app-services',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './services.component.html',
  styleUrl: './services.component.css'
})
export class ServicesComponent implements OnInit {
  private contentService = inject(ContentService);
  // Aquí 'servicesData' recibirá solo la parte del JSON que nos interesa
  servicesData: any;

  ngOnInit(): void {
    this.contentService.getContent().subscribe(res => {
      // Accedemos a la propiedad 'services' del Gist
      this.servicesData = res?.services;
    });
  }
}