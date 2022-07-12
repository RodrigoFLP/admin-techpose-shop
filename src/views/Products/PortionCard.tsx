import { Card, Text, Title } from "@mantine/core";
import { FC } from "react";

interface Props {
  title: string;
  price?: number;
  onClick?: () => void;
}

const PortionCard = ({ title, price, onClick }: Props) => {
  return (
    <Card
      withBorder
      onClick={onClick}
      sx={(theme) => ({
        "&:hover": {
          cursor: "pointer",
          backgroundColor:
            theme.colorScheme === "dark"
              ? theme.colors.dark[3]
              : theme.colors.gray[0],
        },
      })}
    >
      <Text size="sm">{title}</Text>
      {price && <Text size="sm">${price}</Text>}
    </Card>
  );
};

export default PortionCard;
