import { Button } from "@mantine/core";
import { Plus } from "tabler-icons-react";
import LayourInnerDashboard from "../../components/layouts/LayoutInnerDashboard";

const OrdersConfigPage = () => {
  return (
    <LayourInnerDashboard
      title="Configuración ordenes"
      rightAction={<Button leftIcon={<Plus size={16} />}>Agregar</Button>}
    >
      {}
    </LayourInnerDashboard>
  );
};

export default OrdersConfigPage;
