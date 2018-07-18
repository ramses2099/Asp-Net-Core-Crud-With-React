import * as React from 'react';
import { Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import { FetchData } from './components/FetchData';
import { Counter } from './components/Counter';
import { FetchEmployee } from './components/FetchEmployee';

export const routes = <Layout>
    <Route exact path='/' component={Home} />
    <Route exact path='/fetchemployee' component={FetchEmployee} />
    <Route path='/counter' component={ Counter } />
    <Route path='/fetchdata' component={ FetchData } />
</Layout>;
