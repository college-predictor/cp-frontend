import Link from 'next/link';
import { Facebook, Twitter, Instagram, Youtube, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="bg-blue-600 text-white p-2 rounded-lg">
                <span className="font-bold text-lg">EP</span>
              </div>
              <span className="text-xl font-bold">EduPortal</span>
            </div>
            <p className="text-gray-300 mb-4">
              Your trusted partner in educational journey. Find the best colleges, exams, and courses in India.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Youtube className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link href="/colleges" className="text-gray-300 hover:text-white transition-colors">Top Colleges</Link></li>
              <li><Link href="/exams" className="text-gray-300 hover:text-white transition-colors">Popular Exams</Link></li>
              <li><Link href="/courses" className="text-gray-300 hover:text-white transition-colors">Courses</Link></li>
              <li><Link href="/predictor" className="text-gray-300 hover:text-white transition-colors">College Predictor</Link></li>
              <li><Link href="/reviews" className="text-gray-300 hover:text-white transition-colors">Reviews</Link></li>
              <li><Link href="/forums" className="text-gray-300 hover:text-white transition-colors">Discussion Forums</Link></li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Resources</h3>
            <ul className="space-y-2">
              <li><Link href="/news" className="text-gray-300 hover:text-white transition-colors">Education News</Link></li>
              <li><Link href="/articles" className="text-gray-300 hover:text-white transition-colors">Articles</Link></li>
              <li><Link href="/guides" className="text-gray-300 hover:text-white transition-colors">Study Guides</Link></li>
              <li><Link href="/scholarships" className="text-gray-300 hover:text-white transition-colors">Scholarships</Link></li>
              <li><Link href="/career-guidance" className="text-gray-300 hover:text-white transition-colors">Career Guidance</Link></li>
              <li><Link href="/blog" className="text-gray-300 hover:text-white transition-colors">Blog</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <MapPin className="h-5 w-5 text-gray-400 flex-shrink-0" />
                <span className="text-gray-300">123 Education Street, New Delhi, India</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-gray-400 flex-shrink-0" />
                <span className="text-gray-300">+91 9876543210</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-gray-400 flex-shrink-0" />
                <span className="text-gray-300">info@eduportal.com</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm mb-4 md:mb-0">
              © 2024 EduPortal. All rights reserved.
            </p>
            <div className="flex space-x-6 text-sm">
              <Link href="/privacy" className="text-gray-400 hover:text-white transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-gray-400 hover:text-white transition-colors">
                Terms of Service
              </Link>
              <Link href="/contact" className="text-gray-400 hover:text-white transition-colors">
                Contact
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;