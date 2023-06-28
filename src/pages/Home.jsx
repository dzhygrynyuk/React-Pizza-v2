import React from 'react';
import axios from 'axios';

import { useSelector, useDispatch } from 'react-redux';

import { Categories, Sort, PizzaBlock, Skeleton } from '../components';
import { AppContext } from '../App';

import { setCategoryId } from '../redux/slices/filterSlice';

function Home() {
    const dispatch = useDispatch();
    const activeCategory = useSelector((state) => state.filter.categoryId);

    const [pizzas, setPizzas] = React.useState([]);
    const [isLoading, setIsLoading] = React.useState(true);
    const [activeSortType, setActiveSortType] = React.useState(0);
    const {searchValue} = React.useContext(AppContext);

    const categories = ['Meat', 'Vegetarian', 'Grill', 'Spicy', 'Cheese'];
    const sortItems = [
        {name: 'popular', type: 'popular', order: 'desc'},
        {name: 'price', type: 'price', order: 'desc'},
        {name: 'alphabet', type: 'name', order: 'asc'}
    ];

    const categoryParams = activeCategory !== null ? `category=${activeCategory}` : '';
    const sortParams = `&_sort=${sortItems[activeSortType].type}&_order=${sortItems[activeSortType].order}`;
    const searchParams = searchValue ? `&name_like=${searchValue}` : '';

    React.useEffect(() => {
        axios.get(`http://localhost:3001/pizzas?${categoryParams}${sortParams}${searchParams}`)
            .then(({data}) => {
                setPizzas(data);
                setIsLoading(false);
            });
    }, [activeCategory, activeSortType, searchValue]);

    const onClickSelectCaregory = (index) => {
        //setActiveCategory(index);
        dispatch(setCategoryId(index));
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