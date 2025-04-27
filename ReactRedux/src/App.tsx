import { useReducer } from 'react';
import './App.css';
import Header from './components/Navbar';
import Login from './pages/Login';
import { HashRouter, Route, Routes } from 'react-router-dom';
import Register from './pages/Register';
import Home from './pages/Home';
import { appReducer, ContextApp, initialAppState } from './state/state';
import { Toasts } from './common/toasts';
import { SettingsPage } from './pages/SettingsPage';
import {ModelMetadatas} from './forms/ModelMetadatas';
import {ProjectMetadatas} from './forms/ProjectMetadatas';
import {FormMetadatas} from './forms/FormMetadatas';
import {PropMetadatas} from './forms/PropMetadatas';
import {ComponentMetadatas} from './forms/ComponentMetadatas';



function App() {
  const [state, dispatch] = useReducer(appReducer, initialAppState);

  return (
    <div className="App">
      <ContextApp.Provider value={{ dispatch, state }}>
        {/* <BrowserRouter basename='/terminal'> */}
        <HashRouter basename='/'>
          <main className="container-md">
            <Header />
            <Routes >
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} /> 
              <Route path='/settings' element={<SettingsPage />} /> 
              <Route path='/ModelMetadatas' element={<ModelMetadatas items={[]} autoFetch={true} />} /> 
<Route path='/ProjectMetadatas' element={<ProjectMetadatas items={[]} autoFetch={true} />} /> 
<Route path='/FormMetadatas' element={<FormMetadatas items={[]} autoFetch={true} />} /> 
<Route path='/PropMetadatas' element={<PropMetadatas items={[]} autoFetch={true} />} /> 
<Route path='/ComponentMetadatas' element={<ComponentMetadatas items={[]} autoFetch={true} />} /> 
            </Routes>
          </main>
        {/* </BrowserRouter> */}
        </HashRouter>
        <Toasts />
      </ContextApp.Provider>
    </div>
  );
}




export default App;
