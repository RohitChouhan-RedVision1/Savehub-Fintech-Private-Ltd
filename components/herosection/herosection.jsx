// components/GetStartedBanner.tsx
'use client';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function HeroSection({sitedata}) {
  return (
    <section className="realative top-0 w-full h-[770px]  bg-[url('/Herosection.jpg')] bg-cover bg-bottom text-[var(--rv-white)] ">
      <div className="max-w-screen-xl mx-auto px-2 md:px-0 pt-42 md:pt-42">
        <motion.h1 className="text-4xl md:text-[60px] font-bold mb-4"
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 1, duration: 0.8 }}
        >
          Invest in <br /> Professionally <br /> Managed Funds
        </motion.h1>
        <motion.p className="text-gray-300  mb-5 max-w-xl"
         initial={{ y: 20, opacity: 0 }}
         animate={{ y: 0, opacity: 1 }}
         transition={{ delay: 1.8, duration: 0.8 }}
         >
          {sitedata?.description}
        </motion.p>

        <Link href="/contactus">
            <motion.button
              className="bg-[var(--rv-secondary)]  text-[var(--rv-white)] font-bold py-2 px-6 rounded-lg transition-all"
             initial={{ y: 20, opacity: 0 }}
         animate={{ y: 0, opacity: 1 }}
         transition={{ delay: 2, duration: 0.8 }}
              viewport={{ once: true }}
            >
             Get Started
            </motion.button></Link>

        {/* New Buttons */}
        {/* <div className="flex flex-wrap gap-4">
          <motion.div className="bg-gradient-to-b from-[var(--rv-primary)] to-[var(--rv-ternary)] px-6 py-4 rounded-xl border border-white/20 shadow-md"
           initial={{ y: 50, opacity: 0 }}
           animate={{ y: 0, opacity: 1 }}
           transition={{ delay: 2.4, duration: 0.8 }}
           >
            <h2 className="text-xl font-semibold">Direct</h2>
            <p className="text-sm text-gray-200">Mutual Funds (₹0 Brokerage)</p>
          </motion.div>
          <motion.div className="bg-gradient-to-b from-[var(--rv-primary)] to-[var(--rv-ternary)] px-6 py-4 rounded-xl border border-white/20 shadow-md"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 2.8, duration: 0.8 }}
          >
            <h2 className="text-xl font-semibold">₹100</h2>
            <p className="text-sm text-gray-200">Start SIPs with as low as ₹100!</p>
          </motion.div>
        </div> */}
      </div>
    </section>
  );
}
