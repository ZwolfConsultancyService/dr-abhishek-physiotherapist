// BlogPage.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Search, Calendar, Home, ChevronRight } from "lucide-react";

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

const BlogPage = () => {
  const navigate = useNavigate();
  const [blogs, setBlogs] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");
  const [activeTag, setActiveTag] = useState("");
  const [tags, setTags] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetchBlogs();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  useEffect(() => {
    let result = blogs;
    if (search.trim()) {
      result = result.filter((b) =>
        b.title?.toLowerCase().includes(search.toLowerCase()) ||
        b.excerpt?.toLowerCase().includes(search.toLowerCase())
      );
    }
    if (activeTag) {
      result = result.filter((b) =>
        b.tags?.includes(activeTag) || b.category === activeTag
      );
    }
    setFiltered(result);
  }, [search, activeTag, blogs]);

  const fetchBlogs = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${API_BASE_URL}/blog`);
      if (!res.ok) throw new Error("Failed to fetch");
      const data = await res.json();
      const list = Array.isArray(data) ? data : data.data || data.blogs || [];
      setBlogs(list);
      setFiltered(list);
      setTags([...new Set(list.flatMap((b) => b.tags || []))]);
      setCategories([...new Set(list.map((b) => b.category).filter(Boolean))]);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return (
    <div className="min-h-screen bg-white flex items-center justify-center mt-12">
      <div className="text-center">
        <div className="relative w-20 h-20 mx-auto mb-6">
          <div className="absolute inset-0 border-4 border-gray-100 rounded-full"></div>
          <div className="absolute inset-0 border-4 border-transparent border-t-black rounded-full animate-spin"></div>
          <div className="absolute inset-4 bg-black rounded-full animate-pulse"></div>
        </div>
        <p className="text-xs tracking-widest uppercase text-gray-400">Loading blogs...</p>
      </div>
    </div>
  );

  if (error) return (
    <div className="min-h-screen bg-white flex items-center justify-center mt-12">
      <div className="text-center">
        <p className="text-gray-700 mb-4">Failed to load blogs</p>
        <button onClick={fetchBlogs}
          className="bg-black text-white px-6 py-2 text-xs tracking-widest uppercase hover:bg-gray-800 transition-colors">
          Retry
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 mt-10">

      {/* Banner */}
      <div className="relative h-[240px] md:h-[300px] bg-black">
        <div className="absolute inset-0 bg-gradient-to-r from-black via-gray-900 to-black opacity-90" />
        <div className="relative z-10 container mx-auto px-4 h-full flex flex-col justify-center max-w-7xl">
          <h1 className="text-3xl md:text-5xl mt-16 text-white mb-4 font-bold tracking-tight">
            Blogs & Articles
          </h1>
          <nav className="flex items-center gap-2 text-white/60 text-sm">
            <button onClick={() => navigate("/")}
              className="hover:text-white transition-colors flex items-center gap-1">
              <Home className="w-4 h-4" /> Home
            </button>
            <ChevronRight className="w-3 h-3" />
            <span className="text-white">Blogs</span>
          </nav>
        </div>
      </div>

      {/* Main */}
      <section className="py-10 md:py-16">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

            {/* Blog Grid */}
            <main className="lg:col-span-8 order-2 lg:order-1">

              {/* Search - mobile only */}
              <div className="relative mb-6 lg:hidden">
                <input type="text" placeholder="Search blogs..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-200 focus:border-black focus:outline-none text-sm" />
                <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              </div>

              {filtered.length === 0 ? (
                <div className="text-center py-20">
                  <p className="text-gray-400 text-lg">No blogs found.</p>
                  <button onClick={() => { setSearch(""); setActiveTag(""); }}
                    className="mt-4 text-xs tracking-widest uppercase underline text-black">
                    Clear Filters
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {filtered.map((blog) => (
                    <div key={blog._id || blog.id}
                      className="bg-white shadow-lg group cursor-pointer hover:shadow-xl transition-shadow duration-300"
                      onClick={() => navigate(`/blogs/${getSlug(blog)}`)}>

                      {/* Image */}
                      <div className="overflow-hidden h-[200px]">
                        <img src={getImageUrl(blog)} alt={blog.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          onError={(e) => {
                            e.target.src = "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d";
                          }} />
                      </div>

                      {/* Content */}
                      <div className="p-5">
                        {/* Tags */}
                        {blog.tags?.length > 0 && (
                          <div className="flex flex-wrap gap-2 mb-3">
                            {blog.tags.slice(0, 2).map((tag, i) => (
                              <span key={i}
                                className="text-xs px-2 py-1 bg-gray-100 text-gray-500 tracking-wide capitalize">
                                {tag}
                              </span>
                            ))}
                          </div>
                        )}

                        {/* Title */}
                        <h2 className="text-base md:text-lg font-bold text-black mb-2 leading-snug group-hover:text-gray-600 transition-colors line-clamp-2">
                          {blog.title}
                        </h2>

                        {/* Excerpt */}
                        {(blog.excerpt || blog.content) && (
                          <p className="text-gray-500 text-sm mb-4 line-clamp-2">
                            {blog.excerpt || blog.content?.replace(/<[^>]*>/g, "").substring(0, 120) + "..."}
                          </p>
                        )}

                        {/* Footer */}
                        <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                          <span className="text-xs text-gray-400 flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            {new Date(blog.createdAt || Date.now()).toLocaleDateString("en-US", {
                              year: "numeric", month: "short", day: "numeric",
                            })}
                          </span>
                          <button
                            className="text-xs tracking-widest uppercase font-semibold text-black flex items-center gap-1 hover:gap-2 transition-all"
                            onClick={(e) => {
                              e.stopPropagation();
                              navigate(`/blogs/${getSlug(blog)}`);
                            }}>
                            Read <ChevronRight className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </main>

            {/* Sidebar */}
            <aside className="lg:col-span-4 order-1 lg:order-2">
              <div className="space-y-6 lg:sticky lg:top-8">

                {/* Search - desktop */}
                <div className="bg-white shadow-lg p-6 hidden lg:block">
                  <h3 className="text-xs tracking-widest uppercase font-semibold text-black mb-4">
                    Search
                  </h3>
                  <div className="relative">
                    <input type="text" placeholder="Search blogs..."
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                      className="w-full px-4 py-3 border-2 border-gray-200 focus:border-black focus:outline-none text-sm" />
                    <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  </div>
                </div>

                {/* Categories */}
                {categories.length > 0 && (
                  <div className="bg-white shadow-lg p-6">
                    <h3 className="text-xs tracking-widest uppercase font-semibold text-black mb-4 pb-3 border-b border-gray-100">
                      Categories
                    </h3>
                    <ul className="space-y-2">
                      <li>
                        <button onClick={() => setActiveTag("")}
                          className={`text-sm w-full text-left flex items-center gap-2 py-1 transition-colors ${activeTag === "" ? "text-black font-semibold" : "text-gray-500 hover:text-black"}`}>
                          <span className="w-1.5 h-1.5 bg-black rounded-full flex-shrink-0"></span>
                          All Categories
                        </button>
                      </li>
                      {categories.map((cat, i) => (
                        <li key={i}>
                          <button onClick={() => setActiveTag(cat)}
                            className={`text-sm w-full text-left flex items-center gap-2 py-1 transition-colors capitalize ${activeTag === cat ? "text-black font-semibold" : "text-gray-500 hover:text-black"}`}>
                            <span className="w-1.5 h-1.5 bg-black rounded-full flex-shrink-0"></span>
                            {cat}
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Tags */}
                {tags.length > 0 && (
                  <div className="bg-white shadow-lg p-6">
                    <h3 className="text-xs tracking-widest uppercase font-semibold text-black mb-4 pb-3 border-b border-gray-100">
                      Tags
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {tags.map((tag, i) => (
                        <button key={i}
                          onClick={() => setActiveTag(activeTag === tag ? "" : tag)}
                          className={`px-3 py-1.5 text-xs capitalize tracking-wide border transition-all duration-300 ${activeTag === tag
                            ? "bg-black text-white border-black"
                            : "border-gray-200 text-gray-500 hover:bg-black hover:text-white hover:border-black"}`}>
                          {tag}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Recent Posts */}
                <div className="bg-white shadow-lg p-6">
                  <h3 className="text-xs tracking-widest uppercase font-semibold text-black mb-4 pb-3 border-b border-gray-100">
                    Recent Posts
                  </h3>
                  <div className="space-y-4">
                    {blogs.slice(0, 4).map((blog, i) => (
                      <div key={i}
                        className="flex gap-3 group cursor-pointer"
                        onClick={() => navigate(`/blogs/${getSlug(blog)}`)}>
                        <div className="w-16 h-16 flex-shrink-0 overflow-hidden bg-gray-100">
                          <img src={getImageUrl(blog)} alt={blog.title}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                            onError={(e) => {
                              e.target.src = "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d";
                            }} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="text-xs font-semibold text-black group-hover:text-gray-500 transition-colors line-clamp-2 mb-1">
                            {blog.title}
                          </h4>
                          <p className="text-xs text-gray-400 flex items-center gap-1">
                            <Calendar className="w-3 h-3 flex-shrink-0" />
                            {new Date(blog.createdAt || Date.now()).toLocaleDateString("en-US", {
                              month: "short", day: "numeric", year: "numeric",
                            })}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            </aside>
          </div>
        </div>
      </section>

      <style>{`
        * { box-sizing: border-box; }
        .container { width: 100%; margin-left: auto; margin-right: auto; }
        .line-clamp-2 { display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }
        ::-webkit-scrollbar { width: 8px; }
        ::-webkit-scrollbar-track { background: #f1f1f1; }
        ::-webkit-scrollbar-thumb { background: #000; }
      `}</style>
    </div>
  );
};

export default BlogPage;