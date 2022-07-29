import { Button, Grid, Stack, Switch, TextInput } from "@mantine/core";
import { FileCheck } from "tabler-icons-react";
import LayourInnerDashboard from "../../components/layouts/LayoutInnerDashboard";

const OrdersConfigPage = () => {
  return (
    <LayourInnerDashboard
      title="Configuración ordenes"
      rightAction={<Button leftIcon={<FileCheck size={16} />}>Guardar</Button>}
    >
      <Grid columns={24} mt="xs">
        <Grid.Col span={12}>
          <Stack>
            <Switch label="Envíos a domicilio" />
            <Switch label="Recoger en sucursal" />
            <Switch label="Pagos en efectivo" />
            <Switch label="Pagos con Wompi" />
            <Switch label="Costo de envío" />
            <Switch label="Impuestos" />
          </Stack>
        </Grid.Col>
        <Grid.Col span={12}>
          <Stack>
            <TextInput label="Costo de envío" placeholder="Costo de envío" />
            <TextInput label="Impuesto" placeholder="Impuesto" />
          </Stack>
        </Grid.Col>
      </Grid>
    </LayourInnerDashboard>
  );
};

export default OrdersConfigPage;
