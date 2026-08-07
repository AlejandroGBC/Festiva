export interface PortfolioItem {
    id: string;
    title: string;
    description: string;
    location: string;
    externalUrl?: string;
    imageUrl?: string;
    isVerified?: boolean;
}

export interface PortfolioData {
    items: PortfolioItem[];
}