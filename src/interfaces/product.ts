export interface Product {
  id: number;
  name: string;
  description: string;
  price: string | number;
  portions: Portion[];
  portionsTagGroups: TagGroup[];
  tags: any[];
  image: string | null;
  categories: Category[];
  createdAt: string;
  updatedAt: string;
}

export type ProductMutation = Omit<
  Product & { price: number; categoriesId: number[] },
  "createdAt" | "updatedAt" | "categories"
>;

export interface Category {
  id: number;
  name: string;
  description: string;
  image: string;
}

export interface Portion {
  id: number | string;
  name: string;
  price: number;
  tagGroups: undefined | null | any[];
}

export interface TagGroup {
  id: number | string;
  name: string;
  portions: string[];
  max: number;
  min: number;
  hidden: boolean;
  tags: Tag[];
}

export interface Tag {
  id: number | string;
  name: string;
  value: string;
  price: number;
  ratio: number;
}
