import React from 'react';
import axios from 'axios';

import { Categories, Sort, PizzaBlock, Skeleton } from '../components';

function Home() {
    const [pizzas, setPizzas] = React.useState([]);
    const [isLoading, setIsLoading] = React.useState(true);
    const [activeCategory, setActiveCategory] = React.useState(null);
    const [activeSortType, setActiveSortType] = React.useState(0);

    const categories = ['Meat', 'Vegetarian', 'Grill', 'Spicy', 'Cheese'];
    const sortItems = [
        {name: 'popular', type: 'popular', order: 'desc'},
        {name: 'price', type: 'price', order: 'desc'},
        {name: 'alphabet', type: 'name', order: 'asc'}
    ];

    console.log(sortItems[0]);

    React.useEffect(() => {
        axios.get(`http://localhost:3001/pizzas?${activeCategory !== null ? `category=${activeCategory}` : ''}&_sort=${sortItems[activeSortType].type}&_order=${sortItems[activeSortType].order}`)
            .then(({data}) => {
                setPizzas(data);
                setIsLoading(false);
            });
    }, [activeCategory, activeSortType]);

    const onClickSelectCaregory = (index) => {
        setActiveCategory(index);
    }

    const onClickSelectSort = (index) => {
        setActiveSortType(index);
    }

    return(
        <div className="container">
            <div className="content__top">
                <Categories 
                    activeItem={activeCategory} 
                    items={categories} 
                    onSelectItem={onClickSelectCaregory}
                />
                <Sort 
                    activeType={activeSortType} 
                    items={sortItems} 
                    onSelectType={onClickSelectSort}
                />
            </div>
            <h2 className="content__title">All pizzas</h2>
            <div className="content__items">
                {isLoading ? (
                    Array(12).fill(0).map((_, index) => <Skeleton key={index} />)
                ) : (
                    pizzas && pizzas.map((itemObj, index) => (
                        <PizzaBlock key={index} {...itemObj} />
                    ))
                )}
            </div>
        </div>
    );
}

export default Home;