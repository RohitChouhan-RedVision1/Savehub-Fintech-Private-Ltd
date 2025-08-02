

import formatDate from "@/lib/formatDate";

import Image from "next/image";

import BlogCards from "@/components/blogcards";
import { getBlogBySlug, getBlogs } from "@/lib/functions";
import { Suspense } from "react";
import Loading from "../loading";
 
const SinglePostPage = async ({ params }) => {

  const { slug } = await params;
 
  let post, recentPost;
 
  try {

    post = await getBlogBySlug(slug);

    recentPost = await getBlogs();

  } catch (error) {

    console.error("Failed to fetch data:", error);

    return <div className="text-red-500">Failed to load blog post.</div>;

  }
 
  const createMarkup = () => ({ __html: post?.content });
 
  return (
<>
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
                            <Suspense
                             fallback={<div>Loading...</div>}>

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
</>

  );

};
 
export default SinglePostPage;
 