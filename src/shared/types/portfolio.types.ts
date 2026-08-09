export interface PortfolioItem {
    id: string;
    title: string;
    description: string;
    location: string;
    externalUrl?: string | null;
    imageUrls: string[];
    isVerified?: boolean;
}

export interface PortfolioData {
    items: PortfolioItem[];
}