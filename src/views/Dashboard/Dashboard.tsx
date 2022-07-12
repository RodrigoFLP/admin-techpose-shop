import {
  AppShell,
  Burger,
  Header,
  MediaQuery,
  ScrollArea,
  Text,
  useMantineTheme,
} from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { FC, useState } from "react";
import { Outlet, useLocation, useResolvedPath } from "react-router-dom";
import DashboardNavbar from "./Navbar";

const DashboardPage: FC = () => {
  const [isNavbarOpen, toggleIsNavBarOpen] = useState(false);
  const largeScreen = useMediaQuery("(min-width: 800px)");

  return (
    <AppShell
      navbarOffsetBreakpoint="sm"
      padding={0}
      navbar={<DashboardNavbar isOpen={isNavbarOpen} />}
      fixed
      sx={(theme) => ({
        backgroundColor:
          theme.colorScheme === "dark"
            ? theme.colors.dark[9]
            : theme.colors.gray[0],
      })}
    >
      <ScrollArea offsetScrollbars={false} style={{ height: "100vh" }}>
        <Header
          height={largeScreen ? 0 : 60}
          p="md"
          hidden={largeScreen ? true : false}
        >
          <div
            style={{ display: "flex", alignItems: "center", height: "100%" }}
          >
            <Burger
              opened={!isNavbarOpen}
              onClick={() => toggleIsNavBarOpen((prev) => !prev)}
              size="sm"
              mr="xl"
            />

            <Text>Techpos</Text>
          </div>
        </Header>
        <Outlet />
      </ScrollArea>
    </AppShell>
  );
};

export default DashboardPage;
