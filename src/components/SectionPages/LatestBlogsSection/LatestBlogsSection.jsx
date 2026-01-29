// import React from "react";
// import { ArrowRight } from "lucide-react";
// import { useNavigate } from "react-router-dom";

// const blogs = [
//   {
//     id: 1,
//     slug: "how-we-can-fix-any-problem-in-tailbone-in-back",
//     image: "https://images.unsplash.com/photo-1599058917212-d750089bc07e",
//     date: "JULY 12, 2023",
//     title: "How we can fix any problem in tailbone in back.",
//   },
//   {
//     id: 2,
//     slug: "how-we-can-cover-injury-pain-by-exercise",
//     image: "https://images.unsplash.com/photo-1607962837359-5e7e89f86776",
//     date: "JULY 12, 2023",
//     title: "How we can cover injury pain by exercise",
//   },
// ];

// const LatestBlogsSection = () => {
//   const navigate = useNavigate();

//   return (
//     <section className="w-full bg-white py-20 px-4 md:px-10">
//       <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-12">

//         {/* LEFT CONTENT */}
//         <div>
//           <div className="flex items-center gap-2 mb-4">
//             <span className="w-8 h-[2px] bg-blue-600"></span>
//             <p className="uppercase text-blue-600 tracking-wide">
//               Company News
//             </p>
//           </div>

//           <h2 className="text-3xl md:text-5xl text-slate-900 leading-tight mb-6">
//             Latest Articles <br /> & Blogs
//           </h2>

//           <p className="text-gray-600 mb-6">
//             If you need to repair or replace your Plumbing system,
//             call today and talk to one of our Plumbing.
//           </p>

//           <button 
//             onClick={() => navigate('/blog')}
//             className="flex items-center gap-2 text-blue-600 hover:gap-3 transition-all"
//           >
//             Explore More <ArrowRight size={18} />
//           </button>
//         </div>

//         {/* BLOG CARDS */}
//         {blogs.map((blog) => (
//           <div 
//             key={blog.id} 
//             className="group cursor-pointer"
//             onClick={() => navigate(`/blog/${blog.slug}`)}
//           >
//             <div className="overflow-hidden rounded-lg">
//               <img
//                 src={blog.image}
//                 alt={blog.title}
//                 className="w-full h-60 object-cover group-hover:scale-105 transition-transform duration-500"
//               />
//             </div>

//             <p className="mt-6 text-sm text-gray-500">
//               {blog.date}
//             </p>

//             <h3 className="text-xl text-slate-900 mt-2 mb-4 leading-snug group-hover:text-blue-600 transition-colors">
//               {blog.title}
//             </h3>

//             <button 
//               className="flex items-center gap-2 text-blue-600 hover:gap-3 transition-all"
//               onClick={(e) => {
//                 e.stopPropagation();
//                 navigate(`/blog/${blog.slug}`);
//               }}
//             >
//               Continue Reading <ArrowRight size={16} />
//             </button>
//           </div>
//         ))}
//       </div>
//     </section>
//   );
// };

// export default LatestBlogsSection;


import React, { useState, useEffect } from "react";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const API_BASE_URL = "https://dr-abhishek-physiotherapist-backend.onrender.com/api";

const LatestBlogsSection = () => {
  const navigate = useNavigate();
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchLatestBlogs();
  }, []);

  // ✅ Helper function to get image URL
  const getImageUrl = (blog) => {
    if (blog.images && blog.images.length > 0 && blog.images[0].url) {
      return blog.images[0].url;
    }
    if (blog.image) return blog.image;
    if (blog.featuredImage) return blog.featuredImage;
    if (blog.thumbnail) return blog.thumbnail;
    return "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d";
  };

  const fetchLatestBlogs = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_BASE_URL}/blog?limit=2`);
      if (!response.ok) throw new Error("Failed to fetch blogs");
      const data = await response.json();
      
      console.log("📥 Latest Blogs Response:", data); // Debug
      
      let blogsArray = [];
      if (Array.isArray(data)) {
        blogsArray = data;
      } else if (data.data && Array.isArray(data.data)) {
        blogsArray = data.data;
      } else if (data.blogs && Array.isArray(data.blogs)) {
        blogsArray = data.blogs;
      }
      
      const latestTwo = blogsArray.slice(0, 2);
      console.log("📊 Latest Two Blogs:", latestTwo); // Debug
      
      setBlogs(latestTwo);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching latest blogs:", err);
      setError(err.message);
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <section className="w-full bg-white py-20 px-4 md:px-10">
        <div className="max-w-7xl mx-auto text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading blogs...</p>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="w-full bg-white py-20 px-4 md:px-10">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-red-600 mb-4">Failed to load blogs</p>
          <button 
            onClick={fetchLatestBlogs}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
          >
            Retry
          </button>
        </div>
      </section>
    );
  }

  return (
    <section className="w-full bg-white py-20 px-4 md:px-10">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-12">

        {/* LEFT CONTENT */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <span className="w-8 h-[2px] bg-blue-600"></span>
            <p className="uppercase text-blue-600 tracking-wide">
              Company News
            </p>
          </div>

          <h2 className="text-3xl md:text-5xl text-slate-900 leading-tight mb-6">
            Latest Articles <br /> & Blogs
          </h2>

          <p className="text-gray-600 mb-6">
            Stay updated with our latest articles, health tips, and wellness insights 
            to help you on your journey to better health.
          </p>

          <button 
            onClick={() => navigate('/blog')}
            className="flex items-center gap-2 text-blue-600 hover:gap-3 transition-all font-semibold"
          >
            Explore More <ArrowRight size={18} />
          </button>
        </div>

        {/* BLOG CARDS */}
        {blogs.length === 0 ? (
          <div className="lg:col-span-2 text-center py-12">
            <p className="text-gray-500">No blogs available at the moment.</p>
          </div>
        ) : (
          blogs.map((blog) => (
            <div 
              key={blog._id || blog.id} 
              className="group cursor-pointer"
              onClick={() => navigate(`/blog/${blog._id || blog.id}`)}
            >
              <div className="overflow-hidden rounded-lg shadow-md">
                <img
                  src={getImageUrl(blog)}
                  alt={blog.title}
                  className="w-full h-60 object-cover group-hover:scale-105 transition-transform duration-500"
                  onError={(e) => {
                    console.error("Image load error for:", blog.title);
                    e.target.src = "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d";
                  }}
                />
              </div>

              <p className="mt-6 text-sm text-gray-500 uppercase tracking-wide">
                {new Date(blog.createdAt || Date.now()).toLocaleDateString('en-US', { 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </p>

              <h3 className="text-xl text-slate-900 mt-2 mb-4 leading-snug group-hover:text-blue-600 transition-colors font-semibold line-clamp-2">
                {blog.title}
              </h3>

              {(blog.excerpt || blog.content) && (
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                  {blog.excerpt || blog.content?.substring(0, 150).replace(/<[^>]*>/g, '') + "..."}
                </p>
              )}

              <button 
                className="flex items-center gap-2 text-blue-600 hover:gap-3 transition-all font-semibold"
                onClick={(e) => {
                  e.stopPropagation();
                  navigate(`/blog/${blog._id || blog.id}`);
                }}
              >
                Continue Reading <ArrowRight size={16} />
              </button>
            </div>
          ))
        )}
      </div>

      {/* Custom Styles */}
      <style>{`
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </section>
  );
};

export default LatestBlogsSection;