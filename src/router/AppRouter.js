import React from "react"
import {
    Router,
    Route,
    Switch
} from "react-router-dom";
import ExpenseDashboardPage from "../components/ExpenseDashboardPage"
import CreateExpensePage from "../components/CreateExpensePage"
import EditExpensePage from "../components/EditExpensePage"
import NotFoundPage from "../components/NotFoundPage"
import LogInPage from '../components/LogInPage'
import { createBrowserHistory } from 'history';
import PrivateRoute from './PrivateRoute'
import PublicRoute from './PublicRoute'
export const history = createBrowserHistory()
const AppRouter = () => (
    <Router history={history}>
        <div>
            <Switch>
                <PublicRoute path="/" exact={true} component={LogInPage}></PublicRoute>
                <PrivateRoute path="/dashboard" exact={true} component={ExpenseDashboardPage}></PrivateRoute>
                <PrivateRoute path="/create" exact={true} component={CreateExpensePage}></PrivateRoute>
                <PrivateRoute path="/edit/:id" exact={true} component={EditExpensePage}></PrivateRoute>
                <Route component={NotFoundPage}></Route>
            </Switch>
        </div>
    </Router>
);

export default AppRouter;