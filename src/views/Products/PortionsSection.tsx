import { Group, Text, Grid, Button } from "@mantine/core";
import { Plus } from "tabler-icons-react";
import PortionCard from "./PortionCard";

interface Props {
  openModal: () => void;
}

const PortionSection = ({ openModal }: Props) => {
  return (
    <>
      <Group position="apart">
        <Text size="sm" weight="bold">
          Porciones
        </Text>
        <Button size="xs" rightIcon={<Plus size={16} />} onClick={openModal}>
          Añadir
        </Button>
      </Group>
      <Grid columns={24} mt="xs" gutter="xs">
        <Grid.Col span={8}>
          <PortionCard title="Pequeño" price={1.22} onClick={openModal} />
        </Grid.Col>
        <Grid.Col span={8}>
          <PortionCard title="Mediano" price={1.22} onClick={openModal} />
        </Grid.Col>
        <Grid.Col span={8}>
          <PortionCard title="Grande" price={1.22} onClick={openModal} />
        </Grid.Col>
        <Grid.Col span={8}>
          <PortionCard title="Extragrande" price={1.22} onClick={openModal} />
        </Grid.Col>
      </Grid>
    </>
  );
};

export default PortionSection;
