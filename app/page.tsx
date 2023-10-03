import Link from "next/link";
import { client } from "./lib/sanity";
import Image from "next/image";

interface Data {
  title: string,
  excerpt: string,
  slugUrl: string,
  _id: string,
  _createdAt: string,
  imageUrl: string
}

async function getData() {
  const query = `*[_type == 'post'] {
    title,
    excerpt,
     "slugUrl":slug.current,
     _id,
     _createdAt,
      "imageUrl": coverImage.asset->url 
    }`;

  const data = await client.fetch(query);
    
  return data
}

export default async function IndexPage() {
  const data:Data[] = await getData();
  return (
    <div className="divide-y divide-gray-200 dark:divide-gray-700">
      <div className="space-y-2 pt-6 pb-8 md:space-y-5">
        <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">Latest Posts</h1>
      </div>
      <ul>
      {data.map((post) => (
        <li key={post._id} className="py-4">
          <article className="space-y-2 xl:grid xl:grid-cols-4 xl:items-baseline xl:space-y-0">
            <div>
              <p className="text-base font-medium leading-6 text-teal-500">
                {new Date(post._createdAt).toISOString().split('T')[0]}
              </p>
            </div>
            <Link href={`/post/${post.slugUrl}`} prefetch className="space-y-3 xl:col-span-3">
              <div>
                <h3 className="text-2xl font-bold leading-8 tracking-tight text-gray-900 dark:text-gray-100">
                  {post.title}
                </h3>
              </div>

              <p className="pros max-w-none text-gray-500 dark:text-gray-400 line-clamp-3">
                {post.excerpt}
              </p>
              <div className="h-56 w-full relative">
              <Image fill src={post.imageUrl} alt="cover image" className="h-full w-full object-cover" />
              </div>
              
            </Link>
          </article>
        </li>
      ))}

      </ul>
    </div>
  )
}