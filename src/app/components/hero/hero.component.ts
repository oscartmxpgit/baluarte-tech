// hero.component.ts
import { Component, AfterViewInit, ElementRef, ViewChild, inject, ChangeDetectorRef, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { UiService } from '../../services/ui.service';
import { CtaButtonComponent } from '../cta-button/cta-button.component';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CtaButtonComponent],
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.css']
})
export class HeroComponent implements AfterViewInit {
  private uiService = inject(UiService);
  private cdr = inject(ChangeDetectorRef);
  private platformId = inject(PLATFORM_ID);
  
  // AÑADIMOS 'read: ElementRef' para obtener el elemento DOM nativo
  @ViewChild('ctaBtn', { read: ElementRef, static: false }) ctaBtn!: ElementRef;

  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      // Usamos requestAnimationFrame en lugar de setTimeout para asegurar que el DOM esté renderizado
      requestAnimationFrame(() => {
        if (this.ctaBtn?.nativeElement) {
          const observer = new IntersectionObserver(([entry]) => {
            // entry.isIntersecting es true si el botón es visible
            // Si NO es visible (!entry.isIntersecting), mostramos el botón en el navbar
            this.uiService.actualizarCta(!entry.isIntersecting);
            this.cdr.detectChanges(); 
          }, { threshold: 0 });
          
          observer.observe(this.ctaBtn.nativeElement);
        }
      });
    }
  }
}