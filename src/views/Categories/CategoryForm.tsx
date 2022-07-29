import { Button, Grid, TextInput } from "@mantine/core";
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
          <ImageDropzone image={image} onChange={setImage} />
        </Grid.Col>
      </Grid>
      <Button mt="md" leftIcon={<FileCheck />} type="submit">
        Guardar
      </Button>
    </form>
  );
};

export default CategoryForm;
