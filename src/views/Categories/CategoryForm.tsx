import { Button, Container, Grid, Image, Text, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useState } from "react";
import { FileCheck } from "tabler-icons-react";
import ImageDropzone from "../../components/ImageDropzone";
import { Category } from "../../interfaces";

interface Props {
  category?: Category;
}

const CategoryForm = ({ category }: Props) => {
  const [image, setImage] = useState<null | File>(null);

  const form = useForm({
    initialValues: {
      name: category ? category.name : "",
      description: category ? category.description : "",
    },
    validate: {
      name: (value) =>
        !value || value.length < 2 ? "Mínimo 2 carácteres" : null,
      description: (value) =>
        !value || value.length < 2 ? "Mínimo 2 carácteres" : null,
    },
  });

  const handleSubmit = (values: typeof form.values) => {
    alert("Guardando");
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
                {category?.image ? (
                  <Image
                    height={64}
                    src={category.image}
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

export default CategoryForm;
