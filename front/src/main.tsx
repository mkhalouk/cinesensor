import ReactDOM from 'react-dom/client'
import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";
import DashBoard from './pages/dashboard/DashBoard.tsx';
import Login from './pages/login/Login.tsx'
import App from './App.tsx'
import './index.css'

const router = createBrowserRouter([
    {
        path: "/dashboard",
        element: <DashBoard />,
    },
    {
        path: "/login",
        element: <Login />,
    },
    {
        path: "/",
        element: <App />,
    },
]);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <RouterProvider router={router} future={{ v7_startTransition: true }} />
)
