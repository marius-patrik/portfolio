import {
  IconCalendar as IconCal,
  IconChevronLeft,
  IconChevronRight,
} from '@tabler/icons-react';
import { Window } from 'liqid-ui';
import { useState } from 'react';

interface CalendarProps {
  isOpen: boolean;
  handleClose: () => void;
  zIndex: number;
  onFocus: () => void;
  resetKey?: number;
}

const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const MONTHS = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

const getDaysInMonth = (year: number, month: number) => {
  return new Date(year, month + 1, 0).getDate();
};

const getFirstDayOfMonth = (year: number, month: number) => {
  return new Date(year, month, 1).getDay();
};

export const Calendar = ({
  isOpen,
  handleClose,
  zIndex,
  onFocus,
  resetKey,
}: CalendarProps) => {
  const today = new Date();
  const [currentDate, setCurrentDate] = useState(
    new Date(today.getFullYear(), today.getMonth(), 1),
  );

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const daysInMonth = getDaysInMonth(year, month);
  const firstDay = getFirstDayOfMonth(year, month);

  const prevMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1));
  };

  const isToday = (day: number) => {
    return (
      day === today.getDate() &&
      month === today.getMonth() &&
      year === today.getFullYear()
    );
  };

  // Create array of day cells
  const dayCells = [];
  // Empty cells for days before the first day of month
  for (let i = 0; i < firstDay; i++) {
    dayCells.push(<div key={`empty-${i}`} />);
  }
  // Day cells
  for (let day = 1; day <= daysInMonth; day++) {
    dayCells.push(
      <div
        key={day}
        className={`p-2 text-center rounded-lg cursor-pointer hover:bg-slate-200/50 dark:hover:bg-slate-700/50 transition-colors ${
          isToday(day) ? 'primary' : ''
        }`}
      >
        {day}
      </div>,
    );
  }

  return (
    <Window
      title={
        <span className="flex items-center gap-2">
          <IconCal size={18} /> Calendar
        </span>
      }
      handleClose={handleClose}
      isOpen={isOpen}
      zIndex={zIndex}
      onFocus={onFocus}
      resetKey={resetKey}
    >
      <div className="w-full h-full flex flex-col">
        {/* Month navigation */}
        <div className="flex items-center justify-between mb-2">
          <button
            type="button"
            onClick={prevMonth}
            className="p-1 rounded hover:bg-slate-200/50 transition-colors"
          >
            <IconChevronLeft size={20} />
          </button>
          <span className="font-semibold text-lg">
            {MONTHS[month]} {year}
          </span>
          <button
            type="button"
            onClick={nextMonth}
            className="p-1 rounded hover:bg-slate-200/50 transition-colors"
          >
            <IconChevronRight size={20} />
          </button>
        </div>

        {/* Day headers */}
        <div className="grid grid-cols-7 gap-1 text-center font-semibold mb-2">
          {DAYS.map((day) => (
            <div key={day} className="text-sm opacity-70">
              {day}
            </div>
          ))}
        </div>

        {/* Days grid */}
        <div className="grid grid-cols-7 gap-1 flex-1">{dayCells}</div>
      </div>
    </Window>
  );
};
