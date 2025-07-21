import React from 'react'
import BseChartSection from '../bsechartSection/bsechartSection'
import TopPerformingFunds from './typesofmfTop5/page'
import Link from 'next/link'


const MutalFundSection = () => {
  return (
    <div>
       <div className="bg-[var(--rv-ternary)]">
      <div className="max-w-screen-xl mx-auto  main_section">
         <h2 className="text-4xl font-bold mb-6 text-[var(--rv-white)] items-center text-center" initial={{ x: -100, opacity: 0 }}
          // animate={isInView ? { x: 0, opacity: 1 } : {}}
          // transition={{ duration: 0.6, ease: "easeOut" }}
          >
            Explore <span className="text-[var(--rv-secondary)]">Top Funds</span>
          </h2>
        <div className='grid grid-cols-1 md:grid-cols-2'>
            <BseChartSection/>
            <TopPerformingFunds />
        </div>
        <div>
        
            <div className=" mt-5 text-center">
              <Link href="/performance/fund-performance">
                <span className="inline-block bg-white text-[var(--rv-primary)] font-semibold px-6 py-2 rounded hover:bg-gray-100 transition">
                  View All Funds
                </span>
              </Link>
            </div>
         
        </div>
      </div>
    </div>
    </div>
  )
}

export default MutalFundSection
