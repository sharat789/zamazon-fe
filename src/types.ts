export interface ResponseModel {
  message?: string;
  data?: any;
  success?: boolean;
}

export interface CreateProductInput {
  name: string;
  description: string;
  price: number;
  quantity: number;
  category: string;
  images: string[];
}
