import type { NewCategory, NewProduct } from '../../../types';
import { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import { useAppDispatch } from '../../../contexts/AppContext';
import useApi from '../../../hooks/useApi';

export default function Admin(): JSX.Element {
    const [categories, setCategories] = useState<string[]>([]);
    const [newProduct, setNewProduct] = useState<NewProduct>({ name: '', price: '', parent: '' });
    const [newCategory, setNewCategory] = useState<NewCategory>({ name: '', parent: '' });
    const dispatch = useAppDispatch();
    const { getCategories, registerCategory, registerProduct } = useApi();

    function onNewProductChange(event: React.ChangeEvent<HTMLInputElement>) {
        const { name, value } = event.target;

        if (name === 'price' && !/^\d*$/.test(value)) {
            return;
        }

        setNewProduct(prevNewProduct => ({ ...prevNewProduct, [name]: value.trim() === '' ? '' : value }));
    }

    function onNewCategoryChange(event: React.ChangeEvent<HTMLInputElement>) {
        const { name, value } = event.target;

        setNewCategory(prevNewCategory => ({ ...prevNewCategory, [name]: value.trim() === '' ? '' : value }));
    }

    async function onProductFormSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();

        dispatch({ type: 'set_loading', payload: true });

        try {
            await registerProduct(newProduct);
            setNewProduct({ name: '', price: '', parent: '' });
        } catch (error) {
            console.log(error);
        }

        dispatch({ type: 'set_loading', payload: false });
    }

    async function onCategoryFormSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();

        dispatch({ type: 'set_loading', payload: true });

        try {
            await registerCategory(newCategory);
            setCategories(prevCategories => [...prevCategories, newCategory.name]);
            setNewCategory({ name: '', parent: '' });
        } catch (error) {
            console.log(error);
        }

        dispatch({ type: 'set_loading', payload: false });
    }

    useEffect(() => {
        let shouldIgnore = false;

        async function loadCategories() {
            dispatch({ type: 'set_loading', payload: true });

            try {
                const newCategories = (await getCategories()).map(x => x.name);

                if (!shouldIgnore) {
                    setCategories(newCategories);
                }
            } catch (error) {
                console.log(error);
            }

            if (!shouldIgnore) {
                dispatch({ type: 'set_loading', payload: false });
            }
        }

        loadCategories();

        return () => {
            shouldIgnore = true;
        };
    }, [dispatch, getCategories]);

    return (
        <Container>
            <Row>
                <Col md={3}>
                    <h1 className="mb-4">New Product</h1>
                    <form className="d-flex flex-column" onSubmit={onProductFormSubmit}>
                        <TextField
                            fullWidth
                            label="Name"
                            name="name"
                            required
                            value={newProduct.name}
                            className="mb-4"
                            onChange={onNewProductChange}
                        />
                        <TextField
                            fullWidth
                            label="Price"
                            name="price"
                            required
                            value={newProduct.price}
                            className="mb-4"
                            onChange={onNewProductChange}
                        />
                        <TextField
                            fullWidth
                            label="Category"
                            name="parent"
                            required
                            select
                            value={newProduct.parent}
                            className="mb-4"
                            onChange={onNewProductChange}>
                            {categories.map(x => (
                                <MenuItem key={x} value={x}>
                                    {x}
                                </MenuItem>
                            ))}
                        </TextField>
                        <Button variant="contained" type="submit" className="align-self-center">
                            Register
                        </Button>
                    </form>
                </Col>
                <Col md={3} className="ms-auto">
                    <h1 className="mb-4">New Category</h1>
                    <form className="d-flex flex-column" onSubmit={onCategoryFormSubmit}>
                        <TextField
                            fullWidth
                            label="Name"
                            name="name"
                            required
                            value={newCategory.name}
                            className="mb-4"
                            onChange={onNewCategoryChange}
                        />
                        <TextField
                            fullWidth
                            label="Parent Category"
                            name="parent"
                            select
                            value={newCategory.parent}
                            className="mb-4"
                            onChange={onNewCategoryChange}>
                            {['', ...categories].map(x => (
                                <MenuItem key={x} value={x}>
                                    {x === '' ? 'No Parent' : x}
                                </MenuItem>
                            ))}
                        </TextField>
                        <Button variant="contained" type="submit" className="align-self-center">
                            Register
                        </Button>
                    </form>
                </Col>
            </Row>
        </Container>
    );
}
