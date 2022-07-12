import { Container, Grid, Group, SegmentedControl, Title } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { ReportMoney, Ticket, User } from "tabler-icons-react";
import LayourInnerDashboard from "../../components/layouts/LayoutInnerDashboard";
import DataCard from "./DataCard";
import GraphCard from "./GraphCard";
import LastOrdersCard from "./LastOrdersCard";

const HomePage = () => {
  const largeScreen = useMediaQuery("(min-width: 900px)");

  return (
    <LayourInnerDashboard
      title="Inicio"
      rightAction={
        <SegmentedControl
          placeholder="Pick one"
          data={[
            { value: "admin", label: "Ahora" },
            { value: "manager", label: "Semana" },
            { value: "employee", label: "Mes" },
          ]}
        />
      }
    >
      <Grid columns={24}>
        <Grid.Col span={8}>
          <DataCard
            icon={<ReportMoney size={16} />}
            title="Ventas totales"
            value={10}
            previousValue={9}
            type="money"
          />
        </Grid.Col>
        <Grid.Col span={8}>
          <DataCard
            icon={<Ticket size={16} />}
            title="Ordenes totales"
            value={2}
            previousValue={1}
            type="number"
          />
        </Grid.Col>
        <Grid.Col span={8}>
          <DataCard
            icon={<User size={16} />}
            title="Nuevos clientes"
            value={2}
            previousValue={1}
            type="number"
          />
        </Grid.Col>
        <Grid.Col span={largeScreen ? 16 : 24}>
          <GraphCard />
        </Grid.Col>
        <Grid.Col span={largeScreen ? 8 : 24}>
          <LastOrdersCard />
        </Grid.Col>
      </Grid>
    </LayourInnerDashboard>
  );
};

export default HomePage;
