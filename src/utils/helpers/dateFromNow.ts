import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

export const dateFromNow = (date: string): string => {
  dayjs.extend(relativeTime);

  return dayjs(date).fromNow();
};
