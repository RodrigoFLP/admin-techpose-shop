import { ActionIcon, Divider, Group, Stack, Switch, Text } from "@mantine/core";
import { TimeInput } from "@mantine/dates";
import { useMediaQuery } from "@mantine/hooks";
import { ReactElement } from "react";
import { Clock, Plus, Trash } from "tabler-icons-react";
import {
  NewSchedulePayload,
  Schedule,
  UpdateSchedulePayload,
} from "../../interfaces";

interface Props {
  day: string;
  icon: ReactElement;
  schedule: Schedule[];
  addScheduleItems: (scheduleItem: NewSchedulePayload) => void;
  updateScheduleItem: (ScheduleItem: UpdateSchedulePayload) => void;
  deleteScheduleItem: (id: number) => void;
}

const DaySelector = ({
  day,
  icon,
  schedule,
  addScheduleItems,
  deleteScheduleItem,
  updateScheduleItem,
}: Props) => {
  const largeScreen = useMediaQuery("(min-width: 800px)");

  return (
    <>
      <Divider />
      <Group position="apart">
        {largeScreen ? <Text size="sm">{day}</Text> : icon}
        <Stack>
          {schedule.map((scheduleItem, index) => (
            <Group key={scheduleItem.id}>
              <Switch size={largeScreen ? "sm" : "xs"} />
              <TimeInput
                icon={<Clock size={16} />}
                size="xs"
                value={new Date(scheduleItem.openTime)}
                onChange={(value) =>
                  updateScheduleItem({ id: scheduleItem.id, openTime: value })
                }
              />
              <Text size="sm">a</Text>
              <TimeInput
                icon={<Clock size={16} />}
                size="xs"
                value={new Date(scheduleItem.closeTime)}
                onChange={(value) =>
                  updateScheduleItem({ id: scheduleItem.id, closeTime: value })
                }
              />
              {index === 0 ? (
                <ActionIcon
                  size={largeScreen ? "md" : "xs"}
                  onClick={() =>
                    addScheduleItems({
                      daysOfWeek: [scheduleItem.dayOfWeek],
                      openTime: new Date(),
                      closeTime: new Date(),
                    })
                  }
                >
                  <Plus size={16} />
                </ActionIcon>
              ) : (
                <ActionIcon
                  size={largeScreen ? "md" : "xs"}
                  onClick={() => deleteScheduleItem(scheduleItem.id)}
                >
                  <Trash size={16} />
                </ActionIcon>
              )}
            </Group>
          ))}
        </Stack>
      </Group>
    </>
  );
};

export default DaySelector;

// import { ActionIcon, Divider, Group, Stack, Switch, Text } from "@mantine/core";
// import { TimeInput } from "@mantine/dates";
// import { useMediaQuery } from "@mantine/hooks";
// import { ReactElement, ReactNode, useEffect, useState } from "react";
// import { Clock, LetterL, Plus, Trash } from "tabler-icons-react";
// import { NewSchedulePayload, Schedule, ScheduleStatus } from "../../interfaces";
// import dayjs from "dayjs";

// interface Props {
//   day: string;
//   icon: ReactElement;
//   schedule: Schedule[];
// }

// const DaySelector = ({ day, icon, schedule }: Props) => {
//   const largeScreen = useMediaQuery("(min-width: 800px)");

//   const [scheduleState, setScheduleState] = useState<
//     (Schedule & ScheduleStatus)[] | null
//   >(null);

//   const addScheduleItems = (scheduleItem: NewSchedulePayload) => {
//     setScheduleState((prev) =>
//       prev
//         ? [
//             ...prev,
//             ...scheduleItem.daysOfWeek.map((day, index) => ({
//               id: prev.length + index + 100,
//               dayOfWeek: day,
//               openTime: scheduleItem.openTime,
//               closeTime: scheduleItem.closeTime,
//               create: true,
//               update: false,
//               delete: false,
//             })),
//           ]
//         : null
//     );
//   };

//   const deleteScheduleItem = (id: number) => {
//     setScheduleState((prev) =>
//       prev ? [...prev.filter((item) => item.id !== id)] : null
//     );
//   };

//   // const updateScheduleItemOpenTime = (scheduleItem: NewSchedule) => {
//   //   setScheduleState((prev) =>
//   //     prev
//   //       ? [
//   //           ...prev,
//   //           {
//   //             ...scheduleItem,
//   //             id: 1000 + prev.length,

//   //             patch: false,
//   //             create: true,
//   //           },
//   //         ]
//   //       : null
//   //   );
//   // };

//   useEffect(() => {
//     //TODO: api call to retrieve schedule
//     const result = schedule;
//     setScheduleState(
//       schedule.map((item) => ({
//         ...item,
//         create: false,
//         update: false,
//         delete: false,
//       }))
//     );
//   }, []);

//   return (
//     <>
//       <Divider />
//       <Group position="apart">
//         {largeScreen ? <Text size="sm">{day}</Text> : icon}
//         <Stack>
//           {scheduleState &&
//             scheduleState.map((scheduleItem, index) => (
//               <Group key={scheduleItem.id}>
//                 <Switch size={largeScreen ? "sm" : "xs"} />
//                 <TimeInput
//                   icon={<Clock size={16} />}
//                   size="xs"
//                   value={new Date(scheduleItem.openTime)}
//                   // onChange={(value) => {
//                   //   console.log(value);
//                   // }}
//                 />
//                 <Text size="sm">a</Text>
//                 <TimeInput
//                   icon={<Clock size={16} />}
//                   size="xs"
//                   value={new Date(scheduleItem.closeTime)}
//                 />
//                 {index === 0 ? (
//                   <ActionIcon
//                     size={largeScreen ? "md" : "xs"}
//                     onClick={() =>
//                       addScheduleItems({
//                         daysOfWeek: [scheduleItem.dayOfWeek],
//                         openTime: new Date(),
//                         closeTime: new Date(),
//                       })
//                     }
//                   >
//                     <Plus size={16} />
//                   </ActionIcon>
//                 ) : (
//                   <ActionIcon
//                     size={largeScreen ? "md" : "xs"}
//                     onClick={() => deleteScheduleItem(scheduleItem.id)}
//                   >
//                     <Trash size={16} />
//                   </ActionIcon>
//                 )}
//               </Group>
//             ))}
//         </Stack>
//       </Group>
//     </>
//   );
// };

// export default DaySelector;
