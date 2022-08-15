import {
  Button,
  Container,
  Grid,
  Image,
  NumberInput,
  Select,
  Stack,
  Switch,
  Text,
  TextInput,
  Title,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { showNotification, updateNotification } from "@mantine/notifications";
import { useState } from "react";
import { CurrencyDollar, X } from "tabler-icons-react";
import ImageDropzone from "../../components/ImageDropzone";
import { Tag } from "../../interfaces/tag";
import {
  PreferenceFormValues,
  Store,
  StoreMutation,
} from "../../interfaces/store";
import { uploadImage } from "../../utils/uploadImage";

type PreferencesFormProps = PreferenceFormValues & {
  onSave: (values: StoreMutation) => void;
  tags: Tag[];
};

export const PreferencesForm = ({
  name,
  state,
  city,
  addressLine1,
  addressLine2,
  addressReference,
  phoneNumber,
  whatsappNumber,
  facebook,
  instagram,
  isDeliveryEnabled,
  isPickupEnabled,
  isTaxEnabled,
  defaultHomeTagCategory,
  deliveryMin,
  isCashPaymentEnabled,
  isWompiPaymentEnabled,
  isDeliveryCostEnabled,
  isSchedulingEnabled,
  deliveryCost,
  headerImage,
  headerUrl,
  tags,
  onSave,
}: PreferencesFormProps) => {
  const form = useForm({
    initialValues: {
      name,
      state,
      city,
      addressLine1,
      addressLine2,
      addressReference,
      phoneNumber,
      whatsappNumber,
      defaultHomeTagCategoryId: defaultHomeTagCategory
        ? defaultHomeTagCategory.id.toString()
        : "",
      facebook,
      instagram,
      isDeliveryEnabled,
      isPickupEnabled,
      isTaxEnabled,
      isCashPaymentEnabled,
      isWompiPaymentEnabled,
      isDeliveryCostEnabled,
      isSchedulingEnabled,
      deliveryCost,
      headerImage,
      deliveryMin,
      headerUrl,
    },
  });

  console.log(deliveryCost);

  const [image, setImage] = useState<null | File>(null);

  const handleSubmit = async (values: typeof form.values) => {
    try {
      let imageSrc;
      if (image) {
        showNotification({
          id: "load-data",
          loading: true,
          title: "Subiendo Imagen",
          message: "Se está subiendo la imagen al servidor",
          autoClose: false,
          disallowClose: true,
        });
        imageSrc = await uploadImage(image);
      }

      onSave({
        ...values,
        headerImage: imageSrc || headerImage,
        defaultHomeTagCategoryId: +values.defaultHomeTagCategoryId,
      });
    } catch (error) {
      updateNotification({
        id: "load-data",
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
      <Grid columns={24} gutter={40}>
        <Grid.Col xs={24} md={12}>
          <Stack>
            <TextInput
              {...form.getInputProps("name")}
              label="Nombre"
              placeholder="Nombre"
            />
            <TextInput
              {...form.getInputProps("state")}
              label="Departamento"
              placeholder="Departamento"
            />
            <TextInput
              {...form.getInputProps("city")}
              label="Ciudad"
              placeholder="Ciudad"
            />
            <TextInput
              {...form.getInputProps("addressReference")}
              label="Referencia"
              placeholder="Referencia"
            />
            <TextInput
              {...form.getInputProps("phoneNumber")}
              label="Número de télefono"
              placeholder="Número de télefono"
            />
            <TextInput
              {...form.getInputProps("whatsappNumber")}
              label="Número de whatsapp"
              placeholder="Número de whatsapp"
            />
            <TextInput
              {...form.getInputProps("facebook")}
              label="Facebook"
              placeholder="Facebook"
            />
            <TextInput
              {...form.getInputProps("instagram")}
              label="Instagram"
              placeholder="Instagram"
            />
            <TextInput
              type="number"
              {...form.getInputProps("deliveryCost")}
              defaultValue={form.values.deliveryCost}
              precision={2}
              label="Costo de envío"
              icon={<CurrencyDollar />}
              placeholder="Costo de envío"
            />
            <TextInput
              type="number"
              {...form.getInputProps("deliveryMin")}
              defaultValue={form.values.deliveryMin}
              precision={2}
              label="Mínimo de compra"
              icon={<CurrencyDollar />}
              placeholder="Mínimo de compra"
            />
          </Stack>
        </Grid.Col>
        <Grid.Col xs={24} md={12}>
          <Stack>
            <Title order={5}>Preferencias generales</Title>
            <Switch
              {...form.getInputProps("isDeliveryEnabled")}
              checked={form.values.isDeliveryEnabled}
              label="Envíos a domicilio"
            />
            <Switch
              {...form.getInputProps("isPickupEnabled")}
              checked={form.values.isPickupEnabled}
              label="Recoger en sucursal"
            />
            <Switch
              {...form.getInputProps("isCashPaymentEnabled")}
              checked={form.values.isCashPaymentEnabled}
              label="Pagos en efectivo"
            />
            <Switch
              {...form.getInputProps("isWompiPaymentEnabled")}
              checked={form.values.isWompiPaymentEnabled}
              label="Pagos con Wompi"
            />
            <Switch
              {...form.getInputProps("isDeliveryCostEnabled")}
              checked={form.values.isDeliveryCostEnabled}
              label="Costo de envío"
            />
            <Switch
              {...form.getInputProps("isTaxEnabled")}
              checked={form.values.isTaxEnabled}
              label="Impuestos"
            />
            <Title order={5} mt="xl">
              Cabecera
            </Title>
            <TextInput
              {...form.getInputProps("headerUrl")}
              mt="xs"
              label="Enlace de cabecera"
              placeholder="Enlace"
              mb={0}
            />
            <Text mt="xs" weight="bold" size="sm">
              Imagen
            </Text>
            <Grid columns={3} align="center" mt="0">
              <Grid.Col span={2}>
                <ImageDropzone onChange={setImage} image={image} />
              </Grid.Col>
              <Grid.Col span={1}>
                <Container>
                  {headerImage ? (
                    <Image
                      height={64}
                      src={headerImage}
                      radius="sm"
                      caption="Imagen actual"
                    />
                  ) : (
                    <Text size="sm">No existe imagen</Text>
                  )}
                </Container>
              </Grid.Col>
            </Grid>
            <Select
              {...form.getInputProps("defaultHomeTagCategoryId")}
              mt={"xs"}
              label="Tag"
              placeholder="Elige una"
              data={[
                ...tags.map((tag) => ({
                  value: `${tag.id}`,
                  label: tag.name,
                })),
              ]}
              clearable
            />
          </Stack>
        </Grid.Col>
      </Grid>
      <Button type="submit" mt="xl" fullWidth>
        Guardar
      </Button>
    </form>
  );
};

export default PreferencesForm;
