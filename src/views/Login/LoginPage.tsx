import {
  Button,
  Center,
  Container,
  PasswordInput,
  Text,
  TextInput,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { Navigate, useNavigate } from "react-router-dom";
import { At, Lock } from "tabler-icons-react";
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
      await login({ username: values.email, password: values.password });
      console.log("se loguea");
      navigate("/", { replace: true });
      navigate(0);
    } catch (err) {}
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
