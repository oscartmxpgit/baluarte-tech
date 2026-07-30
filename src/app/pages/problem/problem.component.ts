import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContentService } from '../../services/content.service';

@Component({
  selector: 'app-problem',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './problem.component.html',
  styleUrl: './problem.component.css'
})
export class ProblemComponent implements OnInit {
  private contentService = inject(ContentService);
  data: any;

  ngOnInit(): void {
    this.contentService.getContent().subscribe(res => {
      this.data = res?.problem;
    });
  }
}