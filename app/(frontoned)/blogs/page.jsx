"use client"
import BlogCards from '@/components/blogcards'
import axios from 'axios'
import React, { Suspense } from 'react'
import Loading from './loading'
import InnerBanner from '@/components/InnerBanner/InnerBanner'

const Blogs = () => {
    const [data, setData] = React.useState([])
    React.useEffect(() => {
        const fetchData = async () => {
            try {
                // await new Promise((resolve) => setTimeout(resolve, 2000));
                const res = await axios.get("/api/blogs/dashboardblogs");
                if (res.status === 200) {
                    setData(res.data);
                }
            } catch (error) {
                console.error("Failed to fetch blogs", error);
            }
        };
        fetchData();
    }, []);
    return (
        <div>
            <InnerBanner pageName="Blogs" />
            <div className='max-w-screen-xl mx-auto main_section'>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2'>
                <Suspense fallback={<Loading />}>
                    {data?.map((item, index) => (
                        <div key={index} className='mx-auto'>
                            <BlogCards item={item} />
                        </div>
                    ))}
                </Suspense>
            </div>
        </div>
        </div>
    )
}

export default Blogs