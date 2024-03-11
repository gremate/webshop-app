import type { Product, Quantity } from '../../../types';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

interface ShoppingCartProps {
    shoppingCartRef: React.RefObject<HTMLDivElement>;
    addedProducts: Quantity;
    products: Product[];
    onRemoveButtonClick: (product: Product) => void;
}

export default function ShoppingCart({
    shoppingCartRef,
    addedProducts,
    products,
    onRemoveButtonClick
}: ShoppingCartProps): JSX.Element {
    return (
        <Drawer
            ref={shoppingCartRef}
            anchor="right"
            variant="permanent"
            sx={{
                '& .MuiDrawer-paper': {
                    padding: '12px',
                    height: 'auto',
                    maxHeight: 450,
                    width: 275,
                    top: 120
                }
            }}>
            <h3 className="text-center">Shopping Cart</h3>
            {Object.entries(addedProducts).map(([key, value]) => {
                const product = products.find(x => x.id.toString() === key)!;

                return (
                    <Row key={key} className="flex-nowrap align-items-center my-1 fs-6">
                        <Col xs="auto">
                            <IconButton
                                color="warning"
                                size="small"
                                aria-label="remove"
                                onClick={() => onRemoveButtonClick(product)}>
                                <FontAwesomeIcon icon={faTrash} />
                            </IconButton>
                        </Col>
                        <Col xs="auto" className="flex-shrink-1 text-break text-capitalize">
                            {product.name}
                        </Col>
                        <Col xs="auto" className="ms-auto">
                            {value} x {product.price}
                        </Col>
                    </Row>
                );
            })}
            {!Object.keys(addedProducts).length && <p className="text-center mb-0">No products have been added yet.</p>}
            <Row className="mt-2">
                <Col xs="auto">Total Cost</Col>
                <Col xs="auto" className="ms-auto">
                    {products.reduce(
                        (result, product) =>
                            result + (product.id in addedProducts ? addedProducts[product.id] * product.price : 0),
                        0
                    )}
                </Col>
            </Row>
        </Drawer>
    );
}
