import {
  ActionIcon,
  Button,
  Card,
  Container,
  Group,
  MenuLabel,
  Modal,
  PasswordInput,
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
} from "tabler-icons-react";

const MapForm = () => {
  return (
    <form>
      <Button fullWidth mt={"xl"}>
        Selecciona la ubicación
      </Button>
    </form>
  );
};

interface Props {
  onComplete: () => void;
}

const SecondStep: FC<Props> = ({ onComplete }) => {
  const [isBranchModalOpen, setIsBranchModalOpen] = useState(false);

  return (
    <>
      <Container pt={"xl"}>
        <Title align="center" order={2}>
          Configura las sucursales de tu negocio
        </Title>
        <Text align="center" color={"gray"} size="sm">
          Ingresa los datos generales de tus sucursales para el correcto
          funcionamiento
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
            <TextInput
              mt={"1rem"}
              label="Nombre del negocio"
              placeholder="Nombre"
              icon={<BuildingStore />}
            />
            <TextInput
              mt={"sm"}
              label="Número de teléfono"
              placeholder="Teléfono"
              icon={<Phone />}
            />
            <TextInput
              mt={"sm"}
              label="Número de whatsapp"
              placeholder="Whatsapp"
              icon={<BrandWhatsapp />}
            />
            <TextInput
              mt={"sm"}
              label="Dirección línea 1"
              placeholder="Dirección línea 1"
              icon={<Map />}
            />
            <TextInput
              mt={"sm"}
              label="Dirección línea 2"
              placeholder="Dirección línea 2"
              icon={<Map />}
            />
            <Button
              fullWidth
              mt={"sm"}
              rightIcon={<Pin />}
              onClick={() => setIsBranchModalOpen(true)}
            >
              Seleccionar Ubicación
            </Button>
            <Stack spacing={"xs"} mt={"lg"}>
              <Title order={5}>Pedidos</Title>
              <Switch label="Envíos a domicilio" />
              <Switch label="Recoger en persona" />
              <Switch label="Pedidos programados" />
            </Stack>
            <Stack spacing={"xs"} mt={"lg"}>
              <Title order={5}>Métodos de pago</Title>
              <Switch label="Pago en efectivo" />
              <Switch label="Pago con Wompi" />
            </Stack>

            <Button fullWidth mt={"xl"} type="submit">
              Siguiente paso
            </Button>
          </Container>
        </form>
      </Container>
      <Modal
        title="Crea una nueva sucursal"
        opened={isBranchModalOpen}
        onClose={() => setIsBranchModalOpen(false)}
      >
        <MapForm />
      </Modal>
    </>
  );
};

export default SecondStep;
