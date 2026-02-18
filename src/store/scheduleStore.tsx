import { create } from "zustand";

type ScheduleType = {
  id: string;
  date: Date | null;
  title: string;
  memo?: string;
};

type ScheduleStore = {
  scheduleData: ScheduleType;
  setScheduleData: (data: Partial<ScheduleType>) => void;
  resetScheduleData: () => void;
};

const initialScheduleData: ScheduleType = {
  id: "",
  date: null,
  title: "",
  memo: "",
};

export const useScheduleStore = create<ScheduleStore>((set) => ({
  scheduleData: initialScheduleData,

  setScheduleData: (data) =>
    set((state) => ({ scheduleData: { ...state.scheduleData, ...data } })),

  resetScheduleData: () => set({ scheduleData: initialScheduleData }),
}));
// export const scheduleStore = create<ScheduleType>((set) => ({
//   lat: 37.5510697,
//   lon: 126.9882562,
//   setLocation: (lat, lon) => set({ lat, lon }),
// }));
