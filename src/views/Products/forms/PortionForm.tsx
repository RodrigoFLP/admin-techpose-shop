import { Button, Group, NumberInput, Stack, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { randomId } from "@mantine/hooks";
import { Portion } from "../../../interfaces";

interface Props {
  portion: Portion | null;
  onSave: (portion: Portion) => void;
  onDelete: (id: number | string) => void;
}

const PortionForm = ({ portion, onSave, onDelete }: Props) => {
  const form = useForm({
    initialValues: {
      name: portion ? portion.name : "",
      price: portion ? portion.price : 0,
    },
    validate: {
      name: (value) =>
        !value || value.length < 2 ? "Mínimo 2 carácteres" : null,
      price: (value) =>
        !value
          ? "Debe de ingresar un precio"
          : value < 0
          ? "Debe ingresar un número válido"
          : null,
    },
  });

  const handleSubmit = (values: typeof form.values) => {
    onSave({
      id: portion ? portion.id : randomId(),
      name: values.name!,
      price: values.price!,
      tagGroups: [],
    });
  };

  return (
    <form onSubmit={form.onSubmit(handleSubmit)}>
      <Stack>
        <TextInput
          required
          {...form.getInputProps("name")}
          label="Nombre"
          placeholder="Nombre"
        />
        <NumberInput
          required
          {...form.getInputProps("price")}
          label="Precio"
          placeholder="Precio"
          precision={2}
          step={0.01}
        />
        <Group>
          <Button type="submit">Guardar</Button>
          {portion && (
            <Button onClick={() => onDelete(portion.id)} color="red">
              Eliminar
            </Button>
          )}
        </Group>
      </Stack>
    </form>
  );
};

export default PortionForm;
