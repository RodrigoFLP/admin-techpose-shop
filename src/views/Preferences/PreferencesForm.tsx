import {
  Button,
  Grid,
  NumberInput,
  Stack,
  Switch,
  TextInput,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { CurrencyDollar } from "tabler-icons-react";
import { PreferenceFormValues, Store } from "../../interfaces/store";

type PreferencesFormProps = PreferenceFormValues & {
  onSave: (values: PreferenceFormValues) => void;
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
  isCashPaymentEnabled,
  isWompiPaymentEnabled,
  isDeliveryCostEnabled,
  isSchedulingEnabled,
  deliveryCost,
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
    },
  });

  console.log(deliveryCost);
  const handleSubmit = (values: typeof form.values) => {
    onSave(values);
  };

  return (
    <form onSubmit={form.onSubmit(handleSubmit)}>
      <Grid columns={24} gutter="xl">
        <Grid.Col xs={24} md={12}>
          <Stack>
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
          </Stack>
        </Grid.Col>
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
