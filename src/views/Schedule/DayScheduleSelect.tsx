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
  dayOfWeek: number;
  icon: ReactElement;
  schedule: Schedule[];
  addScheduleItems: (scheduleItem: NewSchedulePayload) => void;
  updateScheduleItem: (ScheduleItem: UpdateSchedulePayload) => void;
  deleteScheduleItem: (id: number) => void;
}

const DayScheduleSelect = ({
  day,
  dayOfWeek,
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
        <Group>
          <ActionIcon
            size={largeScreen ? "md" : "xs"}
            onClick={() =>
              addScheduleItems({
                daysOfWeek: [dayOfWeek],
                isActive: true,
                openTime: new Date(),
                closeTime: new Date(),
              })
            }
          >
            <Plus size={16} />
          </ActionIcon>
          {largeScreen ? <Text size="sm">{day}</Text> : icon}
        </Group>
        <Stack>
          {schedule.length > 0 &&
            schedule.map((scheduleItem, index) => (
              <Group key={scheduleItem.id}>
                <Switch
                  size={largeScreen ? "sm" : "xs"}
                  checked={scheduleItem.isActive}
                  onChange={(event) =>
                    updateScheduleItem({
                      id: scheduleItem.id,
                      isActive: event.currentTarget.checked,
                    })
                  }
                />
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
                    updateScheduleItem({
                      id: scheduleItem.id,
                      closeTime: value,
                    })
                  }
                />

                <ActionIcon
                  size={largeScreen ? "md" : "xs"}
                  onClick={() => deleteScheduleItem(scheduleItem.id)}
                >
                  <Trash size={16} />
                </ActionIcon>
              </Group>
            ))}
        </Stack>
      </Group>
    </>
  );
};

export default DayScheduleSelect;
