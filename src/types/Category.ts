import type { Product } from '.';

export interface Category {
    name: string;
    type: 'CATEGORY';
    children: (Category | Product)[];
    parent: string;
}
