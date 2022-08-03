import { Button, ScrollArea, Card, ActionIcon, Table } from "@mantine/core";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { Link } from "react-router-dom";
import { Edit, Plus, Trash } from "tabler-icons-react";
import LayourInnerDashboard from "../../components/layouts/LayoutInnerDashboard";
import Loading from "../../components/Loading";
import orderMock from "../../mocks/order";
import { useGetAllQuery } from "../../services/tickets";
import { getStatus } from "../../utils/helpers/getStatus";

const OrdersPage = () => {
  const {
    data: orders,
    isSuccess,
    isLoading,
    isUninitialized,
    isError,
  } = useGetAllQuery();

  if (isLoading || isUninitialized) return <Loading />;

  if (isError) return <div>Error</div>;

  dayjs.extend(relativeTime);

  const rows = orders.map((element) => (
    <tr key={element.id}>
      <td>{element.id}</td>
      <td>{dayjs(element.createdAt).fromNow()}</td>
      <td>{element.orderType}</td>
      <td>{getStatus(element.status)}</td>
      <td>{element.customer.phoneNumber}</td>
      <td>${parseFloat(element.totalAmount).toFixed(2)}</td>
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
    <LayourInnerDashboard
      title="Ordenes"
      rightAction={<Button leftIcon={<Plus size={16} />}>Agregar</Button>}
    >
      <Card style={{ maxWidth: "90vw" }} withBorder>
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
