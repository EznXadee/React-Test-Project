import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { createContext } from "react";
import store from "./store";
import "./global.scss";

import IndexPage from "./pages/Index";
import PanelPage from "./pages/Panel";

export const Context = createContext();

const { palette } = createTheme();
const theme = createTheme({
    palette: {
        primary: palette.augmentColor({
            color: {
                main: "#600da3",
            },
        }),
    },
});

const router = createBrowserRouter([
    {
        path: "/",
        element: <IndexPage />,
    },
    {
        path: "/panel",
        element: <PanelPage />,
    },
]);

const Parent = () => {
    return (
        <ThemeProvider theme={theme}>
            <Context.Provider value={{}}>
                <Provider store={store}>
                    <RouterProvider router={router} />
                </Provider>
            </Context.Provider>
        </ThemeProvider>
    );
};

ReactDOM.createRoot(document.getElementById("root")).render(<Parent />);
