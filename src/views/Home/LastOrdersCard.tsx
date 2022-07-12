import { Card, Title } from "@mantine/core";
import { FC } from "react";

const LastOrdersCard: FC = () => {
  return (
    <Card shadow="xs" style={{ height: "100%" }}>
      <Title order={4}>Últimas ordenes</Title>
    </Card>
  );
};

export default LastOrdersCard;
