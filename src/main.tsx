import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material';
import { AppProvider } from './contexts/AppContext';
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
const theme = createTheme({
    components: {
        MuiSwitch: {
            styleOverrides: {
                colorPrimary: {
                    '&.Mui-checked': {
                        color: '#00e300'
                    }
                },
                track: {
                    opacity: 1,
                    backgroundColor: '#ababab',
                    '.Mui-checked.Mui-checked + &': {
                        opacity: 1,
                        backgroundColor: '#ababab'
                    }
                }
            }
        },
        MuiSelect: {
            styleOverrides: {
                outlined: {
                    color: 'white'
                },
                root: {
                    backgroundColor: '#212121',
                    '& .MuiOutlinedInput-notchedOutline': {
                        borderColor: 'white !important'
                    }
                },
                icon: {
                    color: 'white'
                }
            }
        },
        MuiFormLabel: {
            styleOverrides: {
                root: {
                    color: 'white !important'
                }
            }
        },
        MuiTextField: {
            styleOverrides: {
                root: {
                    '& .MuiInputBase-root': {
                        color: 'white',
                        backgroundColor: '#212121'
                    },
                    '& .MuiOutlinedInput-notchedOutline': {
                        borderColor: 'white !important'
                    }
                }
            }
        }
    }
});

root.render(
    <React.StrictMode>
        <ThemeProvider theme={theme}>
            <AppProvider>
                <RouterProvider router={router} />
            </AppProvider>
        </ThemeProvider>
    </React.StrictMode>
);
