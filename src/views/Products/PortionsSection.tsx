import { Group, Text, Grid, Button } from "@mantine/core";
import { Plus } from "tabler-icons-react";
import { Portion } from "../../interfaces";
import PortionCard from "./PortionCard";

interface Props {
  openModal: (portion: Portion | null) => void;
  portions: Portion[] | null;
}

const PortionSection = ({ openModal, portions }: Props) => {
  return (
    <>
      <Group position="apart">
        <Text size="sm" weight="bold">
          Porciones
        </Text>
        <Button
          size="xs"
          rightIcon={<Plus size={16} />}
          onClick={() => openModal(null)}
        >
          Añadir
        </Button>
      </Group>
      <Grid columns={24} mt="xs" gutter="xs">
        {portions?.map((portion) => (
          <Grid.Col span={8} key={portion.id}>
            <PortionCard
              title={portion.name}
              price={portion.price}
              onClick={() => openModal(portion)}
            />
          </Grid.Col>
        ))}
      </Grid>
    </>
  );
};

export default PortionSection;
