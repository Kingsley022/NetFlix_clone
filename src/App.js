import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { createContext, useState } from 'react';
import Movies from './pages/movies';
import Home from './pages/home';
import './App.css';
import Register from './pages/register/register';
import User from './pages/user';
import PrivateRoute from './common/private-route';
import NotFound from './pages/not-found';

export const AppContext = createContext();

function App() {
  const client = new QueryClient();
  const [user, setUser] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <AppContext.Provider value={{ user, setUser, isLoggedIn, setIsLoggedIn }}>
      <QueryClientProvider client={client}>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Register />} />

            <Route path='/home' element={<PrivateRoute />}>
              <Route index element={<Home/>}  />
            </Route>

            <Route path='/movies' element={<PrivateRoute />}>
              <Route index element={<Movies/>}  />
            </Route>

            <Route path='/user' element={<PrivateRoute />}>
              <Route index element={<User />}  />
            </Route>

            <Route path='*' element={<NotFound/>}/>

          </Routes>
        </BrowserRouter>
      </QueryClientProvider>
    </AppContext.Provider>
  );
}

export default App;