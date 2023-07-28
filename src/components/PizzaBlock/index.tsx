import React from "react";
import classNames from "classnames";

import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import { addItem, selectCartItemById } from '../../redux/slices/cartSlice';

const availableTypes = ['thin', 'traditional'];
const availableSizes = [26, 30, 40];

type PizzaBlockProps = {
    id: number; 
    name: string;
    price: number;
    imageUrl: string;
    sizes: number[];
    types: number[];
};

const PizzaBlock: React.FC<PizzaBlockProps> = ({ id, name, price, imageUrl, sizes, types }) => {
    const dispatch = useDispatch();
    const cartItem = useSelector(selectCartItemById(id));
    const [activeType, setActiveType] = React.useState(types[0]);
    const [activeSize, setActiveSize] = React.useState(sizes[0]);

    const addedCount = cartItem ? cartItem.count : 0; 

    const onSelectType = (index: number) => {
        setActiveType(index);
    }

    const onSelectSize = (size: number) => {
        setActiveSize(size);
    }

    const onAddToCart = () => {
        const item = {
            id,
            name,
            price,
            imageUrl,
            type: availableTypes[activeType],
            size: activeSize,
            count: addedCount,
        };

        dispatch(addItem(item));
    }

    return(
        <div className="pizza-block">
            <Link to={`/pizza/${id}`}>
                <img
                    className="pizza-block__image"
                    src={imageUrl}
                    alt="Pizza"
                />
            </Link>    
            <Link to={`/pizza/${id}`}>
                <h4 className="pizza-block__title">{name}</h4>
            </Link>
            <div className="pizza-block__selector">
                <ul>
                    {availableTypes.map((item, index) => (
                        <li 
                            key={`pizzaType_${index}`}
                            className={classNames({
                                active: activeType === index,
                                disabled: !types.includes(index)
                            })} 
                            onClick={() => onSelectType(index)} >
                            {item}
                        </li>
                    ))}
                </ul>
                <ul>
                    {availableSizes.map((item, index) => (
                        <li 
                            key={`pizzaSize_${index}`}
                            className={classNames({
                                active: activeSize === item,
                                disabled: !sizes.includes(item)
                            })} 
                            onClick={() => onSelectSize(item)} >
                            {item} cm.
                        </li>
                    ))}
                </ul>
            </div>
            <div className="pizza-block__bottom">
                <div className="pizza-block__price">${price}</div>
                <button className="button button--outline button--add" onClick={onAddToCart}>
                    <svg
                        width="12"
                        height="12"
                        viewBox="0 0 12 12"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373 4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627 7.2 10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z"
                            fill="white"
                        />
                    </svg>
                    <span>Add</span>
                    {addedCount > 0 && <i>{addedCount}</i>}
                </button>
            </div>
        </div>
    );
}

export default PizzaBlock;