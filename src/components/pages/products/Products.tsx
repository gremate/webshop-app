import type { Category as CategoryType, Product as ProductType, ProductSortBy, Quantity } from '../../../types';
import { useEffect, useMemo, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Button from '@mui/material/Button';
import { useAppDispatch } from '../../../contexts/AppContext';
import useApi from '../../../hooks/useApi';
import { isCategory } from '../../../utilities';
import Category from './Category';
import ShoppingCart from './ShoppingCart';
import Product from './Product';

export default function Products(): JSX.Element {
    const [categorizedProducts, setCategorizedProducts] = useState<CategoryType[]>([]);
    const [addedProducts, setAddedProducts] = useState<Quantity>({});
    const [filter, setFilter] = useState('');
    const [sortBy, setSortBy] = useState<ProductSortBy>('name');
    const [shouldShowProductView, setShouldShowProductView] = useState(false);
    const products = useMemo(() => {
        const products: ProductType[] = [];

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
    const filteredSortedProducts = shouldShowProductView
        ? products.filter(x => x.name.toLowerCase().includes(filter.toLowerCase())).sort(sort)
        : [];

    function addProduct(product: ProductType) {
        setAddedProducts(prevAddedProducts => ({
            ...prevAddedProducts,
            [product.id]: product.id in prevAddedProducts ? prevAddedProducts[product.id] + 1 : 1
        }));
    }

    function removeProduct(product: ProductType) {
        setAddedProducts(prevAddedProducts => {
            const newAddedProducts = { ...prevAddedProducts, [product.id]: prevAddedProducts[product.id] - 1 };

            if (!newAddedProducts[product.id]) {
                delete newAddedProducts[product.id];
            }

            return newAddedProducts;
        });
    }

    function sort(a: CategoryType | ProductType, b: CategoryType | ProductType) {
        const isACategory = isCategory(a);
        const isBCategory = isCategory(b);

        if (isACategory && isBCategory) {
            return 0;
        }

        if (isACategory && !isBCategory) {
            return -1;
        }

        if (!isACategory && isBCategory) {
            return 1;
        }

        if (!isACategory && !isBCategory) {
            return sortBy === 'name' ? a.name.localeCompare(b.name) : a.price - b.price;
        }

        return 0;
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
                        <Row className="align-items-center mb-4">
                            <Col xs="auto">
                                <h1 className="mb-0">Products</h1>
                            </Col>
                            <Col xs="auto" className="d-flex align-items-center ms-auto">
                                {shouldShowProductView && (
                                    <Button
                                        variant="contained"
                                        className="me-4"
                                        onClick={() => setShouldShowProductView(false)}>
                                        Back
                                    </Button>
                                )}
                                <TextField
                                    label="Filter"
                                    size="small"
                                    value={filter}
                                    className="me-4"
                                    onChange={event => {
                                        setFilter(event.target.value);
                                        setShouldShowProductView(true);
                                    }}
                                />
                                <FormControl size="small">
                                    <InputLabel id="sort-by-select-label">Sort By</InputLabel>
                                    <Select
                                        label="Sort By"
                                        labelId="sort-by-select-label"
                                        MenuProps={{ disableScrollLock: true }}
                                        value={sortBy}
                                        onChange={event => setSortBy(event.target.value as ProductSortBy)}>
                                        <MenuItem value="name">Name</MenuItem>
                                        <MenuItem value="price">Price</MenuItem>
                                    </Select>
                                </FormControl>
                            </Col>
                        </Row>
                        {shouldShowProductView ? (
                            filteredSortedProducts.length ? (
                                <List>
                                    {filteredSortedProducts.map(x => (
                                        <ListItem key={x.id}>
                                            <Product product={x} onAddButtonClick={addProduct} forProductView />
                                        </ListItem>
                                    ))}
                                </List>
                            ) : (
                                <p className="white-space-pre-wrap">No results found for "{filter}".</p>
                            )
                        ) : (
                            categorizedProducts.map(x => (
                                <Category key={x.name} category={x} addProduct={addProduct} sort={sort} />
                            ))
                        )}
                    </Col>
                </Row>
            </Container>
            <ShoppingCart addedProducts={addedProducts} products={products} onRemoveButtonClick={removeProduct} />
        </>
    );
}
