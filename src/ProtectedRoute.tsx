import { Center, Container, Loader } from "@mantine/core";
import { Navigate, Outlet } from "react-router-dom";
import { selectIsIdle, selectIsLoading, selectIsLoggedIn } from "./store";
import { useAppSelector } from "./store/hooks";

const ProtectedRoute = () => {
  const isLoggedIn = useAppSelector(selectIsLoggedIn);
  const isIdle = useAppSelector(selectIsIdle);
  const isLoading = useAppSelector(selectIsLoading);

  if (isIdle || isLoading) {
    return (
      <Container
        sx={() => ({
          height: "100vh",
          width: "100vw",
        })}
      >
        <Center
          sx={() => ({
            height: "100vh",
          })}
        >
          <Loader />
        </Center>
      </Container>
    );
  }

  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
