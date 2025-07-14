import Link from 'next/link';

export default function HeroSection() {
  return (
    <section className="relative bg-gradient-to-br from-blue-600 to-purple-700 min-h-screen flex items-center">
      <div className="absolute inset-0 bg-black opacity-20"></div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Creative Digital Solutions
            <span className="block text-yellow-400">That Drive Results</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-200 mb-8 max-w-2xl mx-auto">
            We craft exceptional digital experiences through innovative design, 
            cutting-edge development, and strategic thinking.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/projects"
              className="bg-white text-gray-900 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              View Our Work
            </Link>
            <Link
              href="/contact"
              className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-gray-900 transition-colors"
            >
              Start a Project
            </Link>
          </div>
        </div>
      </div>
      
      {/* Decorative elements */}
      <div className="absolute bottom-0 left-0 w-full h-20 bg-gradient-to-t from-white to-transparent"></div>
      
      {/* Animated background elements */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-white opacity-10 rounded-full animate-pulse"></div>
      <div className="absolute bottom-40 right-10 w-16 h-16 bg-yellow-400 opacity-20 rounded-full animate-bounce"></div>
      <div className="absolute top-1/2 left-1/4 w-12 h-12 bg-purple-400 opacity-15 rounded-full animate-ping"></div>
    </section>
  );
}