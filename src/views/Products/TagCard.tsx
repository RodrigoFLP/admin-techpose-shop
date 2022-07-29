import { ActionIcon, Badge, Card, Group, Popover, Text } from "@mantine/core";
import { useState } from "react";
import { Edit } from "tabler-icons-react";
import { Tag } from "../../interfaces";
import TagForm from "./forms/TagForm";

const TagCard = ({
  value,
  price,
  ratio,
  onClick,
}: Omit<Tag & { onClick: () => void }, "id" | "name">) => {
  return (
    <Card style={{ cursor: "pointer" }} withBorder onClick={() => onClick()}>
      <Group>
        <ActionIcon color="blue">
          <Edit size={16} />
        </ActionIcon>
        <Text weight="bold" size="sm">
          {value}
        </Text>
      </Group>
      <Group position="apart" mt="xs">
        <Badge>Precio</Badge>
        <Text size="sm">${price}</Text>
      </Group>
      <Group position="apart">
        <Badge>Ratio</Badge>
        <Text size="sm">{ratio}</Text>
      </Group>
    </Card>
  );
};

export default TagCard;
