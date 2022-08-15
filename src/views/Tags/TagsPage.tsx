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
import { Tag } from "../../interfaces/tag";
import { useGetAllTagsQuery, useRemoveTagMutation } from "../../services/tags";

const TagPage = () => {
  const {
    data: tags,
    isLoading,
    isUninitialized,
    isError,
  } = useGetAllTagsQuery();

  const [tagToRemove, setTagToRemove] = useState<Tag | null>(null);

  const [removeTag, removed] = useRemoveTagMutation();

  const handleRemoveTag = async (id: number) => {
    try {
      showNotification({
        id: "delete-tag",
        loading: true,
        title: "Eliminando categoría",
        message: "Se está eliminando categoría",
        autoClose: false,
        disallowClose: true,
      });
      await removeTag(id).unwrap();
      updateNotification({
        id: "delete-tag",
        color: "teal",
        title: "Listo",
        message: "Categoria se ha elinado con éxito",
        icon: <Check />,
        autoClose: 2000,
      });
      setTagToRemove(null);
    } catch (err) {
      updateNotification({
        id: "delete-tag",
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

  const rows = tags.map((tag) => (
    <tr key={tag.id}>
      <td>{tag.id}</td>
      <td>{tag.name}</td>
      <td>{tag.description}</td>
      <td>{true ? "Sí" : "No"}</td>
      <td>
        <Link to={`/dashboard/tags/editar/${tag.id}`}>
          <ActionIcon>
            <Edit size={16} />
          </ActionIcon>
        </Link>
      </td>
      <td>
        <ActionIcon onClick={() => setTagToRemove(tag)}>
          <Trash size={16} />
        </ActionIcon>
      </td>
    </tr>
  ));

  return (
    <LayourInnerDashboard
      title="Tags"
      rightAction={
        <Link to={`/dashboard/tags/editar`}>
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
      {tagToRemove && (
        <Modal
          opened={!!tagToRemove}
          onClose={() => setTagToRemove(null)}
          title={`¿Quieres eliminar ${tagToRemove.name}?`}
        >
          <Button color="red" onClick={() => handleRemoveTag(tagToRemove.id)}>
            Eliminar
          </Button>
        </Modal>
      )}
    </LayourInnerDashboard>
  );
};

export default TagPage;
