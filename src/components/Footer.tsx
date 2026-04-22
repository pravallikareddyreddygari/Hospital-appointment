import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-10 h-10 bg-teal-600 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
              </div>
              <span className="text-xl font-bold">MedBook</span>
            </div>
            <p className="text-slate-400 text-sm">
              Your trusted platform for booking medical appointments and video consultations.
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-slate-400 text-sm">
              <li><Link href="/doctors" className="hover:text-teal-400 transition-colors">Find Doctors</Link></li>
              <li><Link href="/appointments" className="hover:text-teal-400 transition-colors">My Appointments</Link></li>
              <li><Link href="/video" className="hover:text-teal-400 transition-colors">Video Consultation</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Specialties</h4>
            <ul className="space-y-2 text-slate-400 text-sm">
              <li><Link href="/doctors?specialty=Cardiology" className="hover:text-teal-400 transition-colors">Cardiology</Link></li>
              <li><Link href="/doctors?specialty=Dermatology" className="hover:text-teal-400 transition-colors">Dermatology</Link></li>
              <li><Link href="/doctors?specialty=Pediatrics" className="hover:text-teal-400 transition-colors">Pediatrics</Link></li>
              <li><Link href="/doctors?specialty=Neurology" className="hover:text-teal-400 transition-colors">Neurology</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Contact</h4>
            <ul className="space-y-2 text-slate-400 text-sm">
              <li>123 Medical Center Dr</li>
              <li>Healthcare City, HC 12345</li>
              <li>support@medbook.com</li>
              <li>1-800-MEDBOOK</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-800 mt-8 pt-8 text-center text-slate-400 text-sm">
          <p>&copy; {new Date().getFullYear()} MedBook. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
