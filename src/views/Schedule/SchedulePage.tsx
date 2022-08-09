import { Button, Grid, Group, Stack, Title } from "@mantine/core";
import { FileCheck } from "tabler-icons-react";
import LayourInnerDashboard from "../../components/layouts/LayoutInnerDashboard";
import Loading from "../../components/Loading";
import useSchedule from "../../hooks/useSchedule";
import daysOfWeek from "../../utils/constants/daysOfWeek.constants";
import DayScheduleSelect from "./DayScheduleSelect";

const SchedulePage = () => {
  const [
    scheduleState,
    addScheduleItems,
    updateScheduleItem,
    deleteScheduleItem,
    onSaveSchedule,
    isLoading,
    isUpdating,
  ] = useSchedule();

  if (isLoading) return <Loading />;

  return (
    <LayourInnerDashboard title="Horario">
      <Grid columns={24} gutter="xl">
        <Grid.Col span={24}>
          <Group position="apart">
            <Title order={4}>Horario ordinario</Title>
          </Group>
          {scheduleState && (
            <Stack spacing="xs" mt="lg">
              {daysOfWeek.map((data, index) => (
                <DayScheduleSelect
                  key={index}
                  icon={data.icon}
                  day={data.day}
                  dayOfWeek={index}
                  schedule={scheduleState.filter(
                    (schedule) =>
                      schedule.dayOfWeek === index && !schedule.delete
                  )}
                  addScheduleItems={addScheduleItems}
                  deleteScheduleItem={deleteScheduleItem}
                  updateScheduleItem={updateScheduleItem}
                />
              ))}
              <Button mt="xs" onClick={onSaveSchedule} disabled={isUpdating}>
                <FileCheck size={16} />
                Guardar
              </Button>
            </Stack>
          )}
        </Grid.Col>
      </Grid>
    </LayourInnerDashboard>
  );
};

export default SchedulePage;
