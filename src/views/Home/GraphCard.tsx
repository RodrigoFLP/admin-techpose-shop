import { Card, Group, Text, ThemeIcon, Title } from "@mantine/core";
import { FC, ReactElement } from "react";
import { ReportMoney } from "tabler-icons-react";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title as Titlechart,
  Tooltip,
  Legend,
  ChartData,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Titlechart,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top" as const,
    },
    title: {
      display: false,
      text: "Ventas",
    },
  },
};

const labels = ["January", "February", "March", "April", "May", "June", "July"];

export const data: ChartData<"line", number[], string> = {
  labels,
  datasets: [
    {
      borderWidth: 2,
      label: "Ventas",
      borderCapStyle: "round",

      data: [43, 100, 134, 54, 134, 73, 64],
      borderColor: "rgb(255, 99, 132)",
      backgroundColor: "rgba(255, 99, 132, 0.5)",
      tension: 0.2,
    },
  ],
};

const GraphCard: FC = () => {
  return (
    <Card shadow="xs">
      <Group>
        <Title order={4}>Histórico de ventas</Title>
      </Group>
      <Line options={options} data={data} />
    </Card>
  );
};

export default GraphCard;
