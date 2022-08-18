import {
  ActionIcon,
  Button,
  Card,
  Modal,
  ScrollArea,
  Table,
} from "@mantine/core";
import { showNotification, updateNotification } from "@mantine/notifications";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Check, Edit, Plus, Trash, X } from "tabler-icons-react";
import LayourInnerDashboard from "../../components/layouts/LayoutInnerDashboard";
import Loading from "../../components/Loading";
import { Customer } from "../../interfaces/customer";
import {
  useGetAllQuery,
  useRemoveCustomerMutation,
} from "../../services/customers";
import { dateFromNow } from "../../utils/helpers/dateFromNow";
//
const ClientsPage = () => {
  const {
    data: customers,
    isLoading,
    isUninitialized,
    isError,
  } = useGetAllQuery();

  const [customerToRemove, setCustomerToRemove] = useState<Customer | null>(
    null
  );

  const [removeCustomer, removed] = useRemoveCustomerMutation();

  const handleRemoveCustomer = async (id: number) => {
    try {
      showNotification({
        id: "delete-customer",
        loading: true,
        title: "Eliminando categoría",
        message: "Se está eliminando categoría",
        autoClose: false,
        disallowClose: true,
      });
      await removeCustomer(id).unwrap();
      updateNotification({
        id: "delete-customer",
        color: "teal",
        title: "Listo",
        message: "Categoria se ha elinado con éxito",
        icon: <Check />,
        autoClose: 2000,
      });
      setCustomerToRemove(null);
    } catch (err) {
      updateNotification({
        id: "delete-customer",
        color: "red",
        title: "Error",
        message: "No se ha podido eliminar la categoria",
        icon: <X />,
        autoClose: 2000,
      });
    }
  };

  if (isLoading || isUninitialized) {
    return <Loading />;
  }

  if (isError) {
    return <div>"Error"</div>;
  }

  const rows = customers.map((customer) => (
    <tr key={customer.id}>
      <td>{customer.id}</td>
      <td>{customer.firstName}</td>
      <td>{customer.lastName}</td>
      <td>{customer.user ? customer.user.email : "No es usuario"}</td>
      <td>{customer.phoneNumber}</td>
      <td>{dateFromNow(customer.createdAt)}</td>
      <td>
        {!customer.user
          ? "No es usuario"
          : customer.user.isEmailConfirmed
          ? "Sí"
          : "No"}
      </td>

      <td>
        <Link to={`/dashboard/clientes/editar/${customer.id}`}>
          <ActionIcon>
            <Edit size={16} />
          </ActionIcon>
        </Link>
      </td>
      <td>
        <ActionIcon onClick={() => setCustomerToRemove(customer)}>
          <Trash size={16} />
        </ActionIcon>
      </td>
    </tr>
  ));

  return (
    <LayourInnerDashboard
      title="Clientes"
      rightAction={
        <Link to={`/dashboard/clientes/editar`}>
          <Button leftIcon={<Plus size={16} />}>Agregar</Button>
        </Link>
      }
    >
      <Card style={{ maxWidth: "90vw" }} withBorder>
        <Card.Section>
          <ScrollArea>
            <Table striped highlightOnHover>
              <thead>
                <tr>
                  <th>Id</th>
                  <th>Nombres</th>
                  <th>Apellidos</th>
                  <th>Usuario</th>
                  <th>Número</th>
                  <th>Creado</th>
                  <th>Usuario confirmado</th>
                  <th>Editar</th>
                  <th>Eliminar</th>
                </tr>
              </thead>
              <tbody>{rows}</tbody>
            </Table>
          </ScrollArea>
        </Card.Section>
      </Card>
      {customerToRemove && (
        <Modal
          opened={!!customerToRemove}
          onClose={() => setCustomerToRemove(null)}
          title={`¿Quieres eliminar ${customerToRemove.id}?`}
        >
          <Button
            color="red"
            onClick={() => handleRemoveCustomer(customerToRemove.id)}
          >
            Eliminar
          </Button>
        </Modal>
      )}
    </LayourInnerDashboard>
  );
};

export default ClientsPage;
