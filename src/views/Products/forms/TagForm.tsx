import { Button, Group, NumberInput, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { randomId } from "@mantine/hooks";
import { CurrencyDollar, Percentage } from "tabler-icons-react";
import { Tag } from "../../../interfaces";

interface Props {
  id?: string | number;
  value?: string;
  price?: number;
  ratio?: number;
  name?: string;
  onSave: (tag: Tag) => void;
  onDelete?: (id: string | number) => void;
}

const TagForm = ({ value, price, ratio, onSave, onDelete, id }: Props) => {
  const form = useForm({
    initialValues: {
      value: value ? value : "",
      price: price ? price : 0,
      ratio: ratio ? ratio : 0,
    },
    validate: {
      value: (value) =>
        !value || value.length < 2 ? "Mínimo 2 carácteres" : null,
      price: (value) => (value < 0 ? "Debes ingresar un precio" : null),
      ratio: (value) => (value < 0 ? "Debes ingresar un precio" : null),
    },
  });

  const handleSubmit = () => {
    if (form.validate().hasErrors) {
      return;
    }

    const values = form.values;

    if (id) {
      onSave({ ...values, id, name: "" });
    }

    if (!id) {
      console.log("corre");
      onSave({ ...values, id: randomId(), name: "" });
      console.log("handle");
    }
  };

  form.validate;

  return (
    <form>
      <TextInput
        required
        {...form.getInputProps("value")}
        label="Nombre"
        placeholder="Nombre"
        size="xs"
      />
      <NumberInput
        {...form.getInputProps("price")}
        label="Precio"
        placeholder="Precio"
        size="xs"
        precision={2}
        step={0.01}
        icon={<CurrencyDollar size={14} />}
      />
      <NumberInput
        {...form.getInputProps("ratio")}
        label="Ratio"
        placeholder="Ratio"
        size="xs"
        precision={2}
        step={0.01}
        icon={<Percentage size={14} />}
      />
      <Group>
        <Button mt="xs" size="xs" onClick={handleSubmit}>
          Guardar
        </Button>
        {onDelete && (
          <Button
            mt="xs"
            size="xs"
            color="red"
            onClick={() => id && onDelete(id)}
          >
            Eliminar
          </Button>
        )}
      </Group>
    </form>
  );
};

export default TagForm;
