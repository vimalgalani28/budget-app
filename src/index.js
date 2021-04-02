import React from 'react';
import ReactDOM from 'react-dom';
import LoadingPage from './components/LoadingPage'
import reportWebVitals from './reportWebVitals';
import {Provider} from 'react-redux'
import AppRouter , {history} from "./router/AppRouter"
import "normalize.css/normalize.css"
import './styles/style.scss'
import configureStore from "./store/configureStore"
import {firebase} from "./firebase/firebase"
import {startSetExpenses} from './actions/expenses'
import {login , logout} from './actions/auth'
const store = configureStore()
const Jsx = ()=>(
    <Provider store={store}>
        <AppRouter />
    </Provider>
)
ReactDOM.render(<LoadingPage />, document.getElementById('app'));
let hasRendered = false
const renderApp = () => {
  if (!hasRendered) {
    ReactDOM.render(<Jsx />, document.getElementById('app'));
  }
  hasRendered = false
}

firebase.auth().onAuthStateChanged((user)=> {
  if (user) {
    console.log("Login")
    store.dispatch(login(user.uid))
    store.dispatch(startSetExpenses()).then(() => {
      renderApp()
      if (history.location.pathname === '/') {
        history.push('/dashboard')
      }
    });
  }
  else {
    store.dispatch(logout())
    renderApp()
    history.push('/')
  }
})

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();