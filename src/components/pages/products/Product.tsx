import type { Product } from '../../../types';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from '@mui/material/Button';

interface ProductProps {
    product: Product;
    onAddButtonClick: (product: Product) => void;
    forProductView?: boolean;
}

export default function Product({ product, onAddButtonClick, forProductView }: ProductProps): JSX.Element {
    return (
        <Row className={`align-items-center my-3 ${forProductView ? 'w-100' : ''}`}>
            <Col xs="auto">
                <Button variant="contained" onClick={() => onAddButtonClick(product)}>
                    Add
                </Button>
            </Col>
            <Col xs={2}>
                {forProductView && <div className="fs-6">/{product.parent}/</div>}
                <div className="text-capitalize fs-5">{product.name}</div>
            </Col>
            <Col xs={2}>{product.price}</Col>
        </Row>
    );
}
