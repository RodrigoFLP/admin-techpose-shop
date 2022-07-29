export interface Product {
  id: number;
  name: string;
  description: string;
  price: string;
  portions: Portion[];
  portionsTagGroups: TagGroup[];
  tags: any[];
  image: string;
  categories: Category[];
  createdAt: string;
  updatedAt: string;
}

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
}

export interface TagGroup {
  id: number | string;
  name: string;
  portions: number[];
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
