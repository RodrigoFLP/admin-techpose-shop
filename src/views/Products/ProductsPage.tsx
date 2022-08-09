import {
  ActionIcon,
  Button,
  Card,
  Center,
  Container,
  Loader,
  ScrollArea,
  Table,
} from "@mantine/core";
import { Link } from "react-router-dom";
import { Edit, Plus, Trash } from "tabler-icons-react";
import LayourInnerDashboard from "../../components/layouts/LayoutInnerDashboard";
import Loading from "../../components/Loading";
import { useGetAllQuery } from "../../services/products";
import { dateFromNow } from "../../utils/helpers/dateFromNow";
import priceToFixed from "../../utils/helpers/priceToFixed";

const ProductsPage = () => {
  const {
    data: products,
    isLoading,
    isUninitialized,
    isError,
    isSuccess,
  } = useGetAllQuery();

  if (isLoading || isUninitialized) {
    return <Loading />;
  }

  if (isError) {
    return <div>"Error"</div>;
  }

  const rows = products.map((element) => (
    <tr key={element.id}>
      <td>{element.id}</td>
      <td>{element.name}</td>
      <td>{element.description}</td>
      <td>{element.categories[0].name}</td>
      <td>{dateFromNow(element.updatedAt)}</td>
      <td>{true ? "Sí" : "No"}</td>
      <td>
        <Link to={`/dashboard/productos/editar/${element.id}`}>
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
      title="Productos"
      rightAction={
        <Link to={`/dashboard/productos/editar`}>
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
                  <th>Nombre</th>
                  <th>Descripción</th>
                  <th>Categoría</th>
                  <th>Modificado</th>
                  <th>Activo</th>
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

export default ProductsPage;
