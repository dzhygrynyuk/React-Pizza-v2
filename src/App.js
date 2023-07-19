import React from 'react';
import {Routes, Route} from 'react-router-dom';

import { Header } from './components';
import { Home, Cart, NotFound } from './pages';

function App() {
    return (
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
    );
}

export default App;
