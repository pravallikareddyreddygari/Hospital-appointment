import { Doctor, Appointment, User } from '@/types';

export const doctors: Doctor[] = [
  {
    id: '1',
    name: 'Dr. Sarah Johnson',
    specialty: 'Cardiology',
    photo: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&h=400&fit=crop&crop=face',
    rating: 4.9,
    experience: 15,
    about: 'Dr. Sarah Johnson is a board-certified cardiologist with over 15 years of experience in treating heart conditions. She specializes in preventive cardiology and heart disease management.',
    availableSlots: generateSlots(),
    consultationFee: 150,
  },
  {
    id: '2',
    name: 'Dr. Michael Chen',
    specialty: 'Dermatology',
    photo: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&h=400&fit=crop&crop=face',
    rating: 4.8,
    experience: 12,
    about: 'Dr. Michael Chen is a renowned dermatologist specializing in skin cancer detection, acne treatment, and cosmetic dermatology procedures.',
    availableSlots: generateSlots(),
    consultationFee: 120,
  },
  {
    id: '3',
    name: 'Dr. Emily Williams',
    specialty: 'Pediatrics',
    photo: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=400&h=400&fit=crop&crop=face',
    rating: 4.9,
    experience: 10,
    about: 'Dr. Emily Williams is a compassionate pediatrician dedicated to providing comprehensive care for children from infancy through adolescence.',
    availableSlots: generateSlots(),
    consultationFee: 100,
  },
  {
    id: '4',
    name: 'Dr. James Martinez',
    specialty: 'Orthopedics',
    photo: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=400&h=400&fit=crop&crop=face',
    rating: 4.7,
    experience: 18,
    about: 'Dr. James Martinez is an orthopedic surgeon specializing in sports medicine, joint replacement, and minimally invasive procedures.',
    availableSlots: generateSlots(),
    consultationFee: 180,
  },
  {
    id: '5',
    name: 'Dr. Lisa Anderson',
    specialty: 'Neurology',
    photo: 'https://images.unsplash.com/photo-1651008376811-b90baee60c1f?w=400&h=400&fit=crop&crop=face',
    rating: 4.8,
    experience: 14,
    about: 'Dr. Lisa Anderson is a neurologist expert in treating disorders of the nervous system, including headaches, epilepsy, and movement disorders.',
    availableSlots: generateSlots(),
    consultationFee: 160,
  },
  {
    id: '6',
    name: 'Dr. Robert Taylor',
    specialty: 'General',
    photo: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?w=400&h=400&fit=crop&crop=face',
    rating: 4.6,
    experience: 20,
    about: 'Dr. Robert Taylor is a general practitioner with extensive experience in primary care, preventive medicine, and chronic disease management.',
    availableSlots: generateSlots(),
    consultationFee: 80,
  },
];

function generateSlots(): string[] {
  const slots: string[] = [];
  const times = ['09:00', '09:30', '10:00', '10:30', '11:00', '11:30', '14:00', '14:30', '15:00', '15:30', '16:00', '16:30'];
  
  for (let i = 0; i < 14; i++) {
    const date = new Date();
    date.setDate(date.getDate() + i);
    const dateStr = date.toISOString().split('T')[0];
    
    times.forEach(time => {
      if (Math.random() > 0.3) {
        slots.push(`${dateStr}T${time}`);
      }
    });
  }
  
  return slots;
}

export const specialties = [
  'All',
  'General',
  'Cardiology',
  'Dermatology',
  'Pediatrics',
  'Orthopedics',
  'Neurology',
];

export const timeSlots = [
  '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
  '14:00', '14:30', '15:00', '15:30', '16:00', '16:30'
];

export const currentUser: User = {
  id: 'user-1',
  name: 'John Doe',
  email: 'john@example.com',
  role: 'patient',
};

export const adminUser: User = {
  id: 'admin-1',
  name: 'Admin User',
  email: 'admin@medbook.com',
  role: 'admin',
};

export function generateZoomLink(appointmentId: string): { link: string; meetingId: string } {
  const meetingId = Math.random().toString().slice(2, 13);
  return {
    link: `https://zoom.us/j/${meetingId}`,
    meetingId,
  };
}

export function sendEmailConfirmation(appointment: Appointment, doctor: Doctor): void {
  console.log('=== EMAIL CONFIRMATION ===');
  console.log(`To: ${appointment.patientEmail}`);
  console.log(`Subject: Appointment Confirmed - MedBook`);
  console.log(`
Dear ${appointment.patientName},

Your appointment has been successfully booked!

Appointment Details:
- Doctor: ${doctor.name}
- Specialty: ${doctor.specialty}
- Date: ${appointment.date}
- Time: ${appointment.time}
- Consultation Fee: $${doctor.consultationFee}

${appointment.zoomLink ? `Video Consultation Link: ${appointment.zoomLink}` : ''}

Thank you for choosing MedBook!

Best regards,
MedBook Team
  `);
}

export function sendSMSConfirmation(appointment: Appointment): void {
  console.log('=== SMS CONFIRMATION ===');
  console.log(`To: ${appointment.patientPhone}`);
  console.log(`MedBook: Your appointment with ${appointment.doctorName} on ${appointment.date} at ${appointment.time} is confirmed.`);
}
