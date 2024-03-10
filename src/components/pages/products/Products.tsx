import type { Category as CategoryType, Product } from '../../../types';
import { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useAppDispatch } from '../../../contexts/AppContext';
import useApi from '../../../hooks/useApi';
import Category from './Category';

export default function Products(): JSX.Element {
    const [categorizedProducts, setCategorizedProducts] = useState<CategoryType[]>([]);
    const [addedProducts, setAddedProducts] = useState<{ [property: Product['id']]: number }>({});
    const dispatch = useAppDispatch();
    const { getProducts } = useApi();

    function addProduct(product: Product) {
        setAddedProducts(prevAddedProducts => ({
            ...prevAddedProducts,
            [product.id]: product.id in prevAddedProducts ? prevAddedProducts[product.id] + 1 : 1
        }));
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
        </>
    );
}
