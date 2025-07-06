import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home";
import Catalog from "../pages/Catalog";
import ProductDetails from '../pages/ProductDetails'




export const router = createBrowserRouter([
    {
        path: '/',
        element: <Home />
    },
    {
        path: '/catalog',
        element: <Catalog />
    },
    {
        path: '/products/:id',
        element: <ProductDetails />
    }
])