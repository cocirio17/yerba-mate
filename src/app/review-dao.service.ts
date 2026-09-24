import { Injectable } from '@angular/core';
import { Review } from './review.model';

@Injectable({ providedIn: 'root' })
export class ReviewDAO {
  private readonly key = 'yerbashop.reviews';

  findByProduct(productId: string): Review[] {
    if (typeof localStorage === 'undefined') return [];
    try {
      const reviews = JSON.parse(localStorage.getItem(this.key) || '[]') as Review[];
      return reviews.filter(review => review.productId === productId);
    } catch {
      return [];
    }
  }

  save(review: Review): Review {
    const reviews = this.readAll();
    reviews.push({ ...review });
    if (typeof localStorage !== 'undefined') localStorage.setItem(this.key, JSON.stringify(reviews));
    return review;
  }

  private readAll(): Review[] {
    if (typeof localStorage === 'undefined') return [];
    try {
      return JSON.parse(localStorage.getItem(this.key) || '[]') as Review[];
    } catch {
      return [];
    }
  }
}
