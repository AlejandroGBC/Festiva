export interface PortfolioItem {
    id: string;
    title: string;
    description: string;
    location: string;
    externalUrl?: string | null;
    imageUrl?: string | null;
    isVerified?: boolean;
}

export interface PortfolioData {
    items: PortfolioItem[];
}