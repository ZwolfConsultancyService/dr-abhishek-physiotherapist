// LatestBlogsSection.jsx - same design, sirf slug fix
import React, { useState, useEffect } from "react";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const API_BASE_URL = "https://dr-abhishek-physiotherapist-backend.onrender.com/api";

const getSlug = (blog) => {
  if (blog.slug) return blog.slug;
  return (blog.title || "")
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
};

const getImageUrl = (blog) => {
  if (blog.images?.length > 0 && blog.images[0].url) return blog.images[0].url;
  if (blog.image) return blog.image;
  if (blog.featuredImage) return blog.featuredImage;
  if (blog.thumbnail) return blog.thumbnail;
  return "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d";
};

const LatestBlogsSection = () => {
  const navigate = useNavigate();
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => { fetchLatestBlogs(); }, []);

  const fetchLatestBlogs = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_BASE_URL}/blog?limit=2`);
      if (!response.ok) throw new Error("Failed to fetch blogs");
      const data = await response.json();
      const blogsArray = Array.isArray(data) ? data : data.data || data.blogs || [];
      setBlogs(blogsArray.slice(0, 2));
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return (
    <section className="w-full bg-gray-50 py-20 px-4 md:px-10">
      <div className="max-w-7xl mx-auto text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black mx-auto"></div>
        <p className="mt-4 text-gray-500">Loading blogs...</p>
      </div>
    </section>
  );

  if (error) return (
    <section className="w-full bg-gray-50 py-20 px-4 md:px-10">
      <div className="max-w-7xl mx-auto text-center">
        <p className="text-gray-700 mb-4">Failed to load blogs</p>
        <button onClick={fetchLatestBlogs}
          className="bg-black text-white px-6 py-2 text-xs tracking-widest uppercase hover:bg-gray-800 transition-colors">
          Retry
        </button>
      </div>
    </section>
  );

  return (
    <section className="w-full bg-gray-50 py-20 px-4 md:px-10">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-12">

        {/* Left Content */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <span className="w-8 h-[2px] bg-black"></span>
            <p className="uppercase text-black text-xs tracking-widest font-semibold">
              Company News
            </p>
          </div>

          <h2 className="text-3xl md:text-5xl text-black leading-tight mb-6 font-bold">
            Latest Articles <br /> & Blogs
          </h2>

          <p className="text-gray-500 mb-6 leading-relaxed">
            Stay updated with our latest articles, health tips, and wellness
            insights to help you on your journey to better health.
          </p>

          <button
            onClick={() => navigate("/blogs")}
            className="flex items-center gap-2 text-black hover:gap-4 transition-all font-semibold text-sm tracking-wider uppercase group"
          >
            Explore More
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* Blog Cards */}
        {blogs.length === 0 ? (
          <div className="lg:col-span-2 text-center py-12">
            <p className="text-gray-400">No blogs available at the moment.</p>
          </div>
        ) : (
          blogs.map((blog) => (
            <div
              key={blog._id || blog.id}
              className="group cursor-pointer"
              onClick={() => navigate(`/blogs/${getSlug(blog)}`)}
            >
              {/* Image */}
              <div className="overflow-hidden shadow-md">
                <img
                  src={getImageUrl(blog)}
                  alt={blog.title}
                  className="w-full h-60 object-cover group-hover:scale-105 transition-transform duration-500"
                  onError={(e) => {
                    e.target.src = "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d";
                  }}
                />
              </div>

              {/* Date */}
              <p className="mt-6 text-xs text-gray-400 uppercase tracking-widest">
                {new Date(blog.createdAt || Date.now()).toLocaleDateString("en-US", {
                  year: "numeric", month: "long", day: "numeric",
                })}
              </p>

              {/* Title */}
              <h3 className="text-xl text-black mt-2 mb-4 leading-snug group-hover:text-gray-500 transition-colors font-semibold line-clamp-2">
                {blog.title}
              </h3>

              {(blog.excerpt || blog.content) && (
                <p className="text-gray-500 text-sm mb-4 line-clamp-2">
                  {blog.excerpt || blog.content?.substring(0, 150).replace(/<[^>]*>/g, "") + "..."}
                </p>
              )}

              {/* Read More */}
              <button
                className="flex items-center gap-2 text-black hover:gap-3 transition-all font-semibold text-sm tracking-wider uppercase group/btn"
                onClick={(e) => {
                  e.stopPropagation();
                  navigate(`/blogs/${getSlug(blog)}`);
                }}
              >
                Continue Reading
                <ArrowRight size={16} className="group-hover/btn:translate-x-1 transition-transform" />
              </button>
            </div>
          ))
        )}
      </div>

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