import type { Category, Product } from '../types';

export function isCategory(data: Category | Product): data is Category {
    return data.type === 'CATEGORY';
}
