import { NumberInput, Select, Textarea, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { CurrencyDollar } from "tabler-icons-react";
import { Category } from "../../../interfaces";

interface Props {
  initialValues: initialValues;
}

interface initialValues {
  title: string;
  description: string;
  category: Category;
  price: number;
}

const ProductForm = ({ initialValues }: Props) => {
  const form = useForm({
    initialValues: { ...initialValues },
  });

  const handleSubmit = async (values: typeof form.values) => {
    if (form.validate()) {
      throw new Error("invalid");
    }

    return values;
  };

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
      <NumberInput
        {...form.getInputProps("price")}
        mt={"xs"}
        label="Precio"
        placeholder="Precio"
        min={0}
        precision={2}
        step={0.01}
        icon={<CurrencyDollar size={16} />}
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
