export interface PortfolioImageItem {
  id_imagen?: string;
  imagen_url: string;
}

export interface PortfolioWorkItem {
  id_portafolio?: string;
  titulo: string;
  descripcion?: string;
  imagenes: PortfolioImageItem[];
}

export interface AvailabilityDay {
  dayRange: string;
  hours: string;
  available: boolean;
}

export interface ProviderProfile {
  id_proveedor?: string;
  businessName: string;
  description: string;
  city: string;
  phone: string;
  completionPercentage: number;
  specialist: string;
  foto_perfil_url?: string;
  initialSpecialties: string[];
  portfolioImages: string[];
  portfolioWorks?: PortfolioWorkItem[];
  availability: AvailabilityDay[];
}

export interface UpdateProviderProfilePayload {
  businessName: string;
  description: string;
  city: string;
  phone: string;
  foto_perfil_url?: string;
  specialties: string[];
  availability: AvailabilityDay[];
}