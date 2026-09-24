import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { ReviewDAO } from '../review-dao.service';
import { Review } from '../review.model';

@Component({ selector: 'app-reviews', standalone: false, templateUrl: './reviews.component.html', styleUrls: ['./reviews.component.scss'] })
export class ReviewsComponent implements OnInit {
  @Input() productId = '';
  reviews: Review[] = [];
  rating = 0;
  comment = '';
  submitted = false;

  constructor(private reviewDAO: ReviewDAO, public auth: AuthService) {}

  ngOnInit(): void { this.loadReviews(); }

  loadReviews(): void { this.reviews = this.reviewDAO.findByProduct(this.productId); }

  setRating(value: number): void { this.rating = value; }

  submit(): void {
    if (!this.auth.currentUser || !this.rating || !this.comment.trim()) return;
    this.reviewDAO.save({ id: crypto.randomUUID(), productId: this.productId, userId: this.auth.currentUser.id, author: this.auth.currentUser.nombre, rating: this.rating, comment: this.comment.trim(), verified: true, createdAt: new Date().toISOString() });
    this.comment = '';
    this.rating = 0;
    this.submitted = true;
    this.loadReviews();
  }

  get average(): number { return this.reviews.length ? this.reviews.reduce((sum, review) => sum + review.rating, 0) / this.reviews.length : 0; }
}
