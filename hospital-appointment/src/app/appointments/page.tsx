'use client';

import { useState, useEffect } from 'react';
import { getAppointments, cancelAppointment } from '@/lib/store';
import { Appointment } from '@/types';
import AppointmentCard from '@/components/AppointmentCard';

export default function AppointmentsPage() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [filter, setFilter] = useState<'all' | 'upcoming' | 'past'>('upcoming');

  useEffect(() => {
    setAppointments(getAppointments());
  }, []);

  const handleCancel = (id: string) => {
    if (confirm('Are you sure you want to cancel this appointment?')) {
      cancelAppointment(id);
      setAppointments(getAppointments());
    }
  };

  const filteredAppointments = appointments.filter(apt => {
    const appointmentDate = new Date(apt.date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (filter === 'upcoming') {
      return appointmentDate >= today && apt.status !== 'cancelled';
    } else if (filter === 'past') {
      return appointmentDate < today || apt.status === 'cancelled';
    }
    return true;
  });

  const upcomingCount = appointments.filter(apt => {
    const appointmentDate = new Date(apt.date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return appointmentDate >= today && apt.status !== 'cancelled';
  }).length;

  const confirmedCount = appointments.filter(apt => apt.status === 'confirmed').length;

  return (
    <div className="min-h-screen bg-slate-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-800 mb-2">My Appointments</h1>
          <p className="text-slate-600">Manage your booked appointments</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="text-3xl font-bold text-teal-600 mb-1">{appointments.length}</div>
            <div className="text-sm text-slate-500">Total Bookings</div>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="text-3xl font-bold text-orange-500 mb-1">{upcomingCount}</div>
            <div className="text-sm text-slate-500">Upcoming</div>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-6 col-span-2 md:col-span-1">
            <div className="text-3xl font-bold text-green-500 mb-1">{confirmedCount}</div>
            <div className="text-sm text-slate-500">Confirmed</div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-2 mb-6 flex gap-2">
          {(['upcoming', 'past', 'all'] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`flex-1 py-2.5 px-4 rounded-lg font-medium text-sm transition-colors ${
                filter === f
                  ? 'bg-teal-600 text-white'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              {f.charAt(0).toUpperCase() + f.slice(1)}
            </button>
          ))}
        </div>

        {filteredAppointments.length > 0 ? (
          <div className="space-y-4">
            {filteredAppointments.map((appointment) => (
              <AppointmentCard
                key={appointment.id}
                appointment={appointment}
                onCancel={handleCancel}
              />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-2xl shadow-sm p-12 text-center">
            <svg className="w-16 h-16 text-slate-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <h3 className="text-xl font-semibold text-slate-800 mb-2">No appointments found</h3>
            <p className="text-slate-600 mb-6">
              {filter === 'upcoming'
                ? "You don't have any upcoming appointments."
                : filter === 'past'
                ? "No past appointments to show."
                : "You haven't booked any appointments yet."}
            </p>
            <a
              href="/doctors"
              className="inline-flex items-center px-6 py-3 bg-teal-600 text-white font-semibold rounded-full hover:bg-teal-700 transition-colors"
            >
              Book an Appointment
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
