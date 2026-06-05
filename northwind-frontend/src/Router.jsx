import { createBrowserRouter } from "react-router";
import App from "./App";
import HomePage from "./pages/HomePage";
import CartPage from "./pages/CartPage";
import ProtectedRoute from "./RouteCheck/ProtectedRoute";
import OrdersPage from "./pages/OrdersPage";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {
                index: true,
                element: <HomePage />,
            },
        ],
    },
    {
        path: "/cart",
        element: <CartPage />,
    },
    {
        path: "/orders",
        element: <ProtectedRoute><OrdersPage /></ProtectedRoute>,
    }
]);
