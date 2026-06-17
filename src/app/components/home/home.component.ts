import { Component, Output, EventEmitter } from '@angular/core';
import { HeroComponent } from '../hero/hero.component';
import { PortfolioComponent } from '../portfolio/portfolio.component';
import { ProblemComponent } from '../problem/problem.component';
import { ReviewsComponent } from '../reviews/reviews.component';
import { ServicesComponent } from '../services/services.component';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    HeroComponent,
    ProblemComponent,
    ServicesComponent,
    PortfolioComponent,
    ReviewsComponent
  ],
  templateUrl: './home.component.html'
})
export class HomeComponent {
  @Output() contactRequested = new EventEmitter<void>();
  @Output() visibilityChanged = new EventEmitter<boolean>();

  handleAction() {
    this.contactRequested.emit();
  }

  handleVisibility(isVisible: boolean) {
    this.visibilityChanged.emit(isVisible);
  }
}