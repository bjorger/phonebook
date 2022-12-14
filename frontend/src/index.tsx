import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { QueryClient, QueryClientProvider } from "react-query";
import { APIProvider } from "./providers/apiProvider";
import { createGlobalStyle } from "styled-components";
import theme from "./theme";
import { ThemeProvider } from "styled-components";

const queryClient = new QueryClient();

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);

const GlobalStyle = createGlobalStyle`
    body {
    margin: 0;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
        'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
        sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    }

    * {
        a {
            text-decoration: none;
        }
    }
`;

root.render(
    <>
        <GlobalStyle />
        <ThemeProvider theme={theme}>
            <QueryClientProvider client={queryClient}>
                <APIProvider>
                    <App />
                </APIProvider>
            </QueryClientProvider>
        </ThemeProvider>
    </>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
