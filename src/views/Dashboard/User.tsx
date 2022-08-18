import { ChevronRight, ChevronLeft, Logout } from "tabler-icons-react";
import {
  UnstyledButton,
  Group,
  Text,
  Box,
  useMantineTheme,
  Menu,
} from "@mantine/core";
import { useSelector } from "react-redux";
import { selectUser } from "../../store";
import { useLogoutMutation } from "../../services/auth";
import { useNavigate } from "react-router-dom";

export function User() {
  const theme = useMantineTheme();

  const user = useSelector(selectUser);

  const navigate = useNavigate();

  const [logout, logoutResponse] = useLogoutMutation();

  return (
    <Menu shadow="md" width={200}>
      <Menu.Target>
        <Box
          sx={{
            paddingTop: theme.spacing.sm,
            borderTop: `1px solid ${
              theme.colorScheme === "dark"
                ? theme.colors.dark[4]
                : theme.colors.gray[2]
            }`,
          }}
        >
          <UnstyledButton
            sx={{
              display: "block",
              width: "100%",
              padding: theme.spacing.xs,
              borderRadius: theme.radius.sm,
              color:
                theme.colorScheme === "dark"
                  ? theme.colors.dark[0]
                  : theme.black,

              "&:hover": {
                backgroundColor:
                  theme.colorScheme === "dark"
                    ? theme.colors.dark[6]
                    : theme.colors.gray[0],
              },
            }}
          >
            <Group>
              <Box sx={{ flex: 1 }}>
                <Text size="sm" weight={500}>
                  {user.firstName}
                </Text>
                <Text color="dimmed" size="xs">
                  {user.email}
                </Text>
              </Box>

              {theme.dir === "ltr" ? (
                <ChevronRight size={18} />
              ) : (
                <ChevronLeft size={18} />
              )}
            </Group>
          </UnstyledButton>
        </Box>
      </Menu.Target>

      <Menu.Dropdown>
        <Menu.Label>Opciones</Menu.Label>
        <Menu.Item
          icon={<Logout size={14} />}
          onClick={() =>
            logout().then(() => {
              navigate("/", { replace: true });
              navigate(0);
            })
          }
        >
          Cerrar sesión
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
}
