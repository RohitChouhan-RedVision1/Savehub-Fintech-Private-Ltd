import { Footer } from "@/components/footer/footer";
import Navbar from "@/components/navbar/navbar";
import Topbar from "@/components/topbar/topbar";
import { ConnectDB } from "@/lib/db/ConnectDB";
import { getArn, getServiceData, getSiteData, getSocialMedia } from "@/lib/functions";
import BlogsModel from "@/lib/models/BlogModel";
import CategoryModel from "@/lib/models/CategoryModel";
import ServicesModel from "@/lib/models/ServicesModel";
import SiteSettingsModel from "@/lib/models/SiteSetting";
import TestimonialModel from "@/lib/models/TestimonialModel";



export default async function Layout({ children }) {
    const sitedata = await getSiteData();
    const servicedata = await getServiceData();
    const socialMedia =await getSocialMedia()
   const arn=await getArn();
    return (
        <div className="">
            <Navbar sitedata={sitedata} servicedata={servicedata}/>
            {children}
            <Footer arn={arn} sitedata={sitedata} servicedata={servicedata} socialMedia={socialMedia}/>
        </div>
    );
}