import { Footer } from "@/components/footer/footer";
import Navbar from "@/components/navbar/navbar";
import Topbar from "@/components/topbar/topbar";
import { ConnectDB } from "@/lib/db/ConnectDB";
import { getArn, getSiteData, getSocialMedia } from "@/lib/functions";
import BlogsModel from "@/lib/models/BlogModel";
import CategoryModel from "@/lib/models/CategoryModel";
import ServicesModel from "@/lib/models/ServicesModel";
import SiteSettingsModel from "@/lib/models/SiteSetting";
import TestimonialModel from "@/lib/models/TestimonialModel";


// export async function getSiteData() {
//     await ConnectDB();
//     const data = await SiteSettingsModel?.findOne({}).select('-_id');
//     return data ? data.toObject() : {};
// }

// export async function getServiceData() {
//     await ConnectDB();
//     const data = await ServicesModel?.find({}).select('-_id');  // Use find() instead of findOne()
//     return data ? data.map(service => service.toObject()) : [];
// };

// export async function getTestimonials() {
//     await ConnectDB();
//     const data = await TestimonialModel?.find({}).select('-_id');  // Use find() instead of findOne()
//     return data ? data.map(service => service.toObject()) : [];
// };

// export async function getBlogs() {
//     await ConnectDB();
//     const data = await BlogsModel.find({})
//         .select('-_id')
//         .populate({
//             path: 'category',
//             model: CategoryModel, // Explicitly define the model
//             select: 'title -_id'  // Select only the category title
//         });

//     return data ? data.map(blog => blog.toObject()) : [];
// }

export default async function Layout({ children }) {
    const sitedata = await getSiteData();
    // const servicedata = await getServiceData();
    const socialMedia =await getSocialMedia()
   const arn=await getArn();
    return (
        <div className="">
            <Navbar sitedata={sitedata} />
            {children}
            <Footer arn={arn} sitedata={sitedata} socialMedia={socialMedia}/>
        </div>
    );
}