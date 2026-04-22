'use client';

import { Appointment, Doctor } from '@/types';
import { generateZoomLink, sendEmailConfirmation, sendSMSConfirmation } from './data';

const STORAGE_KEY = 'medbook_appointments';

export function getAppointments(): Appointment[] {
  if (typeof window === 'undefined') return [];
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : [];
}

export function saveAppointment(appointment: Omit<Appointment, 'id' | 'zoomLink' | 'zoomMeetingId' | 'createdAt'>, doctor: Doctor): Appointment {
  const appointments = getAppointments();
  const { link, meetingId } = generateZoomLink(`apt-${Date.now()}`);
  
  const newAppointment: Appointment = {
    ...appointment,
    id: `apt-${Date.now()}`,
    zoomLink: link,
    zoomMeetingId: meetingId,
    createdAt: new Date().toISOString(),
  };
  
  appointments.push(newAppointment);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(appointments));
  
  sendEmailConfirmation(newAppointment, doctor);
  sendSMSConfirmation(newAppointment);
  
  return newAppointment;
}

export function cancelAppointment(id: string): void {
  const appointments = getAppointments();
  const index = appointments.findIndex(apt => apt.id === id);
  if (index !== -1) {
    appointments[index].status = 'cancelled';
    localStorage.setItem(STORAGE_KEY, JSON.stringify(appointments));
  }
}

export function completeAppointment(id: string): void {
  const appointments = getAppointments();
  const index = appointments.findIndex(apt => apt.id === id);
  if (index !== -1) {
    appointments[index].status = 'completed';
    localStorage.setItem(STORAGE_KEY, JSON.stringify(appointments));
  }
}

export function getAppointmentById(id: string): Appointment | undefined {
  return getAppointments().find(apt => apt.id === id);
}

export function getAppointmentsByDoctor(doctorId: string): Appointment[] {
  return getAppointments().filter(apt => apt.doctorId === doctorId);
}

export function isSlotBooked(doctorId: string, date: string, time: string): boolean {
  return getAppointments().some(
    apt => apt.doctorId === doctorId && apt.date === date && apt.time === time && apt.status !== 'cancelled'
  );
}

export function getBookedSlots(doctorId: string, date: string): string[] {
  return getAppointments()
    .filter(apt => apt.doctorId === doctorId && apt.date === date && apt.status !== 'cancelled')
    .map(apt => apt.time);
}
