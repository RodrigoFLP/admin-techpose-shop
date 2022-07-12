import { ActionIcon, Button, Card, ScrollArea, Table } from "@mantine/core";
import { Link } from "react-router-dom";
import { Edit, Plus, Trash } from "tabler-icons-react";
import LayourInnerDashboard from "../../components/layouts/LayoutInnerDashboard";

const elements = [
  {
    id: 6,
    name: 12.011,
    description: "C",
    category: "Carbon",
    price: 5.99,
    isActive: true,
  },
  {
    id: 7,
    name: 14.007,
    description: "N",
    category: "Nitrogen",
    price: 5.99,
    isActive: true,
  },
  {
    id: 39,
    name: 88.906,
    description: "Y",
    category: "Yttrium",
    price: 5.99,
    isActive: true,
  },
  {
    id: 56,
    name: 137.33,
    description: "Ba",
    category: "Barium",
    price: 5.99,
    isActive: true,
  },
  {
    id: 58,
    name: 140.12,
    description: "Ce",
    category: "Cerium",
    price: 5.99,
    isActive: true,
  },
];

const ProductsPage = () => {
  const rows = elements.map((element) => (
    <tr key={element.id}>
      <td>{element.id}</td>
      <td>{element.name}</td>
      <td>{element.description}</td>
      <td>{element.category}</td>
      <td>{element.price}</td>
      <td>{element.isActive ? "Sí" : "No"}</td>
      <td>
        <Link to={`/dashboard/productos/${element.id}`}>
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
      rightAction={<Button leftIcon={<Plus size={16} />}>Agregar</Button>}
    >
      <Card style={{ maxWidth: "90vw" }} shadow="sm">
        <Card.Section>
          <ScrollArea>
            <Table striped highlightOnHover>
              <thead>
                <tr>
                  <th>Id</th>
                  <th>Nombre</th>
                  <th>Descripción</th>
                  <th>Categoría</th>
                  <th>Precio</th>
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
