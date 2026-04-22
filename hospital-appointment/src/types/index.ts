export interface Doctor {
  id: string;
  name: string;
  specialty: string;
  photo: string;
  rating: number;
  experience: number;
  about: string;
  availableSlots: string[];
  consultationFee: number;
}

export interface Appointment {
  id: string;
  doctorId: string;
  doctorName: string;
  patientName: string;
  patientEmail: string;
  patientPhone: string;
  date: string;
  time: string;
  status: 'confirmed' | 'completed' | 'cancelled';
  zoomLink?: string;
  zoomMeetingId?: string;
  createdAt: string;
  specialty: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'patient' | 'admin';
}