export interface Review {
  id: string;
  productId: string;
  userId: string;
  author: string;
  rating: number;
  comment: string;
  verified: boolean;
  createdAt: string;
}
