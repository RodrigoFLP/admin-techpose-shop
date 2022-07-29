export interface Schedule {
  id: number;
  dayOfWeek: number;
  isActive: boolean;
  openTime: Date | string;
  closeTime: Date | string;
}

export interface ScheduleStatus {
  update: boolean;
  create: boolean;
  delete: boolean;
}

export type NewSchedulePayload = Omit<
  Schedule & { daysOfWeek: number[] },
  "id" | "dayOfWeek"
>;

export interface UpdateSchedulePayload {
  id: number;
  isActive?: boolean;
  openTime?: Date | string;
  closeTime?: Date | string;
}

// export interface NewSchedule {
//   daysOfWeek: number[];
//   openTime: Date | string;
//   closeTime: Date | string;
// }

export interface ScheduleMutation {}
