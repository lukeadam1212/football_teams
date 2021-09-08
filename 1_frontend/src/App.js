import React, {useReducer} from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

// styles
import './App.css';

// components
import Header from './components/Header';
import Footer from './components/Footer';

// pages
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import ProtectedAccount from './ProtectedAccount';

// context 
export const UserContext = React.createContext();

// state management
// -- global state
const initialState = { user: '' };
const reducer = (state, action) => {
  switch (action.type) {
    case 'Register':
      return { user: action.payload };
    case 'Login':
      return { user: action.payload };
    case 'Logout':
      return { user: '' };
    default:
      return state;
  }
};

function App() {

  //state
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <UserContext.Provider value ={{state, dispatch}}>
      <Router>
      <Header />
        <Switch>
          <Route exact path='/' component={HomePage} />
          <Route path='/login' component={LoginPage} />
          <Route path ='/my-account' component ={ProtectedAccount} />
        </Switch>
      <Footer />
  </Router>
    </UserContext.Provider>
  );
}

export default App;
