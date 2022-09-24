import './css/sb-admin-2.css';
import './App.css';
import Dashboard from './Component/Dashboard';
import Users from './Component/Users';
import Products from './Component/Products';
import CreateUser from './Component/CreateUser';
import { BrowserRouter, Routes, Route, } from "react-router-dom";
import CreateProduct from './Component/CreateProduct';
import LogIn from './Component/LogIn';
import Portal from './Component/Portal';
import UserView from './Component/UserView';
import ProductView from './Component/ProductView';
import EditUser from './Component/EditUser';
import EditProduct from './Component/EditProduct';
import { UserProvider } from './Component/UserContext';
import Profile from './Component/Profile';

function App() {
  return (
    <BrowserRouter>

      <UserProvider>
        <Routes>
          <Route path='/' element={<LogIn />} />
          <Route path='/portal' element={<Portal />}>
            <Route path='dashboard' element={<Dashboard />} />
            <Route path='users' element={<Users />} />
            <Route path='users/:id' element={<UserView />} />
            <Route path='users/edit/:id' element={<EditUser />} />
            <Route path='create-user' element={<CreateUser />} />
            <Route path='products' element={<Products />} />
            <Route path='products/:id' element={<ProductView />} />
            <Route path='products/edit/:id' element={<EditProduct />} />
            <Route path='create-product' element={<CreateProduct />} />
            <Route path='profile' element={<Profile />} />
          </Route>
        </Routes>
      </UserProvider>

    </BrowserRouter>
  );
}

export default App;
