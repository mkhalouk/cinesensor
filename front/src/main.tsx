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
        path: "/",
        element: <App/>,
    },
    {
        path: "/login",
        element: <Login/>,
    },
    {
        path: "/dashboard",
        element: <DashBoard/>,
    },
]);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <RouterProvider router={router} />
)
