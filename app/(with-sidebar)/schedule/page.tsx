"use client";

import { Calendar, CalendarDayButton } from "@/components/ui/calendar";
import React, { useState } from "react";

const Schedule = () => {
  const [date, setDate] = useState<Date | any>(new Date());
  return (
    <div className="bg-red-100 w-full h-full">
      <Calendar
        mode="single"
        selected={date}
        onSelect={setDate}
        className="rounded-lg border"
        components={{
          DayButton: ({ children }) => {
            return <div>{children}test</div>;
          },
        }}
        // components={{
        //   DayButton: ({ children, modifiers, day, ...props }) => {
        //     const isWeekend =
        //       day.date.getDay() === 0 || day.date.getDay() === 6;

        //     return (
        //       <CalendarDayButton day={day} modifiers={modifiers} {...props}>
        //         {children}
        //         {!modifiers.outside && (
        //           <span>{isWeekend ? "$120" : "$100"}</span>
        //         )}
        //       </CalendarDayButton>
        //     );
        //   },
        // }}
      />
    </div>
  );
};

export default Schedule;
