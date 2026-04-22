'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { doctors, timeSlots } from '@/lib/data';

export default function DoctorDetailPage() {
  const params = useParams();
  const doctorId = params.id as string;
  const doctor = doctors.find(d => d.id === doctorId);
  const [selectedDate, setSelectedDate] = useState<string>('');

  if (!doctor) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-slate-800 mb-2">Doctor not found</h2>
          <Link href="/doctors" className="text-teal-600 hover:underline">
            Back to Doctors
          </Link>
        </div>
      </div>
    );
  }

  const generateDateOptions = () => {
    const dates = [];
    const today = new Date();
    for (let i = 0; i < 14; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      dates.push(date.toISOString().split('T')[0]);
    }
    return dates;
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <div className="min-h-screen bg-slate-50 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-6">
          <Link href="/doctors" className="text-teal-600 hover:underline flex items-center gap-2">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to All Doctors
          </Link>
        </div>

        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
          <div className="md:flex">
            <div className="md:w-1/3 bg-gradient-to-br from-teal-600 to-teal-700 p-8 flex flex-col items-center justify-center">
              <img
                src={doctor.photo}
                alt={doctor.name}
                className="w-48 h-48 rounded-2xl object-cover shadow-lg mb-6"
              />
              <div className="text-center text-white">
                <h1 className="text-2xl font-bold mb-1">{doctor.name}</h1>
                <p className="text-teal-200 mb-4">{doctor.specialty}</p>
                <div className="flex items-center justify-center gap-4 text-sm">
                  <div className="flex items-center gap-1">
                    <svg className="w-5 h-5 text-amber-400 fill-current" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    {doctor.rating}
                  </div>
                  <span>|</span>
                  <span>{doctor.experience} years</span>
                </div>
              </div>
            </div>

            <div className="md:w-2/3 p-8">
              <div className="mb-6">
                <h2 className="text-xl font-semibold text-slate-800 mb-2">About</h2>
                <p className="text-slate-600 leading-relaxed">{doctor.about}</p>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="bg-slate-50 rounded-xl p-4">
                  <div className="text-sm text-slate-500 mb-1">Specialty</div>
                  <div className="font-semibold text-slate-800">{doctor.specialty}</div>
                </div>
                <div className="bg-slate-50 rounded-xl p-4">
                  <div className="text-sm text-slate-500 mb-1">Consultation Fee</div>
                  <div className="font-semibold text-teal-600">${doctor.consultationFee}</div>
                </div>
              </div>

              <div className="mb-8">
                <h2 className="text-xl font-semibold text-slate-800 mb-4">Select a Date</h2>
                <div className="grid grid-cols-4 sm:grid-cols-7 gap-2">
                  {generateDateOptions().map(date => (
                    <button
                      key={date}
                      onClick={() => setSelectedDate(date)}
                      className={`p-3 rounded-xl text-center transition-all ${
                        selectedDate === date
                          ? 'bg-teal-600 text-white shadow-lg'
                          : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                      }`}
                    >
                      <div className="text-xs">{formatDate(date).split(' ')[0]}</div>
                      <div className="font-semibold">{date.split('-')[2]}</div>
                    </button>
                  ))}
                </div>
              </div>

              {selectedDate && (
                <div className="mb-8 animate-fade-in">
                  <h2 className="text-xl font-semibold text-slate-800 mb-4">
                    Available Times for {formatDate(selectedDate)}
                  </h2>
                  <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                    {timeSlots.map(time => {
                      const isAvailable = Math.random() > 0.3;
                      return (
                        <div
                          key={time}
                          className={`p-3 rounded-xl text-center font-medium ${
                            isAvailable
                              ? 'bg-teal-50 text-teal-700 border border-teal-200'
                              : 'bg-slate-100 text-slate-400 line-through'
                          }`}
                        >
                          {time}
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              <Link
                href={`/book/${doctor.id}`}
                className="block w-full py-4 bg-teal-600 text-white font-semibold rounded-xl hover:bg-teal-700 transition-colors text-center"
              >
                Book Appointment
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
