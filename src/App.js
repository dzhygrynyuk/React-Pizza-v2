import React from 'react';
import {Routes, Route} from 'react-router-dom';

import { Header } from './components';
import { Home, Cart, SinglePizza, NotFound } from './pages';

function App() {
    return (
        <div className="wrapper">
            <Header />

            <div className="content">
                <Routes>
                    <Route exact path="/" element={<Home />} />
                    <Route exact path="/cart" element={<Cart />} />
                    <Route exact path="/pizza/:id" element={<SinglePizza />} />
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </div>
        </div>
    );
}

export default App;
