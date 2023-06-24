import React from "react";

function Categories({ items, activeItem, onSelectItem }) {
    return(
        <div className="categories">
            <ul>
                <li 
                    className={activeItem === null ? 'active' : ''}
                    onClick={() => onSelectItem(null)}>
                    All
                </li>
                {items && items.map( (item, index) => (
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