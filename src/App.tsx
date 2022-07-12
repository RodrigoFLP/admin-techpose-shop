import { useState } from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginPage from "./views/Login/LoginPage";
import OnBoardingPage from "./views/OnBoarding/OnBoardingPage";
import DashboardPage from "./views/Dashboard/Dashboard";
import HomePage from "./views/Home/HomePage";
import ProductsPage from "./views/Products/ProductsPage";
import CategoriesPage from "./views/Categories/CategoriesPage";
import EditProductPage from "./views/Products/EditProductPage";
import { MantineProvider } from "@mantine/core";

function App() {
  return (
    <MantineProvider
      theme={{ colorScheme: "light" }}
      withGlobalStyles
      withNormalizeCSS
    >
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/onboarding" element={<OnBoardingPage />} />
          <Route path="dashboard" element={<DashboardPage />}>
            <Route index element={<HomePage />} />
            <Route path="productos" element={<ProductsPage />} />
            <Route path="productos/:id" element={<EditProductPage />} />
            <Route path="categorias" element={<CategoriesPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </MantineProvider>
  );
}

export default App;
