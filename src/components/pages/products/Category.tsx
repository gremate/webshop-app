import type { Category, Product as ProductType } from '../../../types';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown } from '@fortawesome/free-solid-svg-icons';
import { isCategory } from '../../../utilities';
import Product from './Product';

interface CategoryProps {
    category: Category;
    addProduct: (product: ProductType) => void;
}

export default function Category({ category, addProduct }: CategoryProps): JSX.Element {
    return (
        <Accordion disableGutters>
            <AccordionSummary expandIcon={<FontAwesomeIcon icon={faAngleDown} />}>
                <div>
                    {category.parent && <div className="fs-6">/{category.parent}/</div>}
                    <div className="text-capitalize fs-4">{category.name}</div>
                </div>
            </AccordionSummary>
            <AccordionDetails>
                {category.children.map(x =>
                    isCategory(x) ? (
                        <Category key={x.name} category={x} addProduct={addProduct} />
                    ) : (
                        <Product key={x.id} product={x} onAddButtonClick={addProduct} />
                    )
                )}
            </AccordionDetails>
        </Accordion>
    );
}
