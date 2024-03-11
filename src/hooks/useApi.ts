import type { Category, NewCategory, NewProduct } from '../types';
import { useCallback } from 'react';
import axios from 'axios';
import { isCategory } from '../utilities';

const apiURL: string = import.meta.env.VITE_API_URL;

export default function useApi() {
    const getCategories = useCallback(async () => {
        return (await axios.get(`${apiURL}/categories`)).data.data as { name: string; parent: string }[];
    }, []);

    const getProducts = useCallback(async (): Promise<Category[]> => {
        const [categories, axiosResponse] = await Promise.all([getCategories(), axios.get(`${apiURL}/products`)]);

        function setProperties(category: Category) {
            category.parent = categories.find(x => x.name === category.name)!.parent;

            category.children.forEach(x => {
                if (isCategory(x)) {
                    setProperties(x);
                } else {
                    x.parent = `${category.parent ? `${category.parent}/` : ''}${category.name}`;
                }
            });
        }

        axiosResponse.data.data.forEach(setProperties);

        return axiosResponse.data.data;
    }, [getCategories]);

    const registerProduct = useCallback(async (newProduct: NewProduct) => {
        await axios.post(`${apiURL}/product/add`, {
            name: newProduct.name.trim(),
            price: Number(newProduct.price),
            parent: newProduct.parent
        });
    }, []);

    const registerCategory = useCallback(async (newCategory: NewCategory) => {
        await axios.post(`${apiURL}/category/add`, { name: newCategory.name.trim(), parent: newCategory.parent });
    }, []);

    return { getCategories, getProducts, registerCategory, registerProduct };
}
