import {
  Button,
  Container,
  PasswordInput,
  Text,
  TextInput,
  Title,
} from "@mantine/core";
import { FC } from "react";
import { At, Lock } from "tabler-icons-react";

interface Props {
  onComplete: () => void;
}

const FirstStep: FC<Props> = ({ onComplete }) => {
  return (
    <>
      <Container pt={"xl"}>
        <Title align="center" order={2}>
          Bienvenido
        </Title>
        <Text align="center" color={"gray"} size="sm">
          Como primer paso crea tu cuenta de administrador
        </Text>
      </Container>
      <Container pb={"xl"}>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            onComplete();
          }}
        >
          <TextInput
            mt={"1rem"}
            label="Correo electrónico"
            placeholder="Usuario"
            icon={<At />}
          />
          <PasswordInput
            mt={"sm"}
            label="Contraseña"
            placeholder="Contraseña"
            icon={<Lock />}
          />
          <PasswordInput
            mt={"sm"}
            label="Confirma tu contraseña"
            placeholder="Contraseña"
            icon={<Lock />}
          />
          <Button fullWidth mt={"xl"} type="submit">
            Crear administrador
          </Button>
        </form>
      </Container>
    </>
  );
};

export default FirstStep;
