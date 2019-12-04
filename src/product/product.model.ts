export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  tags: Tags;
}

export enum Tags {
  FEATURED = 'FEATURED',
}
