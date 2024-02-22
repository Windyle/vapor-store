type BaseProduct = {
  name: string;
  description: string;
  price: number;
  imageUrl: string | null;
};

export type Product = BaseProduct & {
  id: number;
};

export type ProductInput = BaseProduct;
