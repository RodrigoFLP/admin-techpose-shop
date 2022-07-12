export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  portions: Portion[];
  tags: any[];
  image: string;
  categories: Category[];
  createdAt: Date;
  updatedAt: Date;
}

export interface Category {
  id: number;
  name: string;
  description: string;
  image: string;
}

export interface Portion {
  id: number;
  name: string;
  price: number;
  tagGroups: TagGroup[];
}

export interface TagGroup {
  id: number;
  name: string;
  max: number;
  min: number;
  hidden: boolean;
  tags: Tag[];
}

export interface Tag {
  id: number;
  name: string;
  value: string;
  price: number;
  ratio: number;
}
