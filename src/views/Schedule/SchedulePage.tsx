import { Button, Grid, Group, Stack, Title } from "@mantine/core";
import { FileCheck } from "tabler-icons-react";
import LayourInnerDashboard from "../../components/layouts/LayoutInnerDashboard";
import DaySelector from "./DaySelector";
import useSchedule from "../../hooks/useSchedule";
import daysOfWeek from "../../utils/constants/daysOfWeek.constants";

const SchedulePage = () => {
  const [
    scheduleState,
    addScheduleItems,
    updateScheduleItem,
    deleteScheduleItem,
    onSaveSchedule,
  ] = useSchedule();

  return (
    <LayourInnerDashboard title="Horario">
      <Grid columns={24} gutter="xl">
        <Grid.Col span={24}>
          <Group position="apart">
            <Title order={4}>Horario ordinario</Title>
            {/* <Popover
              opened={showNewPopover}
              onClose={() => setShowNewPopover(false)}
              target={
                <Button size="xs" onClick={() => setShowNewPopover(true)}>
                  <Plus size={16} />
                  Agregar
                </Button>
              }
              width={260}
              position="bottom"
              withArrow
            >
              <div style={{ display: "flex" }}>
                <Title>
                  Thanks for stopping by and checking Mantine, you are awesome!
                </Title>
              </div>
            </Popover> */}
          </Group>
          {scheduleState && (
            <Stack spacing="xs" mt="lg">
              {daysOfWeek.map((data, index) => (
                <DaySelector
                  key={index}
                  icon={data.icon}
                  day={data.day}
                  schedule={scheduleState.filter(
                    (schedule) =>
                      schedule.dayOfWeek === index && !schedule.delete
                  )}
                  addScheduleItems={addScheduleItems}
                  deleteScheduleItem={deleteScheduleItem}
                  updateScheduleItem={updateScheduleItem}
                />
              ))}
              <Button size="xs" mt="xs" onClick={onSaveSchedule}>
                <FileCheck size={16} />
                Guardar
              </Button>
            </Stack>
          )}
        </Grid.Col>
        {/* <Grid.Col span={24}>
          <Title order={4}>Horario extraordinario</Title>
          <Stack spacing="xs" mt="lg"></Stack>
        </Grid.Col> */}
      </Grid>
    </LayourInnerDashboard>
  );
};

export default SchedulePage;

// import { Button, Grid, Group, Stack, Title } from "@mantine/core";
// import {
//   LetterD,
//   LetterJ,
//   LetterL,
//   LetterM,
//   LetterS,
//   LetterV,
//   Plus,
// } from "tabler-icons-react";
// import LayourInnerDashboard from "../../components/layouts/LayoutInnerDashboard";
// import DaySelector from "./DaySelector";
// import { useMediaQuery } from "@mantine/hooks";
// import {
//   NewSchedulePayload,
//   Schedule,
//   ScheduleStatus,
//   UpdateSchedulePayload,
// } from "../../interfaces";
// import { schedules } from "../../mocks/schedules";
// import React, { useEffect, useState } from "react";

// const daysSelectorData = [
//   {
//     day: "Lunes",
//     icon: <LetterL size={16} />,
//   },
//   {
//     day: "Martes",
//     icon: <LetterM size={16} />,
//   },
//   {
//     day: "Miércoles",
//     icon: <LetterM size={16} />,
//   },
//   {
//     day: "Jueves",
//     icon: <LetterJ size={16} />,
//   },
//   {
//     day: "Viernes",
//     icon: <LetterV size={16} />,
//   },
//   {
//     day: "Sábado",
//     icon: <LetterS size={16} />,
//   },
//   {
//     day: "Domingo",
//     icon: <LetterD size={16} />,
//   },
// ];

// const SchedulePage = () => {
//   const largeScreen = useMediaQuery("(min-width: 1000px)");

//   return (
//     <LayourInnerDashboard title="Horario">
//       <Grid columns={24} gutter="xl">
//         <Grid.Col span={24}>
//           <Group position="apart">
//             <Title order={4}>Horario ordinario</Title>
//             <Button size="xs">
//               <Plus size={16} />
//               Agregar
//             </Button>
//           </Group>
//           {schedules && (
//             <Stack spacing="xs" mt="lg">
//               {daysSelectorData.map((data, index) => (
//                 <DaySelector
//                   key={index}
//                   icon={data.icon}
//                   day={data.day}
//                   schedule={schedules.filter(
//                     (schedule) => schedule.dayOfWeek === index
//                   )}
//                   // addScheduleItems={addScheduleItems}
//                   // deleteScheduleItem={deleteScheduleItem}
//                 />
//               ))}
//             </Stack>
//           )}
//         </Grid.Col>
//         <Grid.Col span={24}>
//           <Title order={4}>Horario extraordinario</Title>
//           <Stack spacing="xs" mt="lg"></Stack>
//         </Grid.Col>
//       </Grid>
//     </LayourInnerDashboard>
//   );
// };

// export default SchedulePage;
