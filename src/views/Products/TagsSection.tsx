import { Group, Text, Button, Grid } from "@mantine/core";
import { Plus } from "tabler-icons-react";
import PortionCard from "./PortionCard";

const TagsSection = () => {
  return (
    <>
      <Group position="apart" mt="lg">
        <Text size="sm" weight="bold">
          Grupos de tags
        </Text>
        <Button size="xs" rightIcon={<Plus size={16} />}>
          Añadir
        </Button>
      </Group>
      <Grid columns={24} mt="xs" gutter="xs">
        <Grid.Col span={8}>
          <PortionCard title="Acompañamiento" />
        </Grid.Col>
        <Grid.Col span={8}>
          <PortionCard title="Salsa" />
        </Grid.Col>
        <Grid.Col span={8}>
          <PortionCard title="Condimento" />
        </Grid.Col>
      </Grid>
    </>
  );
};

export default TagsSection;
