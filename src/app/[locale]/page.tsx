"use client";

import Link from 'next/link';
import Image from 'next/image';
import { useEffect } from 'react';

export default function Home() {
  useEffect(() => {
    let currentTestimonial = 0;
    const testimonials = document.querySelectorAll('.testimonial-slide');
    
    function showTestimonial(n: number) {
        testimonials.forEach(slide => slide.classList.remove('active'));
        currentTestimonial = (n + testimonials.length) % testimonials.length;
        (testimonials[currentTestimonial] as HTMLElement).classList.add('active');
    }
    
    function nextTestimonial() {
        showTestimonial(currentTestimonial + 1);
    }
    
    // Auto rotate testimonials
    const interval = setInterval(nextTestimonial, 5000);

    // Initial display
    if (testimonials.length > 0) {
      showTestimonial(0);
    }

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {/* Hero Slider */}
      <div className="relative overflow-hidden">
        <div className="container mx-auto px-4 py-2 text-sm text-gray-600" itemScope itemType="https://schema.org/BreadcrumbList">
            <span itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
                <Link href="/" itemProp="item"><span itemProp="name">Home</span></Link>
                <meta itemProp="position" content="1" />
            </span>
        </div>
        <div className="hero-slide h-96 md:h-screen flex items-center relative" style={{ backgroundImage: `url('/images/home-banner-bg.jpg')` }}>
            <div className="absolute inset-0 bg-black bg-opacity-50"></div>
            <div className="container mx-auto px-4 relative z-10 text-white">
                <h1 className="text-3xl md:text-5xl font-bold mb-4">Welcome to The Brainy Insights</h1>
                <h4 className="text-xl md:text-2xl mb-6">We offer tailored research studies to help our clients stay ahead in the competition.</h4>
                <Link href="/about" className="inline-block bg-blue-700 hover:bg-blue-800 text-white font-bold py-3 px-6 rounded transition duration-300">Know More</Link>
            </div>
        </div>
      </div>

      {/* Clients Section */}
      <div className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
              <h2 className="text-3xl font-bold text-center text-blue-900 mb-12">Our Clients</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-8">
                  {/* Client logos would be repeated here */}
                  <div className="flex justify-center items-center p-4">
              <Image src="/images/clients/shell.jpg" alt="Shell" className="client-logo object-contain" width={100} height={64} />
            </div>
            <div className="flex justify-center items-center p-4">
              <Image src="/images/clients/fuzifilm.jpg" alt="Fujifilm" className="client-logo object-contain" width={100} height={64} />
            </div>
            <div className="flex justify-center items-center p-4">
              <Image src="/images/clients/sony.jpg" alt="Sony" className="client-logo object-contain" width={100} height={64} />
            </div>
            <div className="flex justify-center items-center p-4">
              <Image src="/images/clients/transcontinental.jpg" alt="Transcontinental" className="client-logo object-contain" width={100} height={64} />
            </div>
            <div className="flex justify-center items-center p-4">
              <Image src="/images/clients/microban.jpg" alt="Microban" className="client-logo object-contain" width={100} height={64} />
            </div>
            <div className="flex justify-center items-center p-4">
              <Image src="/images/clients/nestle.jpg" alt="Nestle" className="client-logo object-contain" width={100} height={64} />
            </div>
            <div className="flex justify-center items-center p-4">
              <Image src="/images/clients/ibm.jpg" alt="IBM" className="client-logo object-contain" width={100} height={64} />
            </div>
            <div className="flex justify-center items-center p-4">
              <Image src="/images/clients/microsoft.jpg" alt="Microsoft" className="client-logo object-contain" width={100} height={64} />
            </div>
            <div className="flex justify-center items-center p-4">
              <Image src="/images/clients/philips.jpg" alt="Philips" className="client-logo object-contain" width={100} height={64} />
            </div>
            <div className="flex justify-center items-center p-4">
              <Image src="/images/clients/panasonic.jpg" alt="Panasonic" className="client-logo object-contain" width={100} height={64} />
            </div>
            <div className="flex justify-center items-center p-4">
              <Image src="/images/clients/basf.jpg" alt="BASF" className="client-logo object-contain" width={100} height={64} />
            </div>
            <div className="flex justify-center items-center p-4">
              <Image src="/images/clients/honeywell.jpg" alt="Honeywell" className="client-logo object-contain" width={100} height={64} />
            </div>
              </div>
          </div>
      </div>

      {/* Services Section */}
      <div className="py-16 bg-white">
          <div className="container mx-auto px-4">
              <h2 className="text-3xl font-bold text-center text-blue-900 mb-12">Our Services</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  <div className="bg-gray-50 p-6 rounded-lg shadow-sm hover:shadow-md transition duration-300">
                      <h3 className="text-xl font-semibold text-blue-800 mb-3">Consulting Services</h3>
                      <p className="text-gray-600 mb-4">The Brainy Insights helps clients to process information into actionable insights through data analytics, providing new growth ...</p>
                      <Link href="/services#consulting" className="text-blue-700 font-medium hover:text-blue-900 inline-flex items-center">
                          Know More <i className="fas fa-arrow-right ml-2"></i>
                      </Link>
                  </div>
                  
                  <div className="bg-gray-50 p-6 rounded-lg shadow-sm hover:shadow-md transition duration-300">
                      <h3 className="text-xl font-semibold text-blue-800 mb-3">Tailored Insights</h3>
                      <p className="text-gray-600 mb-4">Every business is different or unique in its operation and requires a solution catering to its business model. Our customized reports ...</p>
                      <Link href="/services#tailored-insights" className="text-blue-700 font-medium hover:text-blue-900 inline-flex items-center">
                          Know More <i className="fas fa-arrow-right ml-2"></i>
                      </Link>
                  </div>
                  
                  <div className="bg-gray-50 p-6 rounded-lg shadow-sm hover:shadow-md transition duration-300">
                      <h3 className="text-xl font-semibold text-blue-800 mb-3">Emerging Technologies</h3>
                      <p className="text-gray-600 mb-4">With the use of fast and constantly changing digital technology and increasing use of the cloud to manage the business ...</p>
                      <Link href="/services#emerging-technologies" className="text-blue-700 font-medium hover:text-blue-900 inline-flex items-center">
                          Know More <i className="fas fa-arrow-right ml-2"></i>
                      </Link>
                  </div>
                  
                  <div className="bg-gray-50 p-6 rounded-lg shadow-sm hover:shadow-md transition duration-300">
                      <h3 className="text-xl font-semibold text-blue-800 mb-3">Syndicated Market Reports</h3>
                      <p className="text-gray-600 mb-4">The Brainy Insights offer reports on the niche as well as upcoming areas that could impact the different industries. Our syndicate ...</p>
                      <Link href="/services#syndicated-market-reports" className="text-blue-700 font-medium hover:text-blue-900 inline-flex items-center">
                          Know More <i className="fas fa-arrow-right ml-2"></i>
                      </Link>
                  </div>
                  
                  <div className="bg-gray-50 p-6 rounded-lg shadow-sm hover:shadow-md transition duration-300">
                      <h3 className="text-xl font-semibold text-blue-800 mb-3">Competitive Intelligence</h3>
                      <p className="text-gray-600 mb-4">With the help of competitive intelligence, we help our clients to gauge their position in the market place that is full of upcoming ...</p>
                      <Link href="/services#competitive-intelligence" className="text-blue-700 font-medium hover:text-blue-900 inline-flex items-center">
                          Know More <i className="fas fa-arrow-right ml-2"></i>
                      </Link>
                  </div>
                  
                  <div className="bg-gray-50 p-6 rounded-lg shadow-sm hover:shadow-md transition duration-300">
                      <h3 className="text-xl font-semibold text-blue-800 mb-3">Customer Research</h3>
                      <p className="text-gray-600 mb-4">The Brainy Insights conduct thorough research to understand consumer trends and how a consumer perceives a particular ...</p>
                      <Link href="/services#customer-research" className="text-blue-700 font-medium hover:text-blue-900 inline-flex items-center">
                          Know More <i className="fas fa-arrow-right ml-2"></i>
                      </Link>
                  </div>
              </div>
          </div>
      </div>

      {/* Why Choose Us */}
      <div className="py-16 bg-blue-900 text-white">
          <div className="container mx-auto px-4">
              <h2 className="text-3xl font-bold text-center mb-12">Why Choose Us</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                  <div className="text-center p-6">
                      <Image src="/images/final-analyst-support.png" alt="Analyst Support" className="mx-auto mb-4" width={80} height={80} />
                      <h4 className="text-xl font-semibold mb-2">Analyst Support</h4>
                      <p className="text-blue-200">Our team is available over call and email to assist you for pre &amp; post sale exigencies</p>
                  </div>
                  
                  <div className="text-center p-6">
                      <Image src="/images/final-competitive-pricing.png" alt="Competitive Pricing" className="mx-auto mb-4" width={80} height={80} />
                      <h4 className="text-xl font-semibold mb-2">Competitive Pricing</h4>
                      <p className="text-blue-200">Our pricing strategy is highly competitive in the market, without compensating on the quality and the timeline of project delivery</p>
                  </div>
                  
                  <div className="text-center p-6">
                      <Image src="/images/final-fast-delivery.png" alt="Fast Delivery" className="mx-auto mb-4" width={80} height={80} />
                      <h4 className="text-xl font-semibold mb-2">Fast Delivery</h4>
                      <p className="text-blue-200">With our humongous database of market intelligence reports, we make sure you get top-notch solutions with swift turnarounds that suit your deadlines</p>
                  </div>
                  
                  <div className="text-center p-6">
                      <Image src="/images/final-quality-reliability.png" alt="Quality & Reliability" className="mx-auto mb-4" width={80} height={80} />
                      <h4 className="text-xl font-semibold mb-2">Quality & Reliability</h4>
                      <p className="text-blue-200">We are committed in providing reliable and highly accurate data. We also have an excellent quality control system that validates the data collected and analysed</p>
                  </div>
              </div>
              <div className="text-center mt-12">
                  <Link href="/about#why-choose-us" className="inline-block bg-white hover:bg-gray-100 text-blue-900 font-bold py-3 px-6 rounded transition duration-300">Know More</Link>
              </div>
          </div>
      </div>

      {/* Testimonials */}
      <div className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
              <h2 className="text-3xl font-bold text-center text-blue-900 mb-12">What Clients Say</h2>
              
              <div className="max-w-4xl mx-auto relative">
                  <div className="testimonial-slide active">
                      <div className="bg-white p-8 rounded-lg shadow-sm">
                          <p className="text-gray-700 italic mb-6">"Thanks for the report. We've been going through it and see some good data on the market and players."</p>
                          <div className="flex items-center">
                              <div className="bg-blue-100 rounded-full w-12 h-12 flex items-center justify-center text-blue-800 font-bold">KB</div>
                              <div className="ml-4">
                                  <h6 className="font-semibold">Kennedy Brown</h6>
                                  <p className="text-gray-600 text-sm">Health Technology Innovation United States</p>
                              </div>
                          </div>
                      </div>
                  </div>
                  
                  <div className="testimonial-slide">
                      <div className="bg-white p-8 rounded-lg shadow-sm">
                          <p className="text-gray-700 italic mb-6">"Thanks a lot, as part of our work we regularly require market research reports across industries. I would like to understand the work done/ offerings by your organization in the field of market research and will be interested in long term arrangements for the future."</p>
                          <div className="flex items-center">
                              <div className="bg-blue-100 rounded-full w-12 h-12 flex items-center justify-center text-blue-800 font-bold">J</div>
                              <div className="ml-4">
                                  <h6 className="font-semibold">Jayesh</h6>
                                  <p className="text-gray-600 text-sm">Accenture Strategy USA</p>
                              </div>
                          </div>
                      </div>
                  </div>
                  
                  <div className="testimonial-slide">
                      <div className="bg-white p-8 rounded-lg shadow-sm">
                          <p className="text-gray-700 italic mb-6">"Thank you for your fast reply. The report arrived safe and sound, evrything looks all right. Thank you very much for your assitance and I will be looking forward to another opportunity for cooperation."</p>
                          <div className="flex items-center">
                              <div className="bg-blue-100 rounded-full w-12 h-12 flex items-center justify-center text-blue-800 font-bold">O</div>
                              <div className="ml-4">
                                  <h6 className="font-semibold">ONDŘEJ</h6>
                                  <p className="text-gray-600 text-sm">Analytics Department USA</p>
                              </div>
                          </div>
                      </div>
                  </div>
                  
                  <div className="testimonial-slide">
                      <div className="bg-white p-8 rounded-lg shadow-sm">
                                                    <p className="text-gray-700 italic mb-6">"The report looks good, and we believe the material mix is more realistic now. It is good to know you report &apos;Net&apos; Manufacturing Selling Price, as that can make a difference in how we view the numbers. The reports were great and we appreciate your working with us.&quot;</p>
                          <div className="flex items-center">
                              <div className="bg-blue-100 rounded-full w-12 h-12 flex items-center justify-center text-blue-800 font-bold">K</div>
                              <div className="ml-4">
                                  <h6 className="font-semibold">Karen</h6>
                                  <p className="text-gray-600 text-sm">The AMES Companies, Inc.USA</p>
                              </div>
                          </div>
                      </div>
                  </div>
                  
                  <div className="flex justify-between mt-6">
                      <button onClick={() => showTestimonial(currentTestimonial - 1)} className="text-blue-900 hover:text-blue-700">
                          <i className="fas fa-chevron-left mr-2"></i> Previous
                      </button>
                      <button onClick={() => showTestimonial(currentTestimonial + 1)} className="text-blue-900 hover:text-blue-700">
                          Next <i className="fas fa-chevron-right ml-2"></i>
                      </button>
                  </div>
              </div>
          </div>
      </div>

      {/* Latest Reports */}
      <div className="py-16 bg-white">
          <div className="container mx-auto px-4">
              <h2 className="text-3xl font-bold text-center text-blue-900 mb-12">Latest Reports by Categories</h2>
              
              <div className="flex flex-wrap justify-center gap-4 mb-8">
                  <Link href="#" className="flex flex-col items-center p-4 rounded-lg hover:bg-gray-50 transition duration-300">
                      <Image src="/images/goods.svg" alt="Consumer Goods" className="mb-2" width={64} height={64} />
                      <span className="text-blue-900 font-medium">Consumer Goods</span>
                  </Link>
                  
                  <Link href="#" className="flex flex-col items-center p-4 rounded-lg hover:bg-gray-50 transition duration-300">
                      <Image src="/images/food.svg" alt="Food & Beverages" className="mb-2" width={64} height={64} />
                      <span className="text-blue-900 font-medium">Food & Beverages</span>
                  </Link>
                  
                  <Link href="#" className="flex flex-col items-center p-4 rounded-lg hover:bg-gray-50 transition duration-300">
                      <Image src="/images/chemicals.svg" alt="Chemicals & Materials" className="mb-2" width={64} height={64} />
                      <span className="text-blue-900 font-medium">Chemicals & Materials</span>
                  </Link>
                  
                  <Link href="#" className="flex flex-col items-center p-4 rounded-lg hover:bg-gray-50 transition duration-300">
                      <Image src="/images/it-technology.svg" alt="Information Technology" className="mb-2" width={64} height={64} />
                      <span className="text-blue-900 font-medium">Information Technology & Semiconductors</span>
                  </Link>
                  
                  <Link href="#" className="flex flex-col items-center p-4 rounded-lg hover:bg-gray-50 transition duration-300">
                      <Image src="/images/medical-devices.svg" alt="Healthcare" className="mb-2" width={64} height={64} />
                      <span className="text-blue-900 font-medium">Healthcare</span>
                  </Link>
              </div>
              
              <div className="text-center">
                  <Image src="/images/ajax-loader.gif" alt="Loading" className="mx-auto" width={64} height={64} />
              </div>
          </div>
      </div>

      {/* Press Releases */}
      <div className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
              <h2 className="text-3xl font-bold text-center text-blue-900 mb-12">Press Release</h2>
              
              <div className="max-w-4xl mx-auto">
                  <div className="mb-8 pb-6 border-b border-gray-200">
                      <p className="text-gray-500 text-sm mb-2">Aug 20 2024</p>
                      <Link href="/press-release/home-insurance-market" className="text-xl font-semibold text-blue-900 hover:text-blue-700 mb-2 block">
                          Home Insurance Market Analysis and Forecast by 2033
                      </Link>
                      <p className="text-gray-600">The global home insurance market size is anticipated to grow from USD 259.75 billion to USD 531.38 billion in 10 years. The market will experience rapid growth due to product innov...</p>
                  </div>
                  
                  <div className="mb-8 pb-6 border-b border-gray-200">
                      <p className="text-gray-500 text-sm mb-2">Aug 20 2024</p>
                      <Link href="/press-release/cyber-insurance-market" className="text-xl font-semibold text-blue-900 hover:text-blue-700 mb-2 block">
                          Cyber Insurance Market Dynamics and Analysis by 2033
                      </Link>
                      <p className="text-gray-600">The global cyber insurance market size is anticipated to grow from USD 10.74 billion to USD 80.39 billion in 10 years. The market will experience rapid growth due to technological ...</p>
                  </div>
                  
                  <div className="mb-8 pb-6 border-b border-gray-200">
                      <p className="text-gray-500 text-sm mb-2">Jul 05 2023</p>
                      <Link href="/press-release/metaverse-market" className="text-xl font-semibold text-blue-900 hover:text-blue-700 mb-2 block">
                          Metaverse Market is Projected to Reach USD 2054.23 billion by 2032
                      </Link>
                      <p className="text-gray-600">The global metaverse market size is anticipated to grow from USD 50 billion to USD 2054.23 billion in 10 years: The market will experience rapid growth due to the rapid advancement...</p>
                  </div>
                  
                  <div className="text-center mt-8">
                      <Link href="/press-releases" className="inline-block bg-blue-700 hover:bg-blue-800 text-white font-bold py-3 px-6 rounded transition duration-300">Know More</Link>
                  </div>
              </div>
          </div>
      </div>

      {/* Facts Section */}
      <div className="py-16 bg-blue-800 text-white">
          <div className="container mx-auto px-4">
              <h2 className="text-3xl font-bold text-center mb-12">Some Facts About The Brainy Insights</h2>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                  <div className="text-center p-6">
                      <div className="text-4xl font-bold mb-2">1100+</div>
                      <p className="text-blue-200">Reports Published Per Year</p>
                  </div>
                  
                  <div className="text-center p-6">
                      <div className="text-4xl font-bold mb-2">50+</div>
                      <p className="text-blue-200">Consulting Projects Till Date</p>
                  </div>
                  
                  <div className="text-center p-6">
                      <div className="text-4xl font-bold mb-2">300+</div>
                      <p className="text-blue-200">Fortune 500 clients</p>
                  </div>
                  
                  <div className="text-center p-6">
                      <div className="text-4xl font-bold mb-2">200+</div>
                      <p className="text-blue-200">Analysts & Contract Consultants</p>
                  </div>
              </div>
          </div>
      </div>
    </>
  );
}