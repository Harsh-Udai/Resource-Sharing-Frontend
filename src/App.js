import './App.css';
import Home from './Containers/HomeContainer';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Signup from './Pages/Signup';
import Login from './Containers/LoginContainer';
import Reset from './Pages/Reset';
import RSUPLOAD from './Containers/ResourceUpload';
import Dashboard from './Containers/DashboardContainer';
import Entry from './Containers/EntryContainer';
import Profile from './Containers/ProfileContainer';
import Product from './Containers/ProductContainer';
import Anime  from './Pages/Animation';
import Cart from './Containers/CartContainer';
import Requests from './Containers/RequestContainer';
import Mess from './Containers/messageContainer';
import Error from './Pages/Error';

function App() {
  return (
    <div>
      <Router>
        <Switch>
          <Route exact path='/' component={Home} />
          <Route exact path='/Signup' component={Signup} />
          <Route exact path='/Login' component={Login} />
          <Route exact path='/Reset' component={Reset} />
          <Route exact path='/Resource' component={RSUPLOAD} />
          <Route exact path='/Dashboard' component={Dashboard} />
          <Route exact path='/UI' component={Entry} />
          <Route exact path='/UI/Profile' component={Profile} />
          <Route exact path='/UI/Cart' component={Cart} />
          <Route exact path='/UI/Requests' component={Requests} />
          <Route exact path='/UI/Product/:id' component={Product} />
          <Route exact path='/AI' component={Anime} />
          <Route exact path='/UI/messenger' component={Mess} />
          <Route component={Error} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
