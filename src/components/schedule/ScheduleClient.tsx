"use client";

import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid"; // a plugin!
import interactionPlugin from "@fullcalendar/interaction"; // needed for dayClick
import React, { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

import { IoAddCircle } from "react-icons/io5";

import AddModal from "@/src/components/schedule/AddModal";
import DetailsModal from "./DetailsModal";

const ScheduleClient = ({ scheduleData }: { scheduleData: any }) => {
  const [isAddModal, setIsAddModal] = useState<boolean>(false); // 스케줄 추가 모달
  const [isDetailsModal, setIsDetailsModal] = useState<boolean>(false); // 스케줄 상세 정보 모달
  const [modalDate, setModalDate] = useState<Date | null>(null); // 모달에 전달되는 날짜

  // 날짜 클릭 함수
  const handleDateClick = (e: any) => {
    console.log("date", e);
  };

  // 날짜 이벤트 클릭 함수
  const handleEventClick = (e: any) => {
    console.log("event", e.event._def);
    console.log("이벤트 id :", e.event._def.publicId);
    console.log("이벤트 title :", e.event._def.title);
    console.log("이벤트 props :", e.event._def.extendedProps);

    setIsDetailsModal(true);
  };

  // tanstack query 테스트
  // const { data, isLoading, error } = useQuery({
  //   queryKey: ["test"],
  //   queryFn: () => axios.get("/api/schedule").then((res) => res.data),
  // });

  // console.log("data", data);

  console.log("scheduleData", scheduleData);
  return (
    <>
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        events={scheduleData}
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
                  setIsAddModal(true);
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
      {isAddModal && (
        <AddModal
          className="opacity-0 group-hover:opacity-100 transition cursor-pointer"
          triggerVisible={false}
          date={modalDate}
          isAddModal={isAddModal}
          setIsAddModal={setIsAddModal}
        />
      )}
      {isDetailsModal && (
        <DetailsModal
          triggerVisible={false}
          date={new Date()}
          isDetailsModal={isDetailsModal}
          setIsDetailsModal={setIsDetailsModal}
        />
      )}
    </>
  );
};

export default ScheduleClient;
