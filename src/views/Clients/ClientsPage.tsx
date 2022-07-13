import { Button } from "@mantine/core";
import { Plus } from "tabler-icons-react";
import LayourInnerDashboard from "../../components/layouts/LayoutInnerDashboard";

const ClientsPage = () => {
  return (
    <LayourInnerDashboard
      title="Clientes"
      rightAction={<Button leftIcon={<Plus size={16} />}>Agregar</Button>}
    >
      {}
    </LayourInnerDashboard>
  );
};

export default ClientsPage;
