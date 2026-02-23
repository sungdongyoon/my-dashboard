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

interface DetailsType {
  id: string;
  title: string;
  props: {
    memo?: string;
  };
  date: string;
}

const ScheduleClient = ({ scheduleData }: { scheduleData: any }) => {
  const [isAddModal, setIsAddModal] = useState<boolean>(false); // [Add Modal] 스케줄 추가 모달
  const [isDetailsModal, setIsDetailsModal] = useState<boolean>(false); // [Details Modal] 스케줄 상세 정보 모달
  const [modalDate, setModalDate] = useState<Date | null>(null); // [Add Modal] 스케줄 추가 모달에 전달되는 날짜
  const [details, setDetails] = useState<DetailsType | null>(null);

  // 날짜 클릭 함수
  const handleDateClick = (e: any) => {
    console.log("date", e);
  };

  // 날짜 이벤트 클릭 함수
  const handleEventClick = (e: any) => {
    const event = e.event;
    // console.log("이벤트 id :", event._def.publicId);
    // console.log("이벤트 title :", event._def.title);
    // console.log("이벤트 props :", event._def.extendedProps);
    // console.log("event", e.event);
    setDetails({
      id: event._def.publicId,
      title: event._def.title,
      props: event._def.extendedProps,
      date: e.event.startStr,
    });

    setIsDetailsModal(true);
  };

  // tanstack query 테스트
  // const { data, isLoading, error } = useQuery({
  //   queryKey: ["test"],
  //   queryFn: () => axios.get("/api/schedule").then((res) => res.data),
  // });

  // console.log("data", data);
  console.log("schedule", scheduleData);

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
          isDetailsModal={isDetailsModal}
          setIsDetailsModal={setIsDetailsModal}
          detailsData={details}
        />
      )}
    </>
  );
};

export default ScheduleClient;
