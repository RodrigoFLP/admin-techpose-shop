import "./App.css";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import LoginPage from "./views/Login/LoginPage";
import OnBoardingPage from "./views/OnBoarding/OnBoardingPage";
import DashboardPage from "./views/Dashboard/Dashboard";
import HomePage from "./views/Home/HomePage";
import ProductsPage from "./views/Products/ProductsPage";
import CategoriesPage from "./views/Categories/CategoriesPage";
import EditProductPage from "./views/Products/EditProductPage";
import { MantineProvider } from "@mantine/core";
import SchedulePage from "./views/Schedule/SchedulePage";
import AreasPage from "./views/Areas/AreasPage";
import OrdersPage from "./views/Orders/OrdersPage";
import WompiPage from "./views/Wompi/WompiPage";
import ClientsPage from "./views/Clients/ClientsPage";
import OrdersConfigPage from "./views/OrdersConfig/OrdersConfigPage";
import UsersPage from "./views/Users/UsersPage";
import ApiPage from "./views/Api/ApiPage";
import { NotificationsProvider } from "@mantine/notifications";
import PageConfigPage from "./views/PageConfig/PageConfig";
import { Provider } from "react-redux";
import { store } from "./store/store";
import ProtectedRoute from "./ProtectedRoute";
import EditCategoriesPage from "./views/Categories/EditCategoryPage";

function App() {
  return (
    <Provider store={store}>
      <MantineProvider
        theme={{ colorScheme: "light" }}
        withGlobalStyles
        withNormalizeCSS
      >
        <NotificationsProvider>
          <BrowserRouter>
            <Routes>
              <Route path="*" element={<Navigate to="/dashboard" />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/onboarding" element={<OnBoardingPage />} />
              <Route element={<ProtectedRoute />}>
                <Route path="dashboard" element={<DashboardPage />}>
                  <Route index element={<HomePage />} />
                  <Route path="pagina" element={<PageConfigPage />} />
                  <Route path="productos" element={<ProductsPage />} />
                  <Route path="productos/:id" element={<EditProductPage />} />
                  <Route path="categorias" element={<CategoriesPage />} />
                  <Route
                    path="categorias/:id"
                    element={<EditCategoriesPage />}
                  />
                  <Route path="horario" element={<SchedulePage />} />
                  <Route path="areas" element={<AreasPage />} />
                  <Route path="ordenes" element={<OrdersPage />} />
                  <Route path="wompi" element={<WompiPage />} />
                  <Route path="clientes" element={<ClientsPage />} />
                  <Route path="pedidos" element={<OrdersConfigPage />} />
                  <Route path="usuarios" element={<UsersPage />} />
                  <Route path="api" element={<ApiPage />} />
                </Route>
              </Route>
            </Routes>
          </BrowserRouter>
        </NotificationsProvider>
      </MantineProvider>
    </Provider>
  );
}

export default App;
