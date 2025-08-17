import { ShoppingCart, Github, Mail, Heart } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-white border-t border-secondary-200">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2 text-xl font-bold text-primary-600">
              <ShoppingCart className="h-8 w-8" />
              <span>CumRoad</span>
            </div>
            <p className="text-secondary-600 text-sm">
              A digital marketplace for creators to sell their products and buyers to discover amazing content.
            </p>
          </div>

          {/* Product */}
          <div>
            <h3 className="text-sm font-semibold text-secondary-900 tracking-wider uppercase mb-4">
              Product
            </h3>
            <ul className="space-y-2">
              <li>
                <a href="/products" className="text-secondary-600 hover:text-primary-600 transition-colors text-sm">
                  Browse Products
                </a>
              </li>
              <li>
                <a href="/products/new" className="text-secondary-600 hover:text-primary-600 transition-colors text-sm">
                  Sell Products
                </a>
              </li>
              <li>
                <a href="/dashboard" className="text-secondary-600 hover:text-primary-600 transition-colors text-sm">
                  Dashboard
                </a>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-sm font-semibold text-secondary-900 tracking-wider uppercase mb-4">
              Support
            </h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-secondary-600 hover:text-primary-600 transition-colors text-sm">
                  Help Center
                </a>
              </li>
              <li>
                <a href="#" className="text-secondary-600 hover:text-primary-600 transition-colors text-sm">
                  Contact Us
                </a>
              </li>
              <li>
                <a href="#" className="text-secondary-600 hover:text-primary-600 transition-colors text-sm">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="text-secondary-600 hover:text-primary-600 transition-colors text-sm">
                  Terms of Service
                </a>
              </li>
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h3 className="text-sm font-semibold text-secondary-900 tracking-wider uppercase mb-4">
              Connect
            </h3>
            <div className="flex space-x-4">
              <a
                href="#"
                className="text-secondary-400 hover:text-primary-600 transition-colors"
              >
                <Github className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="text-secondary-400 hover:text-primary-600 transition-colors"
              >
                <Mail className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-secondary-200">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-secondary-500 text-sm">
              © 2025 CumRoad Clone. Built for learning purposes.
            </p>
            <p className="text-secondary-500 text-sm flex items-center mt-4 md:mt-0">
              Made with <Heart className="h-4 w-4 text-red-500 mx-1" /> for creators
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
