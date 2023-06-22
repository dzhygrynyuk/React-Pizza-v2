import React from "react";

function Categories({ items }) {
    const [activeCategory, setActiveCategory] = React.useState(null);

    return(
        <div className="categories">
            <ul>
                <li 
                    className={activeCategory === null ? 'active' : ''}
                    onClick={() => setActiveCategory(null)}>
                    All
                </li>
                {items && items.map( (item, index) => (
                    <li 
                        key={`category_${index}`}
                        className={activeCategory === index ? 'active' : ''}
                        onClick={() => setActiveCategory(index)} >
                        {item}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Categories;