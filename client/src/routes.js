
import { Route, Redirect, Switch } from 'react-router-dom'
import React from 'react';
import TimeSheet from './components/timeSheet/timeSheet';
import Login from './components/login/login';
import Footer from './components/footer/footer';
import Header from './components/header/header';
import App from './App';

const reactRouter = () => {
    return (
        <Switch>
            <Route path="/404" />
            <Route path="/employee" render={({ match: { url } }) => (
                <>
                    <Header />
                    <Route path={`${url}/dashboard`} component={App} />
                    <Route path={`${url}/timesheet`} component={TimeSheet} />
                    <Route path={`${url}/request`} component={App} />
                    <Footer />
                </>
            )}
            />
            <Route path="/" component={Login}/>
            <Redirect to="/404" />
        </Switch>
    );
}

export default reactRouter;