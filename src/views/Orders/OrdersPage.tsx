import {
  ScrollArea,
  Card,
  ActionIcon,
  Table,
  Title,
  Grid,
} from "@mantine/core";

import { Link } from "react-router-dom";
import { Edit, Trash } from "tabler-icons-react";
import LayourInnerDashboard from "../../components/layouts/LayoutInnerDashboard";
import Loading from "../../components/Loading";
import { ActiveOrder } from "../../interfaces/order";
import { useGetAllActiveQuery, useGetAllQuery } from "../../services/tickets";
import { dateFromNow } from "../../utils/helpers/dateFromNow";
import { getStatus } from "../../utils/helpers/getStatus";
import priceToFixed from "../../utils/helpers/priceToFixed";
import { OrderCard } from "./OrderCard";

interface ActiveOrdersProps {
  orders: ActiveOrder[];
}

const ActiveOrders = ({ orders }: ActiveOrdersProps) => {
  return (
    <div>
      <Title order={4}>Activas</Title>
      <Grid columns={6} mt="md" sx={(theme) => ({ position: "relative" })}>
        {orders.map((order) => (
          <Grid.Col xs={6} sm={3} md={2} lg={2} xl={2} key={order.id}>
            <OrderCard order={order} />
          </Grid.Col>
        ))}
      </Grid>
    </div>
  );
};

const OrdersPage = () => {
  const {
    data: orders,
    isSuccess,
    isLoading,
    isUninitialized,
    isError,
  } = useGetAllQuery();

  const {
    data: activeOrders,
    isSuccess: isActiveOrdersSuccess,
    isLoading: isActiveOrdersLoading,
    isUninitialized: isActiveOrdersUnintialized,
    isError: isActiveOrdersError,
  } = useGetAllActiveQuery();

  if (
    isLoading ||
    isUninitialized ||
    isActiveOrdersLoading ||
    isActiveOrdersUnintialized
  )
    return <Loading />;

  if (isError || isActiveOrdersError) return <div>Error</div>;

  const rows = orders.map((element) => (
    <tr key={element.id}>
      <td>{element.id}</td>
      <td>{dateFromNow(element.createdAt)}</td>
      <td>{element.orderType}</td>
      <td>{getStatus(element.status)}</td>
      <td>{element.customer.phoneNumber}</td>
      <td>{priceToFixed(element.totalAmount)}</td>
      <td>
        <Link to={`/dashboard/ordenes/${element.id}`}>
          <ActionIcon>
            <Edit size={16} />
          </ActionIcon>
        </Link>
      </td>
      <td>
        <ActionIcon
          onClick={() => {
            alert("Eliminar");
          }}
        >
          <Trash size={16} />
        </ActionIcon>
      </td>
    </tr>
  ));

  return (
    <LayourInnerDashboard title="Ordenes">
      <ActiveOrders orders={activeOrders} />
      <Title order={4} mt="xl">
        Lista de ordenes
      </Title>
      <Card style={{ maxWidth: "90vw" }} withBorder mt="md">
        <Card.Section>
          <ScrollArea>
            <Table striped highlightOnHover>
              <thead>
                <tr>
                  <th>Id</th>
                  <th>Fecha</th>
                  <th>Tipo</th>
                  <th>Estado</th>
                  <th>Cliente</th>
                  <th>Total</th>
                  <th>Editar</th>
                  <th>Eliminar</th>
                </tr>
              </thead>
              <tbody>{rows}</tbody>
            </Table>
          </ScrollArea>
        </Card.Section>
      </Card>
    </LayourInnerDashboard>
  );
};

export default OrdersPage;
