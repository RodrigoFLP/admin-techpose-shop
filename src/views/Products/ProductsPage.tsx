import {
  ActionIcon,
  Button,
  Card,
  Center,
  Container,
  Loader,
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
import { Product } from "../../interfaces";
import {
  useGetAllQuery,
  useRemoveProductMutation,
} from "../../services/products";
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

  const [removeProduct, removed] = useRemoveProductMutation();

  const [productToRemove, setProductToRemove] = useState<Product | null>(null);

  const handleRemoveProduct = async (id: number) => {
    try {
      showNotification({
        id: "delete-product",
        loading: true,
        title: "Eliminando el producto",
        message: "Se está eliminando el producto",
        autoClose: false,
        disallowClose: true,
      });
      await removeProduct(id).unwrap();
      updateNotification({
        id: "delete-product",
        color: "teal",
        title: "Listo",
        message: "El producto se ha elinado con éxito",
        icon: <Check />,
        autoClose: 2000,
      });
      setProductToRemove(null);
    } catch (err) {
      updateNotification({
        id: "delete-product",
        color: "red",
        title: "Error",
        message: "No se ha podido eliminar el producto",
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

  const rows = products.map((element) => (
    <tr key={element.id}>
      <td>{element.id}</td>
      <td>{element.name}</td>
      <td>{element.description}</td>
      <td>
        {element.categories.length > 0
          ? element.categories[0].name
          : "Sin asignar"}
      </td>
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
        <ActionIcon onClick={() => setProductToRemove(element)}>
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
      {productToRemove && (
        <Modal
          opened={!!productToRemove}
          onClose={() => setProductToRemove(null)}
          title={`¿Quieres eliminar ${productToRemove.name}?`}
        >
          <Button
            color="red"
            onClick={() => handleRemoveProduct(productToRemove.id)}
          >
            Eliminar
          </Button>
        </Modal>
      )}
    </LayourInnerDashboard>
  );
};

export default ProductsPage;
