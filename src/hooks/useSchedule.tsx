import {
  NewSchedulePayload,
  Schedule,
  ScheduleStatus,
  UpdateSchedulePayload,
} from "../interfaces";
import { schedules } from "../mocks/schedules";
import { useEffect, useState } from "react";
import { showNotification, updateNotification } from "@mantine/notifications";
import { Check } from "tabler-icons-react";

const useSchedule = (): [
  (Schedule & ScheduleStatus)[] | null,
  (scheduleItem: NewSchedulePayload) => void,
  (scheduleUpdate: UpdateSchedulePayload) => void,
  (id: number) => void,
  () => void
] => {
  const [scheduleState, setScheduleState] = useState<
    (Schedule & ScheduleStatus)[] | null
  >(null);

  const addScheduleItems = (scheduleItem: NewSchedulePayload) => {
    setScheduleState((prev) =>
      prev
        ? [
            ...prev,
            ...scheduleItem.daysOfWeek.map((day, index) => ({
              id: prev.length + index + 100,
              dayOfWeek: day,
              openTime: scheduleItem.openTime,
              closeTime: scheduleItem.closeTime,
              create: true,
              update: false,
              delete: false,
            })),
          ]
        : null
    );
  };

  const deleteScheduleItem = (id: number) => {
    setScheduleState((prev) => {
      if (!prev) {
        return null;
      }

      const isNewItem = prev.find((item) => item.id === id)?.create;

      if (!isNewItem) {
        return prev.map((item) =>
          item.id === id ? { ...item, update: false, delete: true } : item
        );
      }
      return prev.filter((item) => item.id !== id);
    });
  };

  const updateScheduleItem = (scheduleUpdate: UpdateSchedulePayload) => {
    setScheduleState((prev) => {
      if (!prev) {
        return null;
      }

      const isNewItem = prev.find(
        (item) => item.id === scheduleUpdate.id
      )?.create;

      if (!isNewItem) {
        return prev.map((item) =>
          item.id === scheduleUpdate.id
            ? {
                ...item,
                update: true,
                delete: false,
                create: false,
                openTime: scheduleUpdate.openTime
                  ? scheduleUpdate.openTime
                  : item.openTime,
                closeTime: scheduleUpdate.closeTime
                  ? scheduleUpdate.closeTime
                  : item.closeTime,
              }
            : item
        );
      }
      return prev.map((item) =>
        item.id === scheduleUpdate.id
          ? {
              ...item,
              update: false,
              delete: false,
              create: true,
              openTime: scheduleUpdate.openTime
                ? scheduleUpdate.openTime
                : item.openTime,
              closeTime: scheduleUpdate.closeTime
                ? scheduleUpdate.closeTime
                : item.closeTime,
            }
          : item
      );
    });
  };

  const onSaveSchedule = () => {
    //TODO: implement schedule mutation

    showNotification({
      id: "load-data",
      loading: true,
      title: "Guardando cambios",
      message: "Se está actualizando el horario",
      autoClose: false,
      disallowClose: true,
    });

    setTimeout(() => {
      updateNotification({
        id: "load-data",
        color: "teal",
        title: "Listo",
        message: "El horario ha sido actualizado con éxito",
        icon: <Check />,
        autoClose: 2000,
      });
    }, 1000);
  };

  useEffect(() => {
    //TODO: api call to retrieve schedule
    const result = schedules;
    setScheduleState(
      schedules.map((item) => ({
        ...item,
        create: false,
        update: false,
        delete: false,
      }))
    );
  }, []);

  return [
    scheduleState,
    addScheduleItems,
    updateScheduleItem,
    deleteScheduleItem,
    onSaveSchedule,
  ];
};

export default useSchedule;
