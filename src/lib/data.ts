import { Doctor, Appointment, User } from '@/types';

export const doctors: Doctor[] = [
  {
    id: '1',
    name: 'Dr. Sarah Johnson',
    specialty: 'Cardiology',
    photo: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&h=400&fit=crop&crop=face',
    rating: 4.9,
    experience: 15,
    about: 'Highly skilled cardiologist with extensive expertise in diagnosing and treating cardiovascular diseases. Specializes in preventive cardiology, coronary artery disease management, and advanced cardiac interventions.',
    availableSlots: generateSlots(),
    consultationFee: 150,
  },
  {
    id: '2',
    name: 'Dr. Michael Chen',
    specialty: 'Dermatology',
    photo: 'https://static.vecteezy.com/system/resources/thumbnails/026/375/249/small/ai-generative-portrait-of-confident-male-doctor-in-white-coat-and-stethoscope-standing-with-arms-crossed-and-looking-at-camera-photo.jpg',
    rating: 4.8,
    experience: 12,
    about: 'Expert dermatologist with comprehensive knowledge in treating skin conditions, acne management, and cosmetic procedures. Dedicated to providing personalized skincare solutions for all age groups.',
    availableSlots: generateSlots(),
    consultationFee: 120,
  },
  {
    id: '3',
    name: 'Dr. Emily Williams',
    specialty: 'Pediatrics',
    photo: 'https://static.vecteezy.com/system/resources/thumbnails/028/287/555/small/an-indian-young-female-doctor-isolated-on-green-ai-generated-photo.jpg',
    rating: 4.9,
    experience: 10,
    about: 'Compassionate pediatrician with specialized training in child healthcare and development. Provides comprehensive medical care from infancy through adolescence with a focus on preventive medicine.',
    availableSlots: generateSlots(),
    consultationFee: 100,
  },
  {
    id: '4',
    name: 'Dr. James Martinez',
    specialty: 'Orthopedics',
    photo: 'https://plus.unsplash.com/premium_photo-1658506671316-0b293df7c72b?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    rating: 4.7,
    experience: 18,
    about: 'Experienced orthopedic surgeon specializing in sports medicine, joint replacement, and minimally invasive surgical techniques. Committed to restoring mobility and improving quality of life.',
    availableSlots: generateSlots(),
    consultationFee: 180,
  },
  {
    id: '5',
    name: 'Dr. Lisa Anderson',
    specialty: 'Neurology',
    photo: 'https://img.freepik.com/free-photo/portrait-mature-therapist-sitting-table-looking-camera_1098-18156.jpg?semt=ais_hybrid&w=740&q=80',
    rating: 4.8,
    experience: 14,
    about: 'Highly qualified neurologist with expertise in diagnosing and treating neurological disorders. Specializes in headache management, epilepsy treatment, and movement disorder management.',
    availableSlots: generateSlots(),
    consultationFee: 160,
  },
  {
    id: '6',
    name: 'Dr. Robert Taylor',
    specialty: 'General',
    photo: 'https://static.vecteezy.com/system/resources/thumbnails/028/287/384/small/a-mature-indian-male-doctor-on-a-white-background-ai-generated-photo.jpg',
    rating: 4.6,
    experience: 20,
    about: 'Experienced general practitioner with extensive background in primary care and preventive medicine. Provides comprehensive healthcare services and chronic disease management for patients of all ages.',
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
- Consultation Fee: ${doctor.consultationFee}

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
