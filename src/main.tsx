import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { Provider } from 'react-redux';
import { store } from './redux/store.ts';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import CarDetails from './components/CarDetails/CarDetails.tsx';
import AddCar from './components/AddCar/AddCar.tsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
  },
  {
    path: '/car/:id',
    element: <CarDetails />,
  },
  {
    path: '/car/addcar',
    element: <AddCar />,
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);
