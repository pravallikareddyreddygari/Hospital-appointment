'use client';

import { useState, useMemo } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { doctors, timeSlots } from '@/lib/data';
import SlotPicker from '@/components/SlotPicker';

export default function BookingPage() {
  const params = useParams();
  const router = useRouter();
  const doctorId = params.doctorId as string;
  const doctor = doctors.find(d => d.id === doctorId);

  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [patientName, setPatientName] = useState('');
  const [patientEmail, setPatientEmail] = useState('');
  const [patientPhone, setPatientPhone] = useState('');
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

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

  const dateOptions = useMemo(() => {
    const dates = [];
    const today = new Date();
    for (let i = 0; i < 14; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      dates.push(date.toISOString().split('T')[0]);
    }
    return dates;
  }, []);

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
    });
  };

  const handleSubmit = async () => {
    if (!selectedDate || !selectedTime || !patientName || !patientEmail || !patientPhone) {
      alert('Please fill in all fields');
      return;
    }

    setIsSubmitting(true);

    const appointment = {
      doctorId: doctor.id,
      doctorName: doctor.name,
      patientName,
      patientEmail,
      patientPhone,
      date: selectedDate,
      time: selectedTime,
      status: 'confirmed' as const,
      specialty: doctor.specialty,
    };

    const { saveAppointment } = await import('@/lib/store');
    const newAppointment = saveAppointment(appointment, doctor);

    setIsSubmitting(false);
    setShowConfirmation(true);
  };

  if (showConfirmation) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-lg p-8 max-w-md w-full text-center animate-fade-in">
          <div className="w-20 h-20 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-10 h-10 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-slate-800 mb-2">Booking Confirmed!</h2>
          <p className="text-slate-600 mb-6">
            Your appointment with {doctor.name} has been successfully booked.
          </p>
          <div className="bg-slate-50 rounded-xl p-4 mb-6 text-left">
            <div className="flex items-center gap-3 mb-3">
              <svg className="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <span className="text-slate-700">{formatDate(selectedDate)}</span>
            </div>
            <div className="flex items-center gap-3 mb-3">
              <svg className="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="text-slate-700">{selectedTime}</span>
            </div>
            <div className="flex items-center gap-3">
              <svg className="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span className="text-slate-700">Video Consultation</span>
            </div>
          </div>
          <p className="text-sm text-slate-500 mb-6">
            A confirmation email and SMS have been sent to {patientEmail}
          </p>
          <div className="flex flex-col gap-3">
            <Link
              href="/appointments"
              className="w-full py-3 bg-teal-600 text-white font-semibold rounded-xl hover:bg-teal-700 transition-colors"
            >
              View My Appointments
            </Link>
            <Link
              href="/doctors"
              className="w-full py-3 bg-slate-100 text-slate-700 font-semibold rounded-xl hover:bg-slate-200 transition-colors"
            >
              Book Another Appointment
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-6">
          <Link href={`/doctors/${doctor.id}`} className="text-teal-600 hover:underline flex items-center gap-2">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Doctor Profile
          </Link>
        </div>

        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
          <div className="bg-gradient-to-r from-teal-600 to-teal-700 p-6 text-white">
            <h1 className="text-2xl font-bold">Book Appointment</h1>
            <p className="text-teal-100">with {doctor.name}</p>
          </div>

          <div className="p-6">
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <div className="flex items-center gap-4 mb-6">
                  <img
                    src={doctor.photo}
                    alt={doctor.name}
                    className="w-16 h-16 rounded-xl object-cover"
                  />
                  <div>
                    <h3 className="font-semibold text-slate-800">{doctor.name}</h3>
                    <p className="text-teal-600 text-sm">{doctor.specialty}</p>
                    <div className="flex items-center gap-1 text-amber-500 text-sm mt-1">
                      <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      {doctor.rating} • {doctor.experience} years exp.
                    </div>
                  </div>
                </div>

                <div className="bg-teal-50 rounded-xl p-4 mb-6">
                  <div className="flex justify-between items-center">
                    <span className="text-slate-600">Consultation Fee</span>
                    <span className="text-2xl font-bold text-teal-600">${doctor.consultationFee}</span>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="font-semibold text-slate-800">1. Select Date</h3>
                  <div className="grid grid-cols-4 sm:grid-cols-7 gap-2">
                    {dateOptions.map(date => (
                      <button
                        type="button"
                        key={date}
                        onClick={() => {
                          setSelectedDate(date);
                          setSelectedTime('');
                        }}
                        className={`p-2 rounded-lg text-center transition-colors ${
                          selectedDate === date
                            ? 'bg-teal-600 text-white'
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
                  <div className="mt-6">
                    <h3 className="font-semibold text-slate-800 mb-3">2. Select Time</h3>
                    <SlotPicker
                      doctorId={doctor.id}
                      selectedDate={selectedDate}
                      selectedTime={selectedTime}
                      onSelectTime={setSelectedTime}
                    />
                  </div>
                )}
              </div>

              <div>
                <h3 className="font-semibold text-slate-800 mb-4">3. Your Details</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">
                      Full Name
                    </label>
                    <input
                      type="text"
                      value={patientName}
                      onChange={(e) => setPatientName(e.target.value)}
                      placeholder="Enter your full name"
                      className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">
                      Email Address
                    </label>
                    <input
                      type="email"
                      value={patientEmail}
                      onChange={(e) => setPatientEmail(e.target.value)}
                      placeholder="Enter your email"
                      className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      value={patientPhone}
                      onChange={(e) => setPatientPhone(e.target.value)}
                      placeholder="Enter your phone number"
                      className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500"
                    />
                  </div>
                </div>

                <div className="mt-8 p-4 bg-slate-50 rounded-xl">
                  <h4 className="font-medium text-slate-800 mb-3">Booking Summary</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-slate-600">Doctor</span>
                      <span className="text-slate-800">{doctor.name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600">Date</span>
                      <span className="text-slate-800">{selectedDate ? formatDate(selectedDate) : '-'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600">Time</span>
                      <span className="text-slate-800">{selectedTime || '-'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600">Consultation Fee</span>
                      <span className="text-slate-800 font-semibold">${doctor.consultationFee}</span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={handleSubmit}
                  disabled={!selectedDate || !selectedTime || !patientName || !patientEmail || !patientPhone || isSubmitting}
                  className="w-full mt-6 py-4 bg-teal-600 text-white font-semibold rounded-xl hover:bg-teal-700 transition-colors disabled:bg-slate-300 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? 'Booking...' : 'Confirm Booking'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
