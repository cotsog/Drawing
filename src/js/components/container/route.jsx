var React = require('react');
// var ReactDOM = require('react-dom');

var ReactRouter = require('react-router');
var Router = ReactRouter.Router;
var Route = ReactRouter.Route;
var browserHistory = ReactRouter.browserHistory;
var Provider = require('react-redux').Provider;

var store = require('../../stores/reduxStore.js');

var SignupLayout = require('./signup.jsx');
var LoginLayout = require('./login.jsx');
var AppLayout = require('./app.jsx');

var requiresLogin;
var requiresLogout;
var AppRoute;

require('whatwg-fetch');

/**
 * This function requires the user to be logged into the
 * system. If not, they will be redirected to the login
 * page.
 */
requiresLogin = function (nextState, replace) {
    if (!store.getState().loginState.username) {
        replace({
            pathname: '/login',
        });
    }
};


/**
 * This function requires the user to be logged out of
 * the system. If they are not logged out, they will be
 * redirected to the root page.
 */
requiresLogout = function (nextState, replace) {
    if (store.getState().loginState.username) {
        replace({
            pathname: '/',
        });
    }
};


/**
 * Set up the Routes for the React app
 */
// renderApp = function () {
//     ReactDOM.render(
//         <Provider store={store}>
//             <Router history={browserHistory} >
//                 <Route path="/" component={AppLayout} onEnter={requiresLogin} />
//                 <Route path="/signup" component={SignupLayout} onEnter={requiresLogout} />
//                 <Route path="/login" component={LoginLayout} onEnter={requiresLogout} />
//             </Router>
//         </Provider>,
//         document.getElementById('container')
//     );
// };


/**
 * create a class to set up the Router
 */
AppRoute = React.createClass({
    render: function() {
        return (
            <Provider store={store}>
                <Router history={browserHistory} >
                    <Route path="/" component={AppLayout} onEnter={requiresLogin} />
                    <Route path="/signup" component={SignupLayout} onEnter={requiresLogout} />
                    <Route path="/login" component={LoginLayout} onEnter={requiresLogout} />
                </Router>
            </Provider>
        );
    }
});


 /**
  * Check for a session, and if it exists, store
  * the logged in information.
  */
// fetch('/session/login', {
//     method: 'POST',
//     credentials: 'include',
// })
//     .then(checkStatus)
//     .then(parseJSON)
//     .then(login)
//     .catch(function (err) {
//         var errormsg = err.response;
//         store.dispatch({
//             type: 'LOGIN_FAILURE',
//             error: errormsg,
//         });
//         renderApp();
//     });
    
    
module.exports = AppRoute;
