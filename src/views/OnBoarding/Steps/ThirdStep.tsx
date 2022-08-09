import {
  ActionIcon,
  Button,
  Card,
  Container,
  Group,
  Modal,
  PasswordInput,
  Select,
  Stack,
  Switch,
  Text,
  TextInput,
  Title,
} from "@mantine/core";
import { FC, useState } from "react";
import {
  At,
  Lock,
  BuildingStore,
  BrandWhatsapp,
  Phone,
  Plus,
  Pin,
  Map,
  Edit,
  Trash,
} from "tabler-icons-react";

const UserForm = () => {
  return (
    <form>
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
        label="Confirma la contraseña"
        placeholder="Contraseña"
        icon={<Lock />}
      />
      <Select
        mt={"sm"}
        label="Rol"
        placeholder="Pick one"
        data={[
          { value: "admin", label: "Administrador" },
          { value: "manager", label: "Gerente" },
          { value: "employee", label: "Empleado" },
        ]}
      />
      <Button fullWidth mt={"xl"}>
        Crea un nuevo usuario
      </Button>
    </form>
  );
};

interface Props {
  onComplete: () => void;
}

const ThirdStep: FC<Props> = ({ onComplete }) => {
  const [isUserModalOpen, setIsUserModalOpen] = useState(false);

  return (
    <>
      <Container pt={"xl"}>
        <Title align="center" order={2}>
          Usuarios
        </Title>
        <Text align="center" color={"gray"} size="sm">
          Crea usuarios y asigna sus roles
        </Text>
      </Container>
      <Container pb={"2.5rem"}>
        <form
          onSubmit={(e) => {
            e.preventDefault;
            onComplete();
          }}
        >
          <Container>
            <Button
              fullWidth
              mt={"xl"}
              leftIcon={<Plus />}
              onClick={() => setIsUserModalOpen(true)}
            >
              Crear nuevo usuario
            </Button>
            <Card shadow={"xs"} mt={"xs"}>
              <Group>
                <ActionIcon>
                  <Edit />
                </ActionIcon>
                test@email.com
                <ActionIcon>
                  <Trash />
                </ActionIcon>
              </Group>
            </Card>

            <Button fullWidth mt={"xl"} type="submit">
              Siguiente paso
            </Button>
          </Container>
        </form>
      </Container>
      <Modal
        title="Crea un nuevo usuario"
        opened={isUserModalOpen}
        onClose={() => setIsUserModalOpen(false)}
      >
        <UserForm />
      </Modal>
    </>
  );
};

export default ThirdStep;
