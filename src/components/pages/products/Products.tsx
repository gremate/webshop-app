import type { Category as CategoryType, Product, Quantity } from '../../../types';
import { useEffect, useMemo, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useAppDispatch } from '../../../contexts/AppContext';
import useApi from '../../../hooks/useApi';
import { isCategory } from '../../../utilities';
import Category from './Category';
import ShoppingCart from './ShoppingCart';

export default function Products(): JSX.Element {
    const [categorizedProducts, setCategorizedProducts] = useState<CategoryType[]>([]);
    const [addedProducts, setAddedProducts] = useState<Quantity>({});
    const products = useMemo(() => {
        const products: Product[] = [];

        function addProductsFromCategory(category: CategoryType) {
            category.children.forEach(x => {
                if (isCategory(x)) {
                    addProductsFromCategory(x);
                } else {
                    products.push(x);
                }
            });
        }

        categorizedProducts.forEach(x => addProductsFromCategory(x));

        return products;
    }, [categorizedProducts]);
    const dispatch = useAppDispatch();
    const { getProducts } = useApi();

    function addProduct(product: Product) {
        setAddedProducts(prevAddedProducts => ({
            ...prevAddedProducts,
            [product.id]: product.id in prevAddedProducts ? prevAddedProducts[product.id] + 1 : 1
        }));
    }

    function removeProduct(product: Product) {
        setAddedProducts(prevAddedProducts => {
            const newAddedProducts = { ...prevAddedProducts, [product.id]: prevAddedProducts[product.id] - 1 };

            if (!newAddedProducts[product.id]) {
                delete newAddedProducts[product.id];
            }

            return newAddedProducts;
        });
    }

    useEffect(() => {
        let shouldIgnore = false;

        async function loadProducts() {
            dispatch({ type: 'set_loading', payload: true });

            try {
                const newCategorizedProducts = await getProducts();

                if (!shouldIgnore) {
                    setCategorizedProducts(newCategorizedProducts);
                }
            } catch (error) {
                console.log(error);
            }

            if (!shouldIgnore) {
                dispatch({ type: 'set_loading', payload: false });
            }
        }

        loadProducts();

        return () => {
            shouldIgnore = true;
        };
    }, [dispatch, getProducts]);

    return (
        <>
            <Container>
                <Row>
                    <Col>
                        <h1 className="mb-4">Products</h1>
                        {categorizedProducts.map(x => (
                            <Category key={x.name} category={x} addProduct={addProduct} />
                        ))}
                    </Col>
                </Row>
            </Container>
            <ShoppingCart addedProducts={addedProducts} products={products} onRemoveButtonClick={removeProduct} />
        </>
    );
}
