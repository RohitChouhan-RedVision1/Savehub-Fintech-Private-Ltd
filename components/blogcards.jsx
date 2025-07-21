import Link from 'next/link'
import React from 'react'

const BlogCards = ({ item }) => {
    return (
        <div className="p-1">
            <Link href={`blogs/${item.slug}`}>
                <div className="max-h-96 min-h-96 bg-[var(--rv-primary)] border border-gray-200 rounded-lg shadow ">
                    <img className="rounded-t-lg w-full h-52" src={item?.image?.url} alt={item?.image?.url} />
                    <div className="p-5">
                        <h5 className="mb-2 line-clamp-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-[var(--rv-white)]">{item.posttitle}</h5>
                        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{item.posttitle}</p>
                    </div>
                </div>
            </Link>
        </div>
    )
}

export default BlogCards