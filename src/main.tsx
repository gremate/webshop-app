import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { ThemeProvider } from '@mui/material';
import { AppProvider } from './contexts/AppContext';
import { theme } from './constants';
import App from './components/layout/App';
import Products from './components/pages/products/Products';

const root = createRoot(document.getElementById('root')!);
const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        children: [
            {
                index: true,
                element: <Products />
            }
        ]
    }
]);

root.render(
    <React.StrictMode>
        <ThemeProvider theme={theme}>
            <AppProvider>
                <RouterProvider router={router} />
            </AppProvider>
        </ThemeProvider>
    </React.StrictMode>
);
