export interface ProviderProfile {
  businessName: string;
  description: string;
  city: string;
  phone: string;
  completionPercentage: number;
  specialist: string;
  specialties: string[];
  portfolioImages: string[];
  availability: {
    dayRange: string;
    hours: string;
    available: boolean;
  }[];
}