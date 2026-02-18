"use client";

import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid"; // a plugin!
import interactionPlugin from "@fullcalendar/interaction"; // needed for dayClick
import React, { useEffect, useState } from "react";

import { IoAddCircle } from "react-icons/io5";

import AddModal from "@/src/components/schedule/AddModal";

const ScheduleClient = ({ data }: { data: any }) => {
  const [isModal, setIsModal] = useState<boolean>(false);
  const [modalDate, setModalDate] = useState<Date | null>(null); // 모달에 전달되는 날짜

  // 날짜 클릭 함수
  const handleDateClick = (e: any) => {
    console.log("date", e);
  };

  // 날짜 이벤트 클릭 함수
  const handleEventClick = (e: any) => {
    // console.log("event", e);
  };

  // console.log("Data", data);
  return (
    <>
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        events={data}
        // dateClick={handleDateClick}
        eventClick={handleEventClick}
        dayCellContent={(info) => {
          return (
            <div className="w-full group flex justify-between">
              <span>{info.dayNumberText}</span>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setModalDate(info.date);
                  setIsModal(true);
                  // console.log("info", info);
                }}
                className="opacity-0 group-hover:opacity-100 transition cursor-pointer"
              >
                <IoAddCircle size={20} />
              </button>
            </div>
          );
        }}
      />
      {isModal && (
        <AddModal
          className="opacity-0 group-hover:opacity-100 transition cursor-pointer"
          triggerVisible={false}
          date={modalDate}
          isModal={isModal}
          setIsModal={setIsModal}
        />
      )}
    </>
  );
};

export default ScheduleClient;
