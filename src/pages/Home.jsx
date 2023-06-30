import React from 'react';
import axios from 'axios';

import { useSelector, useDispatch } from 'react-redux';

import { Categories, Sort, PizzaBlock, Skeleton } from '../components';
import { AppContext } from '../App';

import { setCategoryId, setSort } from '../redux/slices/filterSlice';

function Home() {
    const dispatch = useDispatch();

    const [pizzas, setPizzas] = React.useState([]);
    const [isLoading, setIsLoading] = React.useState(true);
    const {searchValue} = React.useContext(AppContext);

    const activeCategory = useSelector((state) => state.filter.categoryId);
    const activeSortType = useSelector((state) => state.filter.sort);

    const categoryParams = activeCategory !== null ? `category=${activeCategory}` : '';
    const sortParams = `&_sort=${activeSortType.type}&_order=${activeSortType.order}`;
    const searchParams = searchValue ? `&name_like=${searchValue}` : '';

    React.useEffect(() => {
        axios.get(`http://localhost:3001/pizzas?${categoryParams}${sortParams}${searchParams}`)
            .then(({data}) => {
                setPizzas(data);
                setIsLoading(false);
            });
    }, [activeCategory, activeSortType, searchValue]);

    const onClickSelectCaregory = (index) => {
        dispatch(setCategoryId(index));
    }

    const onClickSelectSort = (item) => {
        dispatch(setSort(item));
    }

    return(
        <div className="container">
            <div className="content__top">
                <Categories onSelectItem={onClickSelectCaregory} />
                <Sort onSelectType={onClickSelectSort} />
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