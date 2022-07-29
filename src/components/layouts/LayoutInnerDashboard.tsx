import { Container, Group, Title } from "@mantine/core";
import { FC, ReactElement, ReactNode } from "react";

interface Props {
  children: ReactNode;
  title: string;
  rightAction?: ReactElement;
  leftAction?: ReactElement;
}

const LayourInnerDashboard: FC<Props> = ({
  children,
  title,
  rightAction,
  leftAction,
}) => {
  return (
    <Container style={{ minHeight: "90vh" }} mb="sm">
      <Group py={"xl"} position="apart">
        <Group>
          {leftAction}
          <Title order={2}>{title}</Title>
        </Group>
        {rightAction}
      </Group>
      {children}
    </Container>
  );
};

export default LayourInnerDashboard;
