import { createBrowserRouter } from "react-router";
import App from "./App";
import HomePage from "./pages/HomePage";
import CartPage from "./pages/CartPage";
import ProtectedRoute from "./RouteCheck/ProtectedRoute";
import OrdersPage from "./pages/OrdersPage";
import CheckoutReturnPage from "./pages/CheckoutReturnPage";
import ProductDetailPage from "./pages/ProductDetailPage";
import { SentryDemoPage } from "./pages/SentryDemoPage";
import OrderDetailPage from "./pages/OrderDetailPage";
import OrderSummaryPage from "./pages/OrderSummaryPage";
import OrderChatPage from "./pages/OrderChatPage";

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
        path: "/product/:slug",
        element: <ProductDetailPage />,
    },
    {
        path: "/orders",
        element: <ProtectedRoute><OrdersPage /></ProtectedRoute>,
    },
    {
        path: "/orders/:id",
        element: <OrderDetailPage />,
        children: [
            {
                index: true,
                element: <OrderSummaryPage />,
            },
            {
                path: "chat",
                element: <OrderChatPage />,
            },
        ],
    },
    {
        path: "/checkout/return",
        element: <CheckoutReturnPage />
    },
    {
        path: "/demo-sentry",
        element: <SentryDemoPage />
    }
]);
