import React from 'react';
import axios from 'axios';

import { Categories, Sort, PizzaBlock, Skeleton } from '../components';

function Home() {
    const [pizzas, setPizzas] = React.useState([]);
    const [isLoading, setIsLoading] = React.useState(true);

    React.useEffect(() => {
        axios.get('http://localhost:3001/pizzas').then(({data}) => {
            setPizzas(data);
            setIsLoading(false);
        });
    }, []);

    const categories = ['Meat', 'Vegetarian', 'Grill', 'Spicy', 'Cheese'];
    const sortItems = [
        {name: 'popular', type: 'popular', order: 'desc'},
        {name: 'price', type: 'price', order: 'desc'},
        {name: 'alphabet', type: 'name', order: 'asc'}
    ];

    return(
        <div className="container">
            <div className="content__top">
                <Categories items={categories} />
                <Sort items={sortItems} />
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