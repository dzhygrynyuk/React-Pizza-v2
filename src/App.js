import React from 'react';
import {Routes, Route} from 'react-router-dom';

import { Header } from './components';
import { Home, Cart, NotFound } from './pages';

export const AppContext = React.createContext({});

function App() {
    const [searchValue, setSearchValue] = React.useState('');

    return (
        <AppContext.Provider value={{searchValue, setSearchValue}} >
            <div className="wrapper">
                <Header />

                <div className="content">
                    <Routes>
                        <Route exact path="/" element={<Home />} />
                        <Route exact path="/cart" element={<Cart />} />
                        <Route path="*" element={<NotFound />} />
                    </Routes>
                </div>
            </div>
        </AppContext.Provider>
    );
}

export default App;
