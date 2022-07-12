import {
  Divider,
  Navbar,
  ScrollArea,
  Title,
  Transition,
  useMantineTheme,
} from "@mantine/core";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import { ConfigLinks, MainLinks } from "./MainLinks";
import { User } from "./User";

interface Props {
  isOpen: boolean;
}

const DashboardNavbar = ({ isOpen }: Props) => {
  const { pathname: currenthPath } = useLocation();

  console.log(currenthPath);
  const theme = useMantineTheme();

  return (
    <Navbar
      p="xs"
      hiddenBreakpoint={"sm"}
      hidden={isOpen}
      width={{ sm: 240, lg: 240 }}
    >
      <Navbar.Section mt="md">
        <Title order={4} pl="xs" pb="xs">
          Dashboard
        </Title>
      </Navbar.Section>
      <Divider
        my="xs"
        color={
          theme.colorScheme === "dark"
            ? theme.colors.dark[4]
            : theme.colors.gray[2]
        }
      />
      <ScrollArea>
        <Navbar.Section grow mt="md">
          <Title order={5} pl="xs" pb="xs">
            Menu
          </Title>
          <MainLinks currentPath={currenthPath} />
          <Title order={5} pl="xs" pb="xs" mt="md">
            Configuración
          </Title>
          <ConfigLinks currentPath={currenthPath} />
        </Navbar.Section>
      </ScrollArea>
      <Navbar.Section>
        <User />
      </Navbar.Section>
    </Navbar>
  );
};

export default DashboardNavbar;
