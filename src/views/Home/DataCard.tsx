import { Card, Group, Text, ThemeIcon } from "@mantine/core";
import { FC, ReactElement } from "react";
import { ReportMoney } from "tabler-icons-react";

interface Props {
  title: string;
  value: number;
  previousValue: number;
  icon: ReactElement;
  type: "money" | "number";
}

const DataCard: FC<Props> = ({ title, value, previousValue, icon, type }) => {
  return (
    <Card shadow="xs">
      <Group>
        <ThemeIcon color="gray" variant="light">
          {icon}
        </ThemeIcon>
      </Group>
      <Text mt="xs" color={"gray"} size="sm">
        {title}
      </Text>
      <Text size="xl" weight="bold">
        {type === "money" && "$"}
        {value}
      </Text>
      <Text size="xs" color={"gray"}>
        {type === "money" && "$"}
        {previousValue} ayer
      </Text>
    </Card>
  );
};

export default DataCard;
