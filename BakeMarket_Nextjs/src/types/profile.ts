export interface UserProfile {
  profileId: string;
  userId: number;
  firstName: string;
  lastName: string;
  avatar?: string;
  phoneNumber?: string;
  linkFacebook?: string;
  linkYoutube?: string;
  linkLinkedIn?: string;
}

export interface OwnerProfile {
  id: string;
  firstName: string;
  lastName: string;
  fullName: string;
  address: string;
  profileImageUrl: string;
  description: string;
}
