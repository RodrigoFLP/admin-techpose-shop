import {
  Card,
  Group,
  Container,
  Text,
  Badge,
  Divider,
  ActionIcon,
  Menu,
  Button,
  Modal,
} from "@mantine/core";
import { showNotification, updateNotification } from "@mantine/notifications";
import { useState } from "react";

import { Clock, Dots, DotsVertical, Refresh } from "tabler-icons-react";
import { ActiveOrder, StatusType } from "../../interfaces/order";
import { useUpdateTicketStatusMutation } from "../../services/tickets";
import { statusColor } from "../../utils/constants/statusColors.constants";
import { dateFromNow } from "../../utils/helpers/dateFromNow";
import { getStatus, getStatusType } from "../../utils/helpers/getStatus";
import priceToFixed from "../../utils/helpers/priceToFixed";

interface Props {
  order: ActiveOrder;
  onDelete: (id: string) => void;
}

const StatusMenu = ({ id }: { id: number }) => {
  const [updateStatus, result] = useUpdateTicketStatusMutation();

  const handleStatusUpdate = async ({
    statusId,
    status,
  }: {
    statusId: number;
    status: StatusType;
  }) => {
    try {
      showNotification({
        id: "status-update",
        loading: true,
        title: "Actualizando estado",
        message: "Nuevo estado",
      });
      await updateStatus({ statusId, status }).unwrap();
      updateNotification({
        id: "status-update",
        title: "Estado actualizado",
        message: "Se ha actualizado el estado",
        autoClose: 1000,
      });
    } catch (err) {}
  };

  return (
    <Menu shadow="md" width={200} withinPortal={true}>
      <Menu.Target>
        <Button
          size="xs"
          fullWidth
          mt="md"
          leftIcon={<Refresh size={16} />}
          onClick={() => {}}
        >
          Actualizar estado
        </Button>
      </Menu.Target>

      <Menu.Dropdown>
        <Menu.Label>Actualizar estado</Menu.Label>
        {Object.values(StatusType).map((status) => (
          <Menu.Item
            onClick={() => handleStatusUpdate({ statusId: id, status: status })}
          >
            {status}
          </Menu.Item>
        ))}
      </Menu.Dropdown>
    </Menu>
  );
};

export const OrderCard = ({ order, onDelete }: Props) => {
  const [showRemoveModal, setShowRemoveModal] = useState(false);

  return (
    <Card shadow="xs">
      <Card.Section>
        <Container
          sx={(theme) => ({
            backgroundColor: statusColor[getStatusType(order.status)].color,
            color: "white",
            fontWeight: "bold",
            textAlign: "center",
          })}
          py="4px"
        >
          <Text size="sm">{getStatus(order.status)}</Text>
          <ActionIcon
            variant="transparent"
            onClick={() => setShowRemoveModal(true)}
            sx={(theme) => ({ position: "absolute", top: "0", right: "0" })}
          >
            <DotsVertical color="white" size={18} />
          </ActionIcon>
        </Container>
      </Card.Section>
      <Group position="apart" mt="xs">
        <Text weight="bold">
          {order.customer.firstName} {order.customer.lastName}
        </Text>
        <Text weight="bold">{priceToFixed(order.totalAmount)}</Text>
      </Group>
      <Text size="xs" color="gray">
        #{order.id}
      </Text>
      <Group position="apart" mt="xs">
        <Badge>{order.orderType}</Badge>
        <Badge color="gray">
          <Group>
            <Clock size={14} />
            {dateFromNow(order.createdAt)}
          </Group>
        </Badge>
      </Group>
      <Divider variant="dashed" my="sm" />
      {order.ticketItems.map((item) => (
        <Container p={0}>
          <Group position="apart">
            <Text size="sm">{item.product.name}</Text>
            <Text size="sm">{item.quantity}</Text>
          </Group>
          <Text size="xs" color="gray">
            {item.portion.name}
          </Text>
        </Container>
      ))}
      <Divider variant="dashed" my="sm" />
      {/* <Text size={"xs"}>
        {order.address.addressLine1}, {order.address.addressLine2},
        {order.address.city}
      </Text> */}
      {/* <Text size={"xs"}>{order.customer.phoneNumber}</Text> */}

      <StatusMenu id={order.status.id} />
      {showRemoveModal && (
        <Modal
          opened={showRemoveModal}
          onClose={() => setShowRemoveModal(false)}
          title={`¿Quieres eliminar ${order.id}?`}
        >
          <Button
            color="red"
            onClick={() => {
              onDelete(order.id);
              setShowRemoveModal(false);
            }}
          >
            Eliminar
          </Button>
        </Modal>
      )}
    </Card>
  );
};
