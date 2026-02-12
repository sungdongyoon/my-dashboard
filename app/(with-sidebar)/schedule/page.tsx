"use client";

import { Calendar, CalendarDayButton } from "@/components/ui/calendar";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import React, { useState } from "react";

interface ScheduleType {
  id: number;
  date: string;
  content: string;
}

const Schedule = () => {
  const [date, setDate] = useState<string | any>("");
  const [schedule, setSchedule] = useState<ScheduleType[]>([
    {
      id: 1,
      date: "2026-02-03",
      content: "오늘은 2월 3일~",
    },
    {
      id: 2,
      date: "2026-02-11",
      content: "오늘은 2월 11일~",
    },
    {
      id: 3,
      date: "2026-02-15",
      content: "오늘은 2월 15일~",
    },
    {
      id: 4,
      date: "2026-02-20",
      content: "오늘은 2월 20일~",
    },
    {
      id: 5,
      date: "2026-02-22",
      content: "오늘은 2월 22일~",
    },
    {
      id: 6,
      date: "2026-02-03",
      content: "오늘은 2월 3일~ !!",
    },
  ]);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  return (
    <div className="w-full h-full">
      <FullCalendar plugins={[dayGridPlugin]} initialView="dayGridMonth" />
      {/* <Calendar
        mode="single"
        selected={date}
        onSelect={setDate}
        className="w-full rounded-lg border"
        classNames={{
          months: "calendar_months",
          month: "calendar_month",
          weekdays: "calendar_weekdays bg-blue-100",
          week: "calendar_week",
          day: "calendar_day border aspect-auto h-auto",
          day_button: "aspect-auto",
        }}
        components={{
          DayButton: ({ children, day, modifiers, ...props }) => {
            return (
              <CalendarDayButton
                day={day}
                modifiers={modifiers}
                {...props}
                onClick={() => setSelectedDate(day.isoDate)}
              >
                <div className="w-full">{children}</div>
                <ul className="w-full bg-red-50">
                  {schedule
                    .filter((el) => el.date === day.isoDate)
                    .map((el) => (
                      <li key={el.id}>{el.content}</li>
                    ))}
                </ul>
              </CalendarDayButton>
            );
          },
        }}
      /> */}
    </div>
  );
};

export default Schedule;
