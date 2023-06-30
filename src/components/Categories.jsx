import React from "react";
import { useSelector } from 'react-redux';

const categories = ['Meat', 'Vegetarian', 'Grill', 'Spicy', 'Cheese'];

function Categories({ onSelectItem }) {
    const activeItem = useSelector((state) => state.filter.categoryId);

    return(
        <div className="categories">
            <ul>
                <li 
                    className={activeItem === null ? 'active' : ''}
                    onClick={() => onSelectItem(null)}>
                    All
                </li>
                {categories && categories.map( (item, index) => (
                    <li 
                        key={`category_${index}`}
                        className={activeItem === index ? 'active' : ''}
                        onClick={() => onSelectItem(index)} >
                        {item}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Categories;