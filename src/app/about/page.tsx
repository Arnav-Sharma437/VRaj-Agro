import React from 'react';
import Link from 'next/link';
import { 
  Eye, 
  Target, 
  ShieldCheck, 
  Award, 
  Cpu, 
  Headphones, 
  Clock, 
  Boxes, 
  Coins, 
  Check, 
  Quote, 
  ArrowRight,
  ChevronRight
} from 'lucide-react';
import AboutImage from '@/components/main/AboutImage';

export const metadata = {
  title: 'About Us | V.Raj Agro',
  description: 'Learn about V.Raj Agro - trusted manufacturer of concrete mixer machines and agricultural machinery since 1998.'
};

export default function AboutPage() {
  const whyChooseUsDetails = [
    {
      title: "High-Quality Machinery",
      description: "We use premium materials for long-lasting performance.",
      icon: Award
    },
    {
      title: "Advanced Technology",
      description: "Modern manufacturing processes for better efficiency.",
      icon: Cpu
    },
    {
      title: "Expert Support",
      description: "Dedicated team for after-sales service and guidance.",
      icon: Headphones
    },
    {
      title: "On-Time Delivery",
      description: "We ensure timely delivery across all locations.",
      icon: Clock
    },
    {
      title: "Wide Product Range",
      description: "From concrete mixers to agricultural threshers.",
      icon: Boxes
    },
    {
      title: "Cost-Effective",
      description: "Best quality at competitive prices.",
      icon: Coins
    }
  ];

  return (
    <div className="bg-white min-h-screen">
      {/* Section 1: Page Banner */}
      <section className="bg-[#cc0000] text-white h-[140px] md:h-[180px] flex flex-col justify-center px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto w-full">
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">About Us</h1>
          <nav className="mt-2 flex items-center text-sm font-medium opacity-90">
            <Link href="/" className="hover:underline">Home</Link>
            <ChevronRight size={14} className="mx-2" />
            <span className="text-white/80">About Us</span>
          </nav>
        </div>
      </section>

      {/* Section 2: Who Are We */}
      <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Column: Image placeholder with machinery icon */}
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-[#cc0000] to-[#f5a623] rounded-2xl blur opacity-10 group-hover:opacity-25 transition duration-1000"></div>
            <AboutImage />
          </div>

          {/* Right Column: Text and CTA */}
          <div className="flex flex-col justify-center">
            <div className="flex items-center gap-3 mb-4">
              <span className="w-12 h-1 bg-[#cc0000] rounded-full"></span>
              <span className="text-[#cc0000] text-sm font-bold uppercase tracking-wider">Since 1998</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#1a1a1a] mb-6">
              Who Are We?
            </h2>
            <p className="text-[#444444] text-base leading-relaxed mb-6">
              Founded in 1998, V.Raj Agro has proudly established itself as a trusted manufacturer 
              of high-quality Concrete Mixer Machines and a wide range of agricultural machinery. 
              With decades of experience and an unwavering commitment to excellence, we continuously 
              meet the evolving needs of the construction and agriculture sectors across India.
            </p>
            <p className="text-[#444444] text-base leading-relaxed mb-8">
              Our product range includes all types of Concrete Mixer Machines, Chaff Cutters, 
              Agricultural Threshers, Water Tankers, and more — designed to deliver reliable 
              performance, efficiency, and durability for both small-scale and large-scale projects.
            </p>
            <div>
              <Link 
                href="/shop"
                className="inline-flex items-center gap-2 bg-[#cc0000] hover:bg-[#aa0000] text-white font-bold uppercase tracking-wider px-6 py-3.5 rounded shadow-md transition-all duration-300 hover:translate-x-1"
              >
                <span>View Our Products</span>
                <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Section 3: Vision, Mission, Values */}
      <section className="bg-[#f5f5f5] py-16 sm:py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-10">
            {/* Card 1 — Our Vision */}
            <div className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-md transition-all duration-350 flex flex-col h-full border border-gray-100 group">
              <div className="bg-red-50 p-4 rounded-xl text-[#cc0000] w-fit mb-6 transition-colors duration-300 group-hover:bg-[#cc0000] group-hover:text-white">
                <Eye size={32} />
              </div>
              <h3 className="text-xl font-bold text-[#1a1a1a] mb-4">Our Vision</h3>
              <p className="text-[#444444] text-sm leading-relaxed">
                To become a leading global manufacturer, offering sustainable solutions 
                that shape the future of farming and construction excellence.
              </p>
            </div>

            {/* Card 2 — Our Mission */}
            <div className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-md transition-all duration-350 flex flex-col h-full border border-gray-100 group">
              <div className="bg-red-50 p-4 rounded-xl text-[#cc0000] w-fit mb-6 transition-colors duration-300 group-hover:bg-[#cc0000] group-hover:text-white">
                <Target size={32} />
              </div>
              <h3 className="text-xl font-bold text-[#1a1a1a] mb-4">Our Mission</h3>
              <p className="text-[#444444] text-sm leading-relaxed">
                To deliver innovative, efficient, and reliable machines that empower 
                construction and agriculture industries for maximum productivity and growth.
              </p>
            </div>

            {/* Card 3 — Why Choose Us */}
            <div className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-md transition-all duration-350 flex flex-col h-full border border-gray-100 group">
              <div className="bg-red-50 p-4 rounded-xl text-[#cc0000] w-fit mb-6 transition-colors duration-300 group-hover:bg-[#cc0000] group-hover:text-white">
                <ShieldCheck size={32} />
              </div>
              <h3 className="text-xl font-bold text-[#1a1a1a] mb-4">Why Choose Us</h3>
              <p className="text-[#444444] text-sm leading-relaxed">
                We ensure quality, durability, and customer satisfaction through advanced 
                machinery, timely delivery, and trusted after-sales support.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 4: Why Choose Us (detailed) */}
      <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#1a1a1a]">
            Why Choose V.Raj Agro?
          </h2>
          <div className="w-20 h-1 bg-[#cc0000] mx-auto mt-4 rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {whyChooseUsDetails.map((feature, i) => {
            const Icon = feature.icon;
            return (
              <div 
                key={i} 
                className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg hover:border-transparent transition-all duration-300 flex items-start gap-4"
              >
                <div className="bg-yellow-50 p-3 rounded-lg text-[#f5a623] shrink-0">
                  <Icon size={24} />
                </div>
                <div>
                  <h4 className="text-lg font-bold text-[#1a1a1a] mb-2">{feature.title}</h4>
                  <p className="text-[#444444] text-sm leading-relaxed">{feature.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Section 5: Stats Bar */}
      <section className="bg-[#1a1a1a] py-12 sm:py-16 text-white px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            {/* Stat 1 */}
            <div className="flex flex-col items-center">
              <span className="text-[#f5a623] text-4xl sm:text-5xl font-extrabold tracking-tight">25+</span>
              <span className="text-gray-400 text-sm font-semibold uppercase tracking-wider mt-2">Years of Experience</span>
            </div>
            {/* Stat 2 */}
            <div className="flex flex-col items-center">
              <span className="text-[#f5a623] text-4xl sm:text-5xl font-extrabold tracking-tight">500+</span>
              <span className="text-gray-400 text-sm font-semibold uppercase tracking-wider mt-2">Happy Clients</span>
            </div>
            {/* Stat 3 */}
            <div className="flex flex-col items-center">
              <span className="text-[#f5a623] text-4xl sm:text-5xl font-extrabold tracking-tight">50+</span>
              <span className="text-gray-400 text-sm font-semibold uppercase tracking-wider mt-2">Products Available</span>
            </div>
            {/* Stat 4 */}
            <div className="flex flex-col items-center">
              <span className="text-[#f5a623] text-4xl sm:text-5xl font-extrabold tracking-tight">10+</span>
              <span className="text-gray-400 text-sm font-semibold uppercase tracking-wider mt-2">States Served</span>
            </div>
          </div>
        </div>
      </section>

      {/* Section 6: Our Commitment */}
      <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Column: Quality text and checks */}
          <div>
            <h2 className="text-3xl font-extrabold text-[#1a1a1a] mb-6">Our Commitment to Quality</h2>
            <p className="text-[#444444] text-base leading-relaxed mb-5">
              At V.Raj Agro, quality is not just a standard — it&apos;s our promise. Every machine 
              we manufacture goes through rigorous quality checks to ensure it meets the highest 
              standards of performance and durability.
            </p>
            <p className="text-[#444444] text-base leading-relaxed mb-8">
              We are committed to empowering Indian farmers and construction professionals with 
              machinery that makes their work easier, faster, and more productive.
            </p>
            
            <ul className="space-y-4">
              {[
                "ISO quality standards followed",
                "Rigorous testing before delivery",
                "Genuine spare parts available",
                "Trained technical support team"
              ].map((item, idx) => (
                <li key={idx} className="flex items-center gap-3 text-gray-800 font-medium text-sm sm:text-base">
                  <span className="bg-red-50 text-[#cc0000] p-1 rounded-full shrink-0">
                    <Check size={16} strokeWidth={3} />
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Right Column: Yellow Quote Card */}
          <div className="relative bg-[#f5a623] rounded-2xl p-8 sm:p-10 shadow-lg text-white overflow-hidden group">
            {/* Quote watermark icon */}
            <div className="absolute -right-6 -bottom-6 text-white/10 select-none">
              <Quote size={200} className="rotate-180 transform" />
            </div>
            
            <div className="relative z-10 flex flex-col h-full justify-between">
              <div className="mb-8">
                <Quote size={48} className="text-white opacity-80 mb-4" />
                <blockquote className="text-xl sm:text-2xl font-bold leading-snug">
                  &ldquo;Building a stronger India through quality machinery and agricultural innovation since 1998.&rdquo;
                </blockquote>
              </div>
              <div>
                <p className="text-lg font-extrabold uppercase tracking-wider">— V.Raj Agro Team</p>
                <div className="w-10 h-0.5 bg-white mt-1 rounded-full"></div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
