import { Button, ScrollArea, Card, ActionIcon, Table } from "@mantine/core";
import { Link } from "react-router-dom";
import { Edit, Plus, Trash } from "tabler-icons-react";
import LayourInnerDashboard from "../../components/layouts/LayoutInnerDashboard";
import orderMock from "../../mocks/order";

const OrdersPage = () => {
  const rows = orderMock.map((element) => (
    <tr key={element.id}>
      <td>{element.id}</td>
      <td>{element.createdAt}</td>
      <td>{element.orderType}</td>
      <td>{element.status.orderConfirmed}</td>
      <td>{"cliente"}</td>
      <td>{element.totalAmount}</td>
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
