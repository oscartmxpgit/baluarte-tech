import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContentService } from '../../services/content.service';

@Component({
  selector: 'app-reviews',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './reviews.component.html',
  styleUrl: './reviews.component.css'
})
export class ReviewsComponent implements OnInit {
  private contentService = inject(ContentService);
  data: any;

  ngOnInit(): void {
    this.contentService.getContent().subscribe(res => {
      this.data = res?.reviews;
    });
  }
}