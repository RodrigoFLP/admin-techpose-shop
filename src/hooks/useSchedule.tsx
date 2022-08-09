import {
  NewSchedulePayload,
  Schedule,
  ScheduleStatus,
  UpdateSchedulePayload,
} from "../interfaces";
import { useEffect, useState } from "react";
import { showNotification, updateNotification } from "@mantine/notifications";
import { Check, X } from "tabler-icons-react";
import {
  useGetAllQuery,
  useUpdateScheduleMutation,
} from "../services/schedules";

const useSchedule = () => {
  const {
    data: schedules,
    isSuccess,
    isLoading: isScheduleLoading,
    isUninitialized: isScheduleUnitialized,
  } = useGetAllQuery();

  const [updateSchedule, result] = useUpdateScheduleMutation();

  const isLoading = isScheduleLoading || isScheduleUnitialized;

  useEffect(() => {
    if (isSuccess)
      setScheduleState(
        schedules.map((item) => ({
          ...item,
          create: false,
          update: false,
          delete: false,
        }))
      );
  }, [isSuccess]);

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
              isActive: scheduleItem.isActive,
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

      //if the item is already persisted, set delete to true, otherwise, delete directly from local state
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

      console.log(scheduleUpdate.isActive);

      //if the item is already persisted, set update to true, otherwise, it preserves only create to true
      if (!isNewItem) {
        return prev.map((item) =>
          item.id === scheduleUpdate.id
            ? {
                ...item,
                update: true,
                delete: false,
                create: false,
                isActive:
                  scheduleUpdate.isActive !== undefined
                    ? scheduleUpdate.isActive
                    : item.isActive,
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
              isActive:
                scheduleUpdate.isActive !== undefined
                  ? scheduleUpdate.isActive
                  : item.isActive,
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

  const onSaveSchedule = async () => {
    try {
      showNotification({
        id: "load-data",
        loading: true,
        title: "Guardando cambios",
        message: "Se está actualizando el horario",
        autoClose: false,
        disallowClose: true,
      });
      await updateSchedule(scheduleState).unwrap();
      updateNotification({
        id: "load-data",
        color: "teal",
        title: "Listo",
        message: "El horario ha sido actualizado con éxito",
        icon: <Check />,
        autoClose: 2000,
      });
    } catch (err) {
      updateNotification({
        id: "load-data",
        color: "red",
        title: "Error",
        message: "No se ha podido actualizar el horario, intenta de nuevo",
        icon: <X />,
        autoClose: 2000,
      });
    }
  };

  const isUpdating = result.isLoading;

  return [
    scheduleState,
    addScheduleItems,
    updateScheduleItem,
    deleteScheduleItem,
    onSaveSchedule,
    isLoading,
    isUpdating,
  ] as const;
};

export default useSchedule;
