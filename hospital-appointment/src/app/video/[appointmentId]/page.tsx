'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { getAppointmentById } from '@/lib/store';
import { Appointment } from '@/types';

export default function VideoConsultationPage() {
  const params = useParams();
  const appointmentId = params.appointmentId as string;
  const [appointment, setAppointment] = useState<Appointment | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(false);
  const [elapsed, setElapsed] = useState(0);

  useEffect(() => {
    const apt = getAppointmentById(appointmentId);
    setAppointment(apt || null);
  }, [appointmentId]);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isConnected) {
      interval = setInterval(() => {
        setElapsed(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isConnected]);

  if (!appointment) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <div className="text-center text-white">
          <h2 className="text-2xl font-bold mb-2">Appointment not found</h2>
          <Link href="/appointments" className="text-teal-400 hover:underline">
            Back to Appointments
          </Link>
        </div>
      </div>
    );
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="min-h-screen bg-slate-900 flex flex-col">
      <div className="bg-slate-800 p-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/appointments" className="text-white hover:text-teal-400 flex items-center gap-2">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back
          </Link>
        </div>
        <div className="text-white text-center">
          <h1 className="font-semibold">{appointment.doctorName}</h1>
          <p className="text-sm text-slate-400">{appointment.specialty}</p>
        </div>
        <div className="text-teal-400 font-mono">
          {formatTime(elapsed)}
        </div>
      </div>

      <div className="flex-1 p-4 flex flex-col lg:flex-row gap-4">
        <div className="flex-1 bg-slate-800 rounded-2xl overflow-hidden relative">
          {!isConnected ? (
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-8">
              <div className="w-32 h-32 bg-slate-700 rounded-full flex items-center justify-center mb-6">
                <svg className="w-16 h-16 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-white mb-2">Ready to Join?</h2>
              <p className="text-slate-400 mb-6 max-w-md">
                Your video consultation with {appointment.doctorName} is ready. 
                Click below to join the meeting.
              </p>
              <div className="bg-slate-700 rounded-xl p-4 mb-6 text-left w-full max-w-sm">
                <h3 className="text-white font-medium mb-2">Meeting Details</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between text-slate-400">
                    <span>Meeting ID:</span>
                    <span className="text-white">{appointment.zoomMeetingId}</span>
                  </div>
                  <div className="flex justify-between text-slate-400">
                    <span>Date:</span>
                    <span className="text-white">{appointment.date}</span>
                  </div>
                  <div className="flex justify-between text-slate-400">
                    <span>Time:</span>
                    <span className="text-white">{appointment.time}</span>
                  </div>
                </div>
              </div>
              <button
                onClick={() => setIsConnected(true)}
                className="px-8 py-4 bg-teal-600 text-white font-semibold rounded-full hover:bg-teal-700 transition-colors flex items-center gap-3"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
                Join Meeting
              </button>
            </div>
          ) : (
            <div className="absolute inset-0 flex items-center justify-center bg-slate-700">
              <div className="text-center">
                <div className="w-48 h-48 bg-slate-600 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
                  <span className="text-6xl font-bold text-white">
                    {appointment.doctorName.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
                <h3 className="text-xl font-semibold text-white">{appointment.doctorName}</h3>
                <p className="text-slate-400">In Call</p>
              </div>
            </div>
          )}
        </div>

        {isConnected && (
          <div className="lg:w-80 bg-slate-800 rounded-2xl p-4 space-y-4">
            <div className="text-white">
              <h3 className="font-semibold mb-3">Meeting Controls</h3>
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => setIsMuted(!isMuted)}
                  className={`p-4 rounded-xl flex flex-col items-center gap-2 ${
                    isMuted ? 'bg-red-600' : 'bg-slate-700'
                  }`}
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    {isMuted ? (
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                    ) : (
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                    )}
                  </svg>
                  <span className="text-xs">{isMuted ? 'Unmute' : 'Mute'}</span>
                </button>

                <button
                  onClick={() => setIsVideoOff(!isVideoOff)}
                  className={`p-4 rounded-xl flex flex-col items-center gap-2 ${
                    isVideoOff ? 'bg-red-600' : 'bg-slate-700'
                  }`}
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    {isVideoOff ? (
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
                    ) : (
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    )}
                  </svg>
                  <span className="text-xs">{isVideoOff ? 'Start Video' : 'Stop Video'}</span>
                </button>

                <button
                  onClick={() => window.open(appointment.zoomLink, '_blank')}
                  className="p-4 rounded-xl flex flex-col items-center gap-2 bg-slate-700"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                  <span className="text-xs">Share Screen</span>
                </button>

                <button
                  onClick={() => setIsConnected(false)}
                  className="p-4 rounded-xl flex flex-col items-center gap-2 bg-red-600"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 8l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2M5 3a2 2 0 00-2 2v1c0 8.284 6.716 15 15 15h1a2 2 0 002-2v-3.28a1 1 0 00-.684-.948l-4.493-1.498a1 1 0 00-1.21.502l-1.13 2.257a11.042 11.042 0 01-5.516-5.517l2.257-1.128a1 1 0 00.502-1.21L9.228 3.683A1 1 0 008.279 3H5z" />
                  </svg>
                  <span className="text-xs">End Call</span>
                </button>
              </div>
            </div>

            <div className="bg-slate-700 rounded-xl p-4">
              <h4 className="text-white font-medium mb-2">Appointment Info</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-slate-400">Date</span>
                  <span className="text-white">{appointment.date}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Time</span>
                  <span className="text-white">{appointment.time}</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
