import {
  Badge,
  Button,
  Card,
  Grid,
  Group,
  MultiSelect,
  NumberInput,
  Popover,
  Stack,
  Switch,
  Text,
  TextInput,
  Title,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { randomId } from "@mantine/hooks";
import { useEffect, useState } from "react";
import { Portion, Tag, TagGroup } from "../../../interfaces";
import TagCard from "../TagCard";
import TagForm from "./TagForm";

interface Props {
  tagGroup: TagGroup | null;
  onSave: (tagGroup: TagGroup) => void;
  onDelete: (id: number | string) => void;
  portions: Portion[];
}

const TagGroupsForm = ({ tagGroup, portions, onSave, onDelete }: Props) => {
  const [openedTagPop, setOpenedTagPop] = useState<number | null>(null);

  const [tags, setTags] = useState<null | Tag[]>(null);

  useEffect(() => {
    if (tagGroup) {
      setTags(tagGroup.tags);
    }
  }, []);

  const deleteTag = (id: string | number) => {
    setTags((prev) => (prev ? prev.filter((tag) => tag.id !== id) : null));
    setOpenedTagPop(null);
  };

  const updateTag = (updatedTag: Tag) => {
    if (tags) {
      setTags((prev) =>
        prev!.map((tag) => (tag.id === updatedTag.id ? updatedTag : tag))
      );
    }
    setOpenedTagPop(null);
  };

  const addTag = (newTag: Omit<Tag, "id">) => {
    setTags((prev) =>
      prev
        ? [...prev, { ...newTag, id: randomId() }]
        : [{ ...newTag, id: randomId() }]
    );
    setOpenedTagPop(null);
  };

  const form = useForm({
    initialValues: {
      name: tagGroup ? tagGroup.name : "",
      max: tagGroup ? tagGroup.max : 0,
      min: tagGroup ? tagGroup.min : 0,
      portions: tagGroup
        ? tagGroup.portions.map((portionId) => `${portionId}`)
        : [],
    },
    validate: {
      name: (value) =>
        !value || value.length < 2 ? "Mínimo 2 carácteres" : null,
      max: (value) =>
        value === null
          ? "Debe de ingresar un máximo"
          : value < 0
          ? "Debe ingresar un número válido"
          : null,
      min: (value) =>
        value === null
          ? "Debe de ingresar un mínimo"
          : value < 0
          ? "Debe ingresar un número válido"
          : null,
    },
  });

  const handleSubmit = (values: typeof form.values) => {
    onSave({
      id: tagGroup ? tagGroup.id : randomId(),
      name: values.name!,
      portions: values.portions.map((portionId) => portionId)!,
      max: values.max!,
      min: values.min!,
      hidden: false,
      tags: tags ? tags.map((tag) => ({ ...tag, name: values.name })) : [],
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
          {...form.getInputProps("max")}
          label="Máximo"
          placeholder="Máximo"
        />
        <NumberInput
          required
          {...form.getInputProps("min")}
          label="Mínimo"
          placeholder="Mínimo"
        />
        <MultiSelect
          required
          {...form.getInputProps("portions")}
          label="Porciones a quién pertenece:"
          placeholder="Elige"
          data={portions.map((portion) => ({
            value: `${portion.id}`,
            label: portion.name,
          }))}
        />
        <Switch label="Mostrar" />
        <Group mt="xs" position="apart">
          <Title order={6}>Tags</Title>
          <Popover
            opened={openedTagPop === -1}
            onClose={() => setOpenedTagPop(null)}
            position="top"
            withArrow
          >
            <Popover.Target>
              <Button size="xs" onClick={() => setOpenedTagPop(-1)}>
                Añadir
              </Button>
            </Popover.Target>
            <Popover.Dropdown>
              <TagForm name={form.values.name} onSave={addTag} />
            </Popover.Dropdown>
          </Popover>
        </Group>
        <Stack>
          {tags?.map((tag, index) => (
            <Popover
              key={tag.id}
              opened={openedTagPop === index}
              onClose={() => setOpenedTagPop(null)}
              position="top"
              withArrow
            >
              <Popover.Target>
                <TagCard
                  onClick={() => setOpenedTagPop(index)}
                  value={tag.value}
                  price={tag.price}
                  ratio={tag.ratio}
                />
              </Popover.Target>
              <Popover.Dropdown>
                <TagForm
                  {...tag}
                  name={form.values.name}
                  onSave={updateTag}
                  onDelete={deleteTag}
                />
              </Popover.Dropdown>
            </Popover>
          ))}
        </Stack>
        <Group>
          <Button type="submit">Guardar</Button>
          {tagGroup && (
            <Button onClick={() => onDelete(tagGroup.id)} color="red">
              Eliminar
            </Button>
          )}
        </Group>
      </Stack>
    </form>
  );
};

export default TagGroupsForm;
