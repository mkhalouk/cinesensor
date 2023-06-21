import ReactDOM from 'react-dom/client'
import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";
import Login from './pages/login/Login.tsx'
import App from './App.tsx'
import './index.css'

const router = createBrowserRouter([
    {
        path: "/login",
        element: <Login />,
    },
    {
        path: "/",
        element: <App />,
    },
    {
        path: "/dashboard",
        element: <App />,
    },
]);

router._internalSetRoutes

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <RouterProvider router={router} future={{ v7_startTransition: true }} />
)
