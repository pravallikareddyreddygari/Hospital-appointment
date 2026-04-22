'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { getAppointments } from '@/lib/store';
import { Appointment } from '@/types';

export default function VideoPage() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);

  useEffect(() => {
    setAppointments(getAppointments());
  }, []);

  const upcomingVideoAppointments = appointments.filter(
    apt => apt.zoomLink && apt.status === 'confirmed' && new Date(apt.date) >= new Date()
  );

  return (
    <div className="min-h-screen bg-slate-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-800 mb-2">Video Consultation</h1>
          <p className="text-slate-600">Join your upcoming video appointments</p>
        </div>

        <div className="bg-white rounded-2xl shadow-sm p-6 mb-8">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-teal-100 rounded-2xl flex items-center justify-center">
              <svg className="w-8 h-8 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
            </div>
            <div>
              <h2 className="text-lg font-semibold text-slate-800">How Video Consultation Works</h2>
              <p className="text-slate-600 text-sm">
                Once you book an appointment with video consultation enabled, you can join the call from your appointments page.
              </p>
            </div>
          </div>
        </div>

        {upcomingVideoAppointments.length > 0 ? (
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-slate-800">Upcoming Video Appointments</h2>
            {upcomingVideoAppointments.map(apt => (
              <div key={apt.id} className="bg-white rounded-xl shadow-sm p-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex-1">
                    <h3 className="font-semibold text-slate-800 mb-1">{apt.doctorName}</h3>
                    <p className="text-sm text-teal-600 mb-2">{apt.specialty}</p>
                    <div className="flex flex-wrap gap-4 text-sm text-slate-500">
                      <span className="flex items-center gap-1">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        {apt.date}
                      </span>
                      <span className="flex items-center gap-1">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        {apt.time}
                      </span>
                    </div>
                  </div>
                  <Link
                    href={`/video/${apt.id}`}
                    className="inline-flex items-center px-6 py-3 bg-teal-600 text-white font-semibold rounded-xl hover:bg-teal-700 transition-colors"
                  >
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                    Join Call
                  </Link>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-2xl shadow-sm p-12 text-center">
            <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-10 h-10 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-slate-800 mb-2">No Video Appointments</h3>
            <p className="text-slate-600 mb-6">
              You don&apos;t have any upcoming video consultations. Book an appointment to get started!
            </p>
            <Link
              href="/doctors"
              className="inline-flex items-center px-6 py-3 bg-teal-600 text-white font-semibold rounded-full hover:bg-teal-700 transition-colors"
            >
              Book an Appointment
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
