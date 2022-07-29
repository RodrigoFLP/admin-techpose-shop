import { Group, Text, Button, Grid } from "@mantine/core";
import { Plus } from "tabler-icons-react";
import { Portion, TagGroup } from "../../interfaces";
import PortionCard from "./PortionCard";

interface Props {
  openModal: (portion: TagGroup | null) => void;
  tagGroups: TagGroup[] | null;
}

const TagsSection = ({ tagGroups, openModal }: Props) => {
  return (
    <>
      <Group position="apart" mt="lg">
        <Text size="sm" weight="bold">
          Grupos de tags
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
        {tagGroups?.map((tagGroup) => (
          <Grid.Col span={8} key={tagGroup.id}>
            <PortionCard
              title={tagGroup.name}
              onClick={() => openModal(tagGroup)}
            />
          </Grid.Col>
        ))}
      </Grid>
    </>
  );
};

export default TagsSection;
