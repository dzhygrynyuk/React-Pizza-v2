import React from "react";
import { useSelector, useDispatch } from 'react-redux';
import { SortItem, selectSort, setSort } from "../redux/slices/filterSlice";

type PopupClick =  MouseEvent & {
    path: Node[];
};

export const sortItems: SortItem[] = [
    {name: 'popular', type: 'popular', order: 'desc'},
    {name: 'price', type: 'price', order: 'desc'},
    {name: 'alphabet', type: 'name', order: 'asc'}
];

const Sort: React.FC = React.memo(() => {
    const dispatch = useDispatch();
    const [visiblePopup, setVisiblePopup] = React.useState(false);
    const activeType = useSelector(selectSort);
    const activeLabel = activeType.name;
    const sortRef = React.useRef<HTMLDivElement>(null);

    const onSelectItem = (item: SortItem) => {
        dispatch(setSort(item));
        setVisiblePopup(false);
    };

    const toggleVisiblePopup = () => {
        setVisiblePopup(!visiblePopup);
    };

    React.useEffect(() => {
        const handleOutsideClick = (event: MouseEvent) => {
            const _event = event as PopupClick;
            const path = _event.composedPath ? _event.composedPath() : _event.path;

            if(sortRef.current && !path.includes(sortRef.current)){
                setVisiblePopup(false);
            }
        }

        document.body.addEventListener('click', handleOutsideClick);

        return () => document.body.removeEventListener('click', handleOutsideClick);
    }, []);

    return (
        <div ref={sortRef} className="sort">
            <div onClick={toggleVisiblePopup} className="sort__label">
                <svg
                    className={visiblePopup ? 'rotated' : ''}
                    width="10"
                    height="6"
                    viewBox="0 0 10 6"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                    d="M10 5C10 5.16927 9.93815 5.31576 9.81445 5.43945C9.69075 5.56315 9.54427 5.625 9.375 5.625H0.625C0.455729 5.625 0.309245 5.56315 0.185547 5.43945C0.061849 5.31576 0 5.16927 0 5C0 4.83073 0.061849 4.68424 0.185547 4.56055L4.56055 0.185547C4.68424 0.061849 4.83073 0 5 0C5.16927 0 5.31576 0.061849 5.43945 0.185547L9.81445 4.56055C9.93815 4.68424 10 4.83073 10 5Z"
                    fill="#2C2C2C"
                    />
                </svg>
                <b>Sort by:</b>
                <span>{activeLabel}</span>
            </div>
            {visiblePopup && (
                <div className="sort__popup">
                    <ul>
                        {sortItems.map((item, index) => (
                            <li 
                                key={`sort-item__${index}`}
                                className={activeType.type === item.type ? 'active' : ''}
                                onClick={() => onSelectItem(item)} >
                                {item.name}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
});

export default Sort;