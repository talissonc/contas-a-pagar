
import React from 'react';
import { Route, BrowserRouter } from 'react-router-dom';

import Contas from './pages/Contas';

const Routes = () => {
    return (
        <BrowserRouter>
            <Route component={Contas} path="/" exact />
        </BrowserRouter>
    );
};

export default Routes;