
import './App.css';
import AddressBookForm from './components/addressbookform';
import AddressBookHome from './components/addressbookhome';
import { BrowserRouter as Router , Switch, Route,} from 'react-router-dom';

function App() {
  return (
    <div className="App">
    
    <Router>
      <Switch>
        <Route exact path='/form' ><AddressBookForm/></Route>
        <Route exact path='/' ><AddressBookHome/></Route>
        <Route exact path='/home' ><AddressBookHome/></Route>
        <Route exact path='/form/:id' ><AddressBookForm/></Route>
      </Switch>
    </Router>
  </div>
  );
}

export default App;
