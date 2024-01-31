import { HashRouter, Route, Routes } from 'react-router-dom';

import './App.css';
import LoginPage from './components/pages/login-page/login.page.component';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <HashRouter basename="/">
          <Routes>
            <Route Component={LoginPage} exact path='/status'></Route>
            <Route Component={LoginPage} exact path='/'></Route>
          </Routes>
        </HashRouter>
      </header>
    </div>
  );
}

export default App;
