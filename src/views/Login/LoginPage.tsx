import {
  Button,
  Center,
  Container,
  PasswordInput,
  Text,
  TextInput,
} from "@mantine/core";
import { At, Lock } from "tabler-icons-react";

const LoginPage = () => {
  return (
    <Container>
      <Center style={{ height: "100vh" }}>
        <Container>
          <Text align="center" size="lg" weight={"bold"}>
            Ingresa
          </Text>
          <TextInput mt={"xl"} placeholder="Usuario" icon={<At />} />
          <PasswordInput mt={"sm"} placeholder="Contraseña" icon={<Lock />} />
          <Button fullWidth mt={"md"}>
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
        </Container>
      </Center>
    </Container>
  );
};

export default LoginPage;
