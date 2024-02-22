type BaseProduct = {
  name: string;
  description: string | null;
  price: number;
  imageUrl: string | null;
};

export type Product = BaseProduct & {
  id: number;
};

export type ProductInput = BaseProduct;
