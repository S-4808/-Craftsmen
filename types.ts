
export enum UserRole {
  CUSTOMER = 'CUSTOMER',
  CRAFTSMAN = 'CRAFTSMAN'
}

export enum VerificationStatus {
  UNVERIFIED = 'UNVERIFIED',
  PENDING = 'PENDING',
  VERIFIED = 'VERIFIED'
}

export interface Rating {
  workQuality: number;
  punctuality: number;
  professionalism: number;
  priceValue: number;
  cleanliness: number;
  overall: number;
  comment?: string;
  customerName: string;
  date: string;
}

export interface Craftsman {
  id: string;
  name: string;
  avatar: string;
  specialty: string;
  subSpecialties: string[];
  city: string;
  neighborhood: string;
  verified: boolean;
  rating: number;
  reviewCount: number;
  hourlyRate: number;
  bio: string;
  portfolio: string[];
  ratings: Rating[];
}

export interface Category {
  id: string;
  nameAr: string;
  nameEn: string;
  icon: string;
  color: string;
}
