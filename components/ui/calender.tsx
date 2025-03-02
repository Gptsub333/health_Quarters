"use client";

import React, { useState } from "react";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";

// Define Prop Types
interface CalendarProps {
  selected: Date | null;
  onSelect: (date: Date) => void;
}

const Calendar: React.FC<CalendarProps> = ({ selected, onSelect }) => {
  const [currentMonth, setCurrentMonth] = useState<Date>(selected || new Date());

  // Get days in a specific month
  const daysInMonth = (year: number, month: number) => new Date(year, month + 1, 0).getDate();
  const firstDayOfMonth = (year: number, month: number) => new Date(year, month, 1).getDay();

  const year = currentMonth.getFullYear();
  const month = currentMonth.getMonth();
  
  const days: (Date | null)[] = [];
  const daysCount = daysInMonth(year, month);
  const firstDay = firstDayOfMonth(year, month);

  for (let i = 0; i < firstDay; i++) days.push(null);
  for (let i = 1; i <= daysCount; i++) days.push(new Date(year, month, i));

  const handlePrevMonth = () => setCurrentMonth(new Date(year, month - 1, 1));
  const handleNextMonth = () => setCurrentMonth(new Date(year, month + 1, 1));

  return (
    <div className="p-3">
      <div className="flex justify-between items-center mb-2">
        <button onClick={handlePrevMonth} className="p-1">
          <CalendarIcon className="h-5 w-5" />
        </button>
        <span className="font-medium">{format(currentMonth, "MMMM yyyy")}</span>
        <button onClick={handleNextMonth} className="p-1">
          <CalendarIcon className="h-5 w-5" />
        </button>
      </div>
      <div className="grid grid-cols-7 gap-1 text-center text-xs">
        {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((day, i) => (
          <div key={i} className="p-1">{day}</div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-1 mt-1">
        {days.map((date, i) => (
          <div key={i} className="p-0">
            {date ? (
              <button
                onClick={() => onSelect(date)}
                className="h-8 w-8 rounded-md p-0 text-center text-sm hover:bg-gray-300"
              >
                {date.getDate()}
              </button>
            ) : (
              <div className="h-8 w-8" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Calendar;
