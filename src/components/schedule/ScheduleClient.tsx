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
import CategoryModal from "./CategoryModal";
import { format } from "date-fns";

interface DetailsType {
  id: string;
  title: string;
  props: {
    memo?: string;
  };
  date: Date;
  start: Date;
  end: Date;
  dateStr: string;
  startStr: string;
  endStr: string;
  category: string;
}

type CategoryMapType = {
  id: string;
  backgroundColor: string;
  borderColor: string;
  textColor: string;
};

const ScheduleClient = ({
  scheduleData,
  categoryData,
}: {
  scheduleData: any;
  categoryData: any;
}) => {
  const [isAddModal, setIsAddModal] = useState<boolean>(false); // [Add Modal] 스케줄 추가 모달
  const [isDetailsModal, setIsDetailsModal] = useState<boolean>(false); // [Details Modal] 스케줄 상세 정보 모달
  const [isCategoryModal, setIsCategoryModal] = useState<boolean>(false); // [Category modal] 카테고리 추가 모달
  const [modalDate, setModalDate] = useState<Date | null>(null); // [Add Modal] 스케줄 추가 모달에 전달되는 날짜
  const [details, setDetails] = useState<DetailsType | null>(null); // [Details Modal] 스케줄 상세 정보

  // 카테고리 데이터를 활용한 새로운 카테고리 맵
  const categoryMap = new Map<string, CategoryMapType>(
    (categoryData as CategoryMapType[]).map((el) => [el.id, el]),
  );

  // 카테고리 데이터가 적용된 새로운 스케줄 데이터(실제 달력에 적용할 스케줄 데이터)
  const newScheduleData = scheduleData.map((el: { categoryId: string }) => {
    const matchedCategory = categoryMap.get(el.categoryId);

    return {
      ...el,
      backgroundColor: matchedCategory?.backgroundColor,
      borderColor: matchedCategory?.borderColor,
      textColor: matchedCategory?.textColor,
    };
  });

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
      date: event.start,
      start: event.start,
      end: event.end,
      dateStr: format(event.startStr, "yyyy-MM-dd HH:mm"),
      startStr: format(event.startStr, "yyyy-MM-dd HH:mm"),
      endStr: format(event.endStr, "yyyy-MM-dd HH:mm"),
      category: "",
    });

    setIsDetailsModal(true);
  };

  // const testData = [
  //   {
  //     id: "2b8e6776-a3bf-46f5-981f-aadfba5a3f6a",
  //     created_at: "2026-03-26T02:22:32.780317+00:00",
  //     start: "2026-04-10",
  //     title: "test title1 gd",
  //     memo: "gdㅎㅇㅇ",
  //     categoryName: "일상",
  //     dateStr: null,
  //     categoryId: "a44a55b8-77bf-4ece-9ca6-ad7ae0fffdc8",
  //     end: "2026-04-20",
  //     backgroundColor: "blue",
  //     borderColor: "blue",
  //     textColor: "white",
  //   },
  // ];

  return (
    <>
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        events={newScheduleData}
        // dateClick={handleDateClick}
        eventClick={handleEventClick}
        headerToolbar={{ end: "category today prev,next" }}
        customButtons={{
          category: {
            text: "카테고리 관리",
            click: () => {
              setIsCategoryModal(true);
            },
          },
        }}
        dayCellContent={(info) => {
          return (
            <div className="w-full group flex justify-between">
              <span>{info.dayNumberText}</span>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setModalDate(info.date);
                  setIsAddModal(true);
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
      {isCategoryModal && (
        <CategoryModal
          triggerVisible={false}
          categoryData={categoryData}
          isCategoryModal={isCategoryModal}
          setIsCategoryModal={setIsCategoryModal}
        />
      )}
    </>
  );
};

export default ScheduleClient;
