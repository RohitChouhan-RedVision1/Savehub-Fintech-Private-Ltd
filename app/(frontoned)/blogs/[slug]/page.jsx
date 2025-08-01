import BlogCards from "@/components/blogcards";
import formatDate from "@/lib/formatDate";
import axios from "axios";
import Image from "next/image";
import { Suspense } from "react";
import Loading from "../loading";

// FETCH DATA WITH AN API
const getData = async (slug) => {
  const res = await axios.get(`${process.env.NEXTAUTH_URL}/api/blogs/singlepost/${slug}`);
  if (res.status !== 200) {
    throw new Error("Something went wrong");
  }
  // Return plain data only
  const blog = res.data[0];
  return {
    posttitle: blog.posttitle,
    title: blog.title,
    metatitle: blog.metatitle,
    keywords: blog.keywords,
    description: blog.description,
    createdAt: blog.createdAt,
    content: blog.content,
    image: blog.image || null,
  };
};

const getRecentBlog = async () => {
  const res = await axios.get(`${process.env.NEXTAUTH_URL}/api/blogs/dashboardblogs`);
  if (res.status !== 200) {
    throw new Error("Something went wrong");
  }
  // Map to plain objects
  return res.data.map((blog) => ({
    _id: blog._id,
    posttitle: blog.posttitle,
    slug: blog.slug,
    image: blog.image || null,
    createdAt: blog.createdAt,
  }));
};


// SEO - dynamic
export const generateMetadata = async ({ params }) => {
    const { slug } = params;

    const post = await getData(slug);
    return {
        title: post?.metatitle,
        description: post?.description,
        keywords: post?.keywords,
    };
};

const SinglePostPage = async ({ params }) => {
    const { slug } = params;
    // // FETCH DATA WITH AN API
    const post = await getData(slug);
    const recentPost = await getRecentBlog();

    function createMarkup() {
        return { __html: post?.content }
    }
    return (
        <div className="max-w-screen-xl mx-auto main_section">
            <div className="py-20">
                <div className="mb-16">
                    <h1 className="text-5xl font-bold text-gray-100 mb-5">{post?.posttitle}</h1>
                    <div className="">
                        <span className="text-lg text-gray-300">Published </span>
                        <span className="text-lg text-purple-400">
                            {formatDate(post?.createdAt)}
                        </span>
                    </div>
                </div>
                {post?.image?.url && (
                    <div>
                        <Image src={post?.image?.url}
                            alt={post?.image?.url}
                            width={900}
                            height={900}
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            className="rounded" />
                    </div>
                )}
                <div className="mb-10">
                    <h1 className="">{post?.title}</h1>
                    <div className="my-5">
                        {post && (
                            <Suspense fallback={<div>Loading...</div>}>
                                <div dangerouslySetInnerHTML={createMarkup()} className="text-white" />
                            </Suspense>
                        )}
                    </div>
                </div>
            </div>
            <div className="">
                <h4 className="font-bold text-xl text-white mb-5">Recent Posts</h4>
                <div className="grid grid-cols-3 gap-3">
                    {recentPost?.slice(0, 6).map((item, index) => (
                        <div key={index}>
                            <Suspense fallback={<Loading />}>
                                <BlogCards item={item} />
                            </Suspense>
                        </div>
                    ))}
                </div>
            </div>
        </div >
    );
};

export default SinglePostPage;