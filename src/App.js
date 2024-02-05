import { HashRouter, Route, Routes } from 'react-router-dom';

import './App.css';
import LoginPage from './components/pages/login-page/login.page.component';
import ConfigurationPage from './components/pages/configuration-page/configuration.page.component';
import MainPage from './components/pages/main-page/main.page.component';
import MaintenancePage from './components/pages/maintenance-page/maintenance.page.component';
import UserPage from './components/pages/user-page/user.page.component';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <HashRouter basename="/">
          <Routes>
            <Route Component={ConfigurationPage} exact path='/config'></Route>
            <Route Component={MainPage} exact path='/main'></Route>
            <Route Component={MaintenancePage} exact path='/maintenance'></Route>
            <Route Component={UserPage} exact path='/user'></Route>
            <Route Component={LoginPage} exact path='/'></Route>
          </Routes>
        </HashRouter>
      </header>
    </div>
  );
}

export default App;
