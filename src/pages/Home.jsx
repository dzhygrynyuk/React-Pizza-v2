import React from 'react';
import qs from 'qs';

import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { Categories, Sort, PizzaBlock, Skeleton } from '../components';
import { AppContext } from '../App';
import { sortItems } from '../components/Sort';

import { fetchPizza, selectPizzaData } from '../redux/slices/pizzaSlice';
import { setCategoryId, setSort, setFilters, selectFilter } from '../redux/slices/filterSlice';

function Home() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const isMounted = React.useRef(false);
    const isSearch = React.useRef(false);

    const { items, status } = useSelector(selectPizzaData);
    const {searchValue} = React.useContext(AppContext);

    const {categoryId: activeCategory, sort: activeSortType} = useSelector(selectFilter);

    React.useEffect(() => {
        if(window.location.search){
            const params = qs.parse(window.location.search.substring(1));
            const sort = sortItems.find(obj => obj.type === params.sortType);

            dispatch(setFilters({
                ...params,
                sort
            }));
            isSearch.current = true;
        }
    }, []);

    const getPizzas = async () => {
        const categoryParams = activeCategory !== null ? `category=${activeCategory}` : '';
        const sortParams = `&_sort=${activeSortType.type}&_order=${activeSortType.order}`;
        const searchParams = searchValue ? `&name_like=${searchValue}` : '';

        dispatch(fetchPizza({ categoryParams, sortParams, searchParams }));
    }

    React.useEffect(() => {
        if( !isSearch.current ){
            getPizzas();
        }
        isSearch.current = false;
    }, [activeCategory, activeSortType, searchValue]);

    React.useEffect(() => {
        if(isMounted.current){
            const queryString = qs.stringify({
                sortType: activeSortType.type,
                categoryId: activeCategory
            });
    
            navigate(`?${queryString}`);
        }
        isMounted.current = true;
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
            {status === 'error' ? (
                <div className='content__error-info'>
                    <h2>Couldn't Load Content 😕</h2>
                    <p>Unfortunately, it was not possible to get pizzas. Please try again later.</p>
                </div>
            ) : (
                <div className="content__items">     
                    {status === 'loading' ? (
                        Array(12).fill(0).map((_, index) => <Skeleton key={index} />)
                    ) : (   
                        items && items.map((itemObj, index) => (
                            <PizzaBlock key={index} {...itemObj} />
                        ))
                    )}
                </div>
            )}
        </div>
    );
}

export default Home;