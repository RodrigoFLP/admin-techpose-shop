import { ActionIcon, Button, Card, ScrollArea, Table } from "@mantine/core";
import { Link } from "react-router-dom";
import { Edit, Plus, Trash } from "tabler-icons-react";
import LayourInnerDashboard from "../../components/layouts/LayoutInnerDashboard";
import Loading from "../../components/Loading";
import { useGetAllCategoriesQuery } from "../../services/categories";

const CategoriesPage = () => {
  const {
    data: categories,
    isLoading,
    isUninitialized,
    isError,
  } = useGetAllCategoriesQuery();

  if (isLoading || isUninitialized) {
    return <Loading />;
  }

  if (isError) {
    return <div>"Error"</div>;
  }

  const rows = categories.map((category) => (
    <tr key={category.id}>
      <td>{category.id}</td>
      <td>{category.name}</td>
      <td>{category.description}</td>
      <td>{true ? "Sí" : "No"}</td>
      <td>
        <Link to={`/dashboard/categorias/editar/${category.id}`}>
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
      title="Categorías"
      rightAction={
        <Link to={`/dashboard/categorias/editar`}>
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

export default CategoriesPage;
