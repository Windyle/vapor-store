export interface ProductInput {
  name: string;
  description: string | null;
  price: number;
  imageUrl: string | null;
}

export interface Product extends ProductInput {
  id: number;
}
