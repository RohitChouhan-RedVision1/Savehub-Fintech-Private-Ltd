import HeroSection from "@/components/herosection/herosection";

import SubscribCard from "@/components/partners/partners";
import AboutUsHome from "@/components/aboutushomepage/aboutushomeage";
import Services from "@/components/Services/services";
import WhyChooseUs from "@/components/whytochooseus/whytochooseus";
import Calculator from "@/components/calculator/calculator";
import Blog from "@/components/blogs/blog";
import Testimonials from "@/components/testimonials/testimonials";
import ToolsHome from "@/components/tools/tools";
import { ConnectDB } from "@/lib/db/ConnectDB";
import SiteSettingsModel from "@/lib/models/SiteSetting";
import LatestNews from "@/components/latestnews";
import { FAQ } from "@/components/faq/faq";

import AdvisorCategory from "@/components/AdvisoryCategory/advisorycategory";
import Features from "@/components/features/features";
import { getAddisLogos, getBlogs, getFaqs, getServiceData, getSiteData, getTestimonials } from "@/lib/functions";
import MutalFundSection from "@/components/MutalfundSection/page";
import BusinessModel from "@/components/OurBuisnnessModel/page";
import SocialMediaSidebar from "@/components/socialMedia";
import WhatsAppBot from "@/components/chatbot/whatsapp";







export default async function Page() {
  const sitedata = await getSiteData();
  const servicedata = await getServiceData();
  const testimonials=await getTestimonials();
  const blogs=await getBlogs();
  // console.log(blogs)
    const Faqs=await getFaqs()
  return (
    <div className="">
        <main className="overflow-x-hidden">
          <HeroSection sitedata={sitedata}/>      
          <Features/>
          <AdvisorCategory/>
          <WhyChooseUs/>
          <Calculator/>
          <MutalFundSection/>
          <SubscribCard />
      
       {/* <Testimonials testimonials={testimonials}/> */}
          <Blog blogs={blogs} />
          <LatestNews />
          <FAQ Faqs={Faqs}/>
          <WhatsAppBot sitedata={sitedata} services={servicedata} />
          {/* <SocialMediaSidebar sitedata={sitedata} /> */}
        </main>
    </div>
  );
}