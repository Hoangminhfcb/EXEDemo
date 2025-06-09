import { OwnerProfile } from "./profile";

export interface Category {
  id: string;
  name: string;
  description?: string;
}

export interface Bakery {
  id: string;
  name: string;
  description?: string;
  address: string;
  phoneNumber: string;
  email: string;
  coverImageUrl: string;
  createdAt: Date;
  logoImageUrl: string;
  isActive: boolean;
  isVerified: boolean;
  businessHours: string;
  averageRating: number;
  totalReviews: number;
  images: string[];
  owner: OwnerProfile;
}
