export interface Product {
    id: number;
    name: string;
    price: number;
    type: 'PRODUCT';
    parent: string;
}

export type ProductSortBy = 'name' | 'price';
