import { Select, Textarea, TextInput } from "@mantine/core";
import { useForm } from "@mantine/hooks";

interface Props {
  initialValues: initialValues;
}

interface initialValues {
  title: string;
  description: string;
  category: string;
}

const ProductForm = ({ initialValues }: Props) => {
  const form = useForm({
    initialValues: { ...initialValues },
  });

  const handleSubmit = async (values: typeof form.values) => {};

  return (
    <form onSubmit={form.onSubmit(handleSubmit)}>
      <TextInput
        {...form.getInputProps("title")}
        mt={"xs"}
        label="Título"
        placeholder="Título"
      />
      <Textarea
        {...form.getInputProps("description")}
        mt={"xs"}
        label="Descripción"
        placeholder="Descripción"
      />
      <Select
        {...form.getInputProps("category")}
        mt={"xs"}
        label="Categoría"
        placeholder="Elige una"
        data={[
          { value: "Entradas", label: "Entradas" },
          { value: "Tacos", label: "Tacos" },
          { value: "Tortas", label: "Tortas" },
          { value: "Bebidas", label: "Bebidas" },
        ]}
      />
    </form>
  );
};

export default ProductForm;
