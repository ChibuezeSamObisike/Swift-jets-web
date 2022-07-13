import './App.css';
import {Container, ThemeProvider} from "@mui/material";
import {theme} from "./theme";
import MenuBar from "./components/Menu/MenuBar";
import HomePage from "./pages/HomePage/HomePage";
import {QueryClientProvider} from "react-query";
import { ReactQueryDevtools } from 'react-query/devtools'
import {queryClient} from "./client";
import { Routes, Route, Link } from "react-router-dom";
import { Toaster } from 'react-hot-toast';
import SwiftJetRoutes from "./routes";

function App() {
  return (
      <div className="App">
          <QueryClientProvider client={queryClient}>
              <ThemeProvider theme={theme}>
                  <>
                      <MenuBar />
                      <SwiftJetRoutes />
                  </>
              </ThemeProvider>
              <Toaster />
              <ReactQueryDevtools initialIsOpen={false} />
          </QueryClientProvider>

      </div>
  );
}

export default App;
