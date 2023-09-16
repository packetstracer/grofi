import Specification from './Specification';
import Accordion from 'ui-component/extended/Accordion';

const descriptionData = [
    {
        id: 'basic1',
        defaultExpand: true,
        title: 'Specification',
        content: <Specification />
    }
];

const ProductDescription = () => <Accordion data={descriptionData} />;

export default ProductDescription;
