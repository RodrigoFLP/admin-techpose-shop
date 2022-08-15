import {
  Button,
  Center,
  Container,
  PasswordInput,
  Text,
  TextInput,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { showNotification, updateNotification } from "@mantine/notifications";
import { Navigate, useNavigate } from "react-router-dom";
import { At, Check, Lock, X } from "tabler-icons-react";
import { useLoginMutation } from "../../services/auth";

const LoginPage = () => {
  const [login] = useLoginMutation();
  const navigate = useNavigate();

  const form = useForm({
    initialValues: {
      email: "",
      password: "",
    },
    validate: {
      email: (value: string) =>
        value.length < 4 ? "Ingresa un correo válido" : null,
    },
  });

  const handleSubmit = async (values: typeof form.values) => {
    try {
      showNotification({
        id: "login",
        loading: true,
        title: "Ingresando",
        message: "Se está intentando iniciar sesión",
        autoClose: false,
        disallowClose: true,
      });
      await login({
        username: values.email,
        password: values.password,
      }).unwrap();
      updateNotification({
        id: "login",
        color: "teal",
        title: "Listo",
        message: "Se ha iniciado la sesión con éxito",
        icon: <Check />,
        autoClose: 2000,
      });
      navigate("/", { replace: true });
      navigate(0);
    } catch (err) {
      updateNotification({
        id: "login",
        color: "red",
        title: "Error",
        message: "No se ha podido iniciar sesión, revisa los datos",
        icon: <X />,
        autoClose: 2000,
      });
    }
  };

  return (
    <Container>
      <Center style={{ height: "100vh" }}>
        <Container>
          <form onSubmit={form.onSubmit(handleSubmit)}>
            <Text align="center" size="lg" weight={"bold"}>
              Ingresa
            </Text>
            <TextInput
              {...form.getInputProps("email")}
              mt={"xl"}
              placeholder="Usuario"
              icon={<At />}
            />
            <PasswordInput
              {...form.getInputProps("password")}
              mt={"sm"}
              placeholder="Contraseña"
              icon={<Lock />}
            />
            <Button fullWidth mt={"md"} type="submit">
              Ingresar
            </Button>
            <Center>
              <Text<"a">
                align="center"
                mt="sm"
                size="xs"
                color={"gray"}
                href="#"
                component="a"
              >
                ¿Se te olvidó la contraseña?
              </Text>
            </Center>
          </form>
        </Container>
      </Center>
    </Container>
  );
};

export default LoginPage;
