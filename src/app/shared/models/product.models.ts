export interface Product {
  id?: number; // 
  productName: string;
  description: string;
  price: number;
  category: string;
  launchDate: string; 
  inStock: boolean;
  image: string;
  features: string[];
}