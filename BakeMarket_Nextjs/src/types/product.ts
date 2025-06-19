import { Bakery, Category } from "./bakery";

export interface Product {
  id: string;
  name: string;
  price: number;
  thumbnailUrl: string;
  category?: Category;
  description?: string;
  averageRating: number;
  totalReviews: number;
  stockQuantity?: number;
  favorite?: boolean;
  bakery?: Bakery;
  createdAt: Date;
  isActive: boolean;
  images: Image[];
}

export interface Image {
  imageUrl: string;
}
