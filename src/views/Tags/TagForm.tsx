import { Button, Container, Grid, Image, Text, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { showNotification, updateNotification } from "@mantine/notifications";
import { useState } from "react";
import { Check, FileCheck, X } from "tabler-icons-react";
import ImageDropzone from "../../components/ImageDropzone";
import { Tag } from "../../interfaces/tag";
import { useAddTagMutation, useUpdateTagMutation } from "../../services/tags";
import { uploadImage } from "../../utils/uploadImage";

interface Props {
  tag?: Tag;
}

const TagForm = ({ tag }: Props) => {
  const [image, setImage] = useState<null | File>(null);

  const [updateTag, resultUpdate] = useUpdateTagMutation();
  const [addTag, resultAdd] = useAddTagMutation();

  const initialValues = tag
    ? {
        name: tag ? tag.name : "",
        description: tag ? tag.description : "",
      }
    : { name: "", description: "" };

  const form = useForm({
    initialValues,
    validate: {
      name: (value) =>
        !value || value.length < 2 ? "Mínimo 2 carácteres" : null,
      description: (value) =>
        !value || value.length < 2 ? "Mínimo 2 carácteres" : null,
    },
  });

  const handleSubmit = async (values: typeof form.values) => {
    try {
      let imageSrc;
      if (image) {
        showNotification({
          id: "load-tag",
          loading: true,
          title: "Subiendo Imagen",
          message: "Se está subiendo la imagen al servidor",
          autoClose: false,
          disallowClose: true,
        });
        imageSrc = await uploadImage(image);
        updateNotification({
          id: "load-tag",
          loading: true,
          title: "Actualizando categoría",
          message: "Se está actualizando",
          autoClose: false,
          disallowClose: true,
        });
      }

      if (!imageSrc) {
        showNotification({
          id: "load-product",
          loading: true,
          title: "Actualizando producto",
          message: "Se está actualizando el producto",
          autoClose: false,
          disallowClose: true,
        });
      }

      if (tag) {
        updateTag({
          id: tag.id,
          ...values,
          image: imageSrc ? imageSrc : tag.image,
        });
      }

      if (!tag) {
        addTag({ ...values, image: imageSrc ? imageSrc : "" });
      }

      updateNotification({
        id: "load-product",
        color: "teal",
        title: "Listo",
        message: "El producto se ha actualizado con éxito",
        icon: <Check />,
        autoClose: 2000,
      });
    } catch (error) {
      updateNotification({
        id: "load-product",
        color: "red",
        title: "Error",
        message: "No se ha podido realizar la acción",
        icon: <X />,
        autoClose: 2000,
      });
    }
  };

  return (
    <form onSubmit={form.onSubmit(handleSubmit)}>
      <Grid columns={2}>
        <Grid.Col span={1}>
          <TextInput {...form.getInputProps("name")} label="Título" />
          <TextInput
            {...form.getInputProps("description")}
            mt="xs"
            label="Descripción"
            mb="xs"
          />
          <Text mt="md" weight="bold" size="sm">
            Imagen
          </Text>
          <Grid columns={3} align="center" mt="0">
            <Grid.Col span={2}>
              <ImageDropzone onChange={setImage} image={image} />
            </Grid.Col>
            <Grid.Col span={1}>
              <Container>
                {tag?.image ? (
                  <Image
                    height={64}
                    src={tag.image}
                    radius="sm"
                    caption="Imagen actual"
                  />
                ) : (
                  <Text size="sm">No existe imagen</Text>
                )}
              </Container>
            </Grid.Col>
          </Grid>
        </Grid.Col>
      </Grid>
      <Button mt="md" leftIcon={<FileCheck />} type="submit">
        Guardar
      </Button>
    </form>
  );
};

export default TagForm;
