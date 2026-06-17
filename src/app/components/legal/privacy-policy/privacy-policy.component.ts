import { Component, inject, OnInit } from '@angular/core';
import { ContentService } from '../../../services/content.service';

@Component({
  selector: 'app-privacy-policy',
  imports: [],
  templateUrl: './privacy-policy.component.html',
  styleUrls: ['../legal.css']
})
export class PrivacyPolicyComponent implements OnInit {
  private contentService = inject(ContentService);
  legalData: any;

  ngOnInit(): void {
    this.contentService.getContent().subscribe({
      next: (res) => {
        this.legalData = res?.legal; // Accedemos directamente a la sección legal
      },
      error: (err) => console.error('Error cargando datos legales:', err)
    });
  }
}