'use client';

import Calender from '@/components/calender/Calender';
import DateController from '@/components/common/dateController/DateController';
import { CalenderDataType } from '@/type';
import {
  addDays,
  addMonths,
  differenceInCalendarDays,
  endOfMonth,
  endOfWeek,
  format,
  startOfMonth,
  startOfWeek,
  subMonths,
} from 'date-fns';
import { useCallback, useMemo, useState } from 'react';

interface Props {
  data: CalenderDataType;
}

export default function CalenderView({ data }: Props) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const monthStart = startOfMonth(currentDate); // 현재 달의 시작 날짜 (요일 포함)
  const monthEnd = endOfMonth(currentDate); // 현재 달의 마지막 날짜 (요일 포함)
  const startDate = startOfWeek(monthStart); // 현재 달의 시작 날짜가 포함된 주의 시작 날짜
  const endDate = endOfWeek(monthEnd); // 현재 달의 마지막 날짜가 포함된 주의 끝 날짜

  const nextMonthHandler = useCallback(() => {
    setCurrentDate(addMonths(currentDate, 1));
  }, [currentDate]);

  const prevMonthHandler = useCallback(() => {
    setCurrentDate(subMonths(currentDate, 1));
  }, [currentDate]);

  const createMonth = useMemo(() => {
    const monthArray = [];
    let day = startDate;
    while (differenceInCalendarDays(endDate, day) >= 0) {
      monthArray.push(day);
      day = addDays(day, 1);
    }
    return monthArray;
  }, [startDate, endDate]);

  return (
    <section className="flex flex-col gap-24 items-center w-[34.2rem] bg-white">
      <DateController
        date={format(currentDate, 'yyyy.MM')}
        prevHandler={prevMonthHandler}
        nextHandler={nextMonthHandler}
      />
      <Calender createMonth={createMonth} currentDate={currentDate} data={data} />
    </section>
  );
}
