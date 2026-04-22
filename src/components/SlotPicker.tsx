'use client';

import { useState, useEffect } from 'react';
import { timeSlots } from '@/lib/data';
import { getBookedSlots } from '@/lib/store';

interface SlotPickerProps {
  doctorId: string;
  selectedDate: string;
  selectedTime: string;
  onSelectTime: (time: string) => void;
}

export default function SlotPicker({ doctorId, selectedDate, selectedTime, onSelectTime }: SlotPickerProps) {
  const [bookedSlots, setBookedSlots] = useState<string[]>([]);

  useEffect(() => {
    if (selectedDate && typeof window !== 'undefined') {
      try {
        const slots = getBookedSlots(doctorId, selectedDate);
        setBookedSlots(slots || []);
      } catch (error) {
        console.error('Error fetching booked slots:', error);
        setBookedSlots([]);
      }
    }
  }, [doctorId, selectedDate]);

  const getSlotPeriod = (time: string): string => {
    const hour = parseInt(time.split(':')[0]);
    if (hour < 12) return 'Morning';
    if (hour < 17) return 'Afternoon';
    return 'Evening';
  };

  const periods = ['Morning', 'Afternoon', 'Evening'];

  if (!selectedDate) {
    return (
      <div className="text-center py-8 text-slate-500">
        Please select a date to view available time slots
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-3 gap-2 mb-4">
        {periods.map(period => {
          const slotsInPeriod = timeSlots.filter(slot => getSlotPeriod(slot) === period);
          const availableInPeriod = slotsInPeriod.filter(slot => !bookedSlots.includes(slot)).length;
          
          return (
            <div
              key={period}
              className="text-center p-2 bg-slate-50 rounded-lg text-sm font-medium text-slate-600"
            >
              {period}
              <span className="block text-xs text-slate-400">
                {availableInPeriod} available
              </span>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
        {timeSlots.map(time => {
          const isBooked = bookedSlots.includes(time);
          const isSelected = selectedTime === time;
          
          return (
            <button
              key={time}
              type="button"
              onClick={() => onSelectTime(time)}
              disabled={isBooked}
              className={`py-3 px-2 rounded-lg text-sm font-medium transition-all ${
                isSelected
                  ? 'bg-teal-600 text-white shadow-lg'
                  : isBooked
                  ? 'bg-slate-100 text-slate-400 cursor-not-allowed line-through'
                  : 'bg-white border border-slate-200 text-slate-600 hover:border-teal-500 hover:text-teal-600 cursor-pointer'
              }`}
            >
              {time}
            </button>
          );
        })}
      </div>
    </div>
  );
}
