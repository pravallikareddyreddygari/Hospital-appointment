# Hospital Appointment System - Specification

## 1. Project Overview

**Project Name:** MedBook - Hospital Appointment System  
**Type:** Full-stack Web Application  
**Core Functionality:** A comprehensive hospital appointment booking system with doctor listings, slot scheduling, admin dashboard, email/SMS notifications, and video consultation capability via Zoom.  
**Target Users:** Patients seeking medical appointments, Hospital administrators, Doctors

## 2. Tech Stack

- **Frontend:** Next.js 14 (App Router), React, TypeScript
- **Styling:** Tailwind CSS
- **Database:** In-memory store (simulated with localStorage for demo)
- **APIs:** Zoom SDK for video consultations
- **Notifications:** Email/SMS simulation (console log + localStorage)

## 3. UI/UX Specification

### Color Palette
- **Primary:** `#0D9488` (Teal-600)
- **Primary Dark:** `#0F766E` (Teal-700)
- **Secondary:** `#F97316` (Orange-500)
- **Accent:** `#14B8A6` (Teal-500)
- **Background:** `#F8FAFC` (Slate-50)
- **Surface:** `#FFFFFF`
- **Text Primary:** `#1E293B` (Slate-800)
- **Text Secondary:** `#64748B` (Slate-500)
- **Success:** `#22C55E` (Green-500)
- **Error:** `#EF4444` (Red-500)
- **Warning:** `#F59E0B` (Amber-500)

### Typography
- **Font Family:** `Inter` (body), `Poppins` (headings)
- **Headings:**
  - H1: 36px, font-weight 700
  - H2: 28px, font-weight 600
  - H3: 22px, font-weight 600
- **Body:** 16px, font-weight 400
- **Small:** 14px, font-weight 400

### Layout Structure
- **Header:** Fixed top navigation with logo, nav links, user menu
- **Main Content:** Full-width with max-width 1280px, centered
- **Responsive Breakpoints:**
  - Mobile: < 640px
  - Tablet: 640px - 1024px
  - Desktop: > 1024px

### Components

#### Navigation Bar
- Logo (left)
- Nav links: Home, Doctors, My Appointments, Video Consultation
- User menu (right): Login/Register or Profile dropdown

#### Doctor Card
- Photo, Name, Specialty, Rating, Available slots badge
- Hover: subtle shadow elevation
- Click: navigate to booking

#### Slot Picker
- Calendar view showing available dates
- Time slots grid (morning/afternoon/evening)
- Selected state: teal background
- Unavailable: grayed out

#### Appointment Card
- Doctor info, Date/Time, Status badge
- Actions: Join Video Call, Cancel

#### Admin Dashboard
- Statistics cards: Total Appointments, Today's Slots, Active Doctors
- Charts: Appointment trends, Popular specialties
- Table: Recent appointments with actions

## 4. Functionality Specification

### Pages & Routes

1. **Home Page** (`/`)
   - Hero section with search
   - Featured doctors carousel
   - How it works section
   - Testimonials

2. **Doctors Listing** (`/doctors`)
   - Search by name/specialty
   - Filter by specialty, availability
   - Grid of doctor cards

3. **Doctor Detail** (`/doctors/[id]`)
   - Full doctor profile
   - Availability calendar
   - Book appointment button

4. **Booking** (`/book/[doctorId]`)
   - Select date
   - Select time slot
   - Patient details form
   - Confirm booking

5. **My Appointments** (`/appointments`)
   - List of booked appointments
   - Filter: upcoming/past
   - Cancel appointment

6. **Video Consultation** (`/video/[appointmentId]`)
   - Zoom meeting integration
   - Waiting room UI

7. **Admin Dashboard** (`/admin`)
   - Statistics overview
   - Manage doctors
   - View all appointments
   - Analytics

### Core Features

#### Doctor Listing
- View all doctors with search/filter
- Sort by rating, availability
- Specialty categories: General, Cardiology, Dermatology, Pediatrics, Orthopedics, Neurology

#### Slot Booking
- 30-minute slots, 9 AM - 5 PM
- Real-time availability check
- Conflict prevention
- Confirmation via email/SMS

#### Admin Dashboard
- Add/edit/remove doctors
- View all appointments
- Analytics: daily/weekly/monthly trends
- Export functionality

#### Email/SMS Confirmation
- Booking confirmation email (simulated)
- Reminder before appointment
- Cancellation confirmation

#### Video Consultation (Zoom)
- Generate Zoom meeting link
- Join meeting from appointment card
- Meeting status tracking

### Data Models

```typescript
interface Doctor {
  id: string;
  name: string;
  specialty: string;
  photo: string;
  rating: number;
  experience: number;
  about: string;
  availableSlots: string[];
}

interface Appointment {
  id: string;
  doctorId: string;
  patientName: string;
  patientEmail: string;
  patientPhone: string;
  date: string;
  time: string;
  status: 'confirmed' | 'completed' | 'cancelled';
  zoomLink?: string;
  createdAt: string;
}

interface User {
  id: string;
  name: string;
  email: string;
  role: 'patient' | 'admin';
}
```

## 5. Acceptance Criteria

- [ ] Home page loads with hero, featured doctors, how it works
- [ ] Doctors page displays all doctors with search/filter
- [ ] Can view doctor detail and availability
- [ ] Can book appointment with slot selection
- [ ] My Appointments page shows all user bookings
- [ ] Can cancel appointment
- [ ] Video consultation page shows Zoom integration
- [ ] Admin dashboard shows statistics and management
- [ ] Responsive design works on mobile/tablet/desktop
- [ ] No console errors on page load
- [ ] Smooth animations and transitions