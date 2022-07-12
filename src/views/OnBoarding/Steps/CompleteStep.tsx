import { Button, Container, Text, Title } from "@mantine/core";
import { FC } from "react";

interface Props {
  onComplete: () => void;
}

const CompleteStep: FC<Props> = ({ onComplete }) => {
  return (
    <>
      <Container pt={"xl"}>
        <Title align="center" order={2}>
          ¡Configuración completa!
        </Title>
        <Text align="center" color={"gray"} size="sm">
          Se te redireccionará automaticamente al dashboard
        </Text>
      </Container>
    </>
  );
};

export default CompleteStep;
