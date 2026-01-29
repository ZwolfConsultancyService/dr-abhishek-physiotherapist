import React, { useState, useEffect } from "react";
import { Search, Calendar, User, Tag } from "lucide-react";
import { useParams, useNavigate } from 'react-router-dom';

const API_BASE_URL = "https://dr-abhishek-physiotherapist-backend.onrender.com/api";

export default function BlogDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [searchQuery, setSearchQuery] = useState("");
  const [blogPost, setBlogPost] = useState(null);
  const [recentNews, setRecentNews] = useState([]);
  const [categories, setCategories] = useState([]);
  const [tags, setTags] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (id) {
      fetchBlogDetail();
      fetchSidebarData();
    }
  }, [id]);

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

  const fetchBlogDetail = async () => {
    try {
      setLoading(true);
      console.log("🔍 Fetching blog with ID:", id);
      
      const response = await fetch(`${API_BASE_URL}/blog/${id}`);
      console.log("📡 Response status:", response.status);
      
      if (!response.ok) throw new Error("Failed to fetch blog");
      const data = await response.json();
      console.log("📥 Blog data received:", data);
      
      let blog = null;
      if (data && data._id) {
        blog = data;
      } else if (data.data && data.data._id) {
        blog = data.data;
      } else if (data.blog && data.blog._id) {
        blog = data.blog;
      }
      
      console.log("✅ Processed blog:", blog);
      console.log("🖼️ Blog image URL:", blog ? getImageUrl(blog) : "No blog");
      
      setBlogPost(blog);
      setLoading(false);
    } catch (err) {
      console.error("❌ Error fetching blog detail:", err);
      setError(err.message);
      setLoading(false);
    }
  };

  const fetchSidebarData = async () => {
    try {
      const blogsResponse = await fetch(`${API_BASE_URL}/blog`);
      if (!blogsResponse.ok) return;
      
      const blogsData = await blogsResponse.json();
      
      let blogs = [];
      if (Array.isArray(blogsData)) {
        blogs = blogsData;
      } else if (blogsData.data && Array.isArray(blogsData.data)) {
        blogs = blogsData.data;
      } else if (blogsData.blogs && Array.isArray(blogsData.blogs)) {
        blogs = blogsData.blogs;
      }
      
      setRecentNews(blogs.slice(0, 4));
      
      const uniqueCategories = [...new Set(blogs.map(blog => blog.category).filter(Boolean))];
      const categoriesWithCount = uniqueCategories.map(cat => ({
        name: cat,
        count: blogs.filter(blog => blog.category === cat).length
      }));
      setCategories(categoriesWithCount);
      
      const allTags = blogs.flatMap(blog => blog.tags || []);
      const uniqueTags = [...new Set(allTags)];
      setTags(uniqueTags);
    } catch (err) {
      console.error("Error fetching sidebar data:", err);
    }
  };

  const handleSearch = () => {
    if (searchQuery.trim()) {
      navigate(`/blog?search=${searchQuery}`);
    }
  };

  const handleNavigation = (path) => {
    navigate(path);
  };

  const handleRecentNewsClick = (newsId) => {
    navigate(`/blog/${newsId}`);
  };

  const handleCategoryClick = (categoryName) => {
    navigate(`/blog?tags=${categoryName}`);
  };

  const handleTagClick = (tagName) => {
    navigate(`/blog?tags=${tagName}`);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 mt-12 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-pink-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading blog...</p>
        </div>
      </div>
    );
  }

  if (error || !blogPost) {
    return (
      <div className="min-h-screen bg-gray-50 mt-12 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">Error: {error || "Blog not found"}</p>
          <button 
            onClick={() => navigate('/blog')}
            className="bg-pink-500 text-white px-6 py-2 rounded-lg hover:bg-pink-600"
          >
            Back to Blogs
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 mt-12">
      {/* Hero Banner */}
      <div
        className="relative h-[300px] bg-cover bg-center"
        style={{
          backgroundImage: `url('${getImageUrl(blogPost)}')`,
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-black/40"></div>

        <div className="relative z-10 container mx-auto px-4 h-full flex flex-col justify-center max-w-7xl">
          <h1 className="text-3xl md:text-5xl mt-20 text-white mb-6">
            {blogPost.title}
          </h1>

          <nav className="flex items-center gap-2 text-white/90 text-sm">
            <button
              onClick={() => handleNavigation("/")}
              className="hover:text-white transition-colors"
            >
              Home
            </button>
            <span>/</span>
            <button
              onClick={() => handleNavigation("/blog")}
              className="hover:text-white transition-colors"
            >
              Blog
            </button>
            <span>/</span>
            <span className="text-white truncate max-w-[200px]">{blogPost.title}</span>
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <section className="py-16">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Left Content - Blog Post */}
            <main className="lg:col-span-8">
              <article className="bg-white rounded-xl shadow-lg overflow-hidden">
                {/* Featured Image */}
                <div className="relative h-[400px] sm:h-[500px] overflow-hidden">
                  <img
                    src={getImageUrl(blogPost)}
                    alt={blogPost.title}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      console.error("Image load error");
                      e.target.src = "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d";
                    }}
                  />
                </div>

                {/* Content */}
                <div className="p-6 sm:p-8 lg:p-12">
                  {/* Date Badge */}
                  <div className="inline-block bg-pink-500 text-white text-xs uppercase px-4 py-2 rounded mb-6">
                    {new Date(blogPost.createdAt || blogPost.date || Date.now()).toLocaleDateString('en-US', { 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric' 
                    })}
                  </div>

                  {/* Meta Info */}
                  <div className="flex flex-wrap items-center gap-4 text-gray-500 text-sm mb-8">
                    <div className="flex items-center gap-2">
                      <User className="w-4 h-4" />
                      <span>By:</span>
                      <span className="text-gray-700">{blogPost.author || "Admin"}</span>
                    </div>
                    {blogPost.tags && blogPost.tags.length > 0 && (
                      <div className="flex items-center gap-2">
                        <Tag className="w-4 h-4" />
                        <span className="text-gray-700 capitalize">
                          {blogPost.tags[0]}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Main Content */}
                  <div className="prose max-w-none">
                    {blogPost.content ? (
                      <div 
                        className="text-gray-700 text-base leading-relaxed"
                        dangerouslySetInnerHTML={{ __html: blogPost.content }}
                      />
                    ) : blogPost.description ? (
                      <div 
                        className="text-gray-700 text-base leading-relaxed"
                        dangerouslySetInnerHTML={{ __html: blogPost.description }}
                      />
                    ) : (
                      <p className="text-gray-700 text-base leading-relaxed">
                        {blogPost.excerpt || "No content available."}
                      </p>
                    )}
                  </div>
                </div>
              </article>
            </main>

            {/* Right Sidebar */}
            <aside className="lg:col-span-4">
              <div className="space-y-8 lg:sticky lg:top-8">
                {/* Search Widget */}
                <div className="bg-white rounded-xl shadow-lg p-6">
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Enter Search Keywords"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      onKeyPress={(e) => e.key === "Enter" && handleSearch()}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-pink-500 focus:outline-none"
                    />
                    <button
                      onClick={handleSearch}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-pink-500"
                    >
                      <Search className="w-5 h-5" />
                    </button>
                  </div>
                </div>

                {/* Categories Widget */}
                {categories.length > 0 && (
                  <div className="bg-white rounded-xl shadow-lg p-6">
                    <h3 className="text-xl text-[#0a1f44] mb-6 pb-3 border-b-2 border-pink-500">
                      Categories
                    </h3>
                    <ul className="space-y-3">
                      {categories.map((category, index) => (
                        <li key={index}>
                          <button 
                            onClick={() => handleCategoryClick(category.name)}
                            className="text-gray-700 hover:text-pink-500 transition-colors flex items-center gap-2 w-full text-left"
                          >
                            <span className="w-2 h-2 bg-pink-500 rounded-full"></span>
                            <span className="capitalize">{category.name}</span>
                            <span className="ml-auto text-gray-400">({category.count})</span>
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Recent News Widget */}
                {recentNews.length > 0 && (
                  <div className="bg-white rounded-xl shadow-lg p-6">
                    <h3 className="text-xl text-[#0a1f44] mb-6 pb-3 border-b-2 border-pink-500">
                      Recent News
                    </h3>
                    <div className="space-y-4">
                      {recentNews.map((news, index) => (
                        <div
                          key={index}
                          onClick={() => handleRecentNewsClick(news._id || news.id)}
                          className="flex gap-4 group cursor-pointer"
                        >
                          <div className="w-20 h-20 flex-shrink-0 rounded-lg overflow-hidden">
                            <img
                              src={getImageUrl(news)}
                              alt={news.title}
                              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                              onError={(e) => {
                                e.target.src = "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=200&h=150&fit=crop";
                              }}
                            />
                          </div>
                          <div className="flex-1">
                            <h4 className="text-sm text-gray-800 group-hover:text-pink-500 transition-colors mb-2 line-clamp-2">
                              {news.title}
                            </h4>
                            <p className="text-xs text-gray-500 flex items-center gap-1">
                              <Calendar className="w-3 h-3" />
                              {new Date(news.createdAt || news.date || Date.now()).toLocaleDateString('en-US', { 
                                year: 'numeric', 
                                month: 'long', 
                                day: 'numeric' 
                              })}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Tags Widget */}
                {tags.length > 0 && (
                  <div className="bg-white rounded-xl shadow-lg p-6">
                    <h3 className="text-xl text-[#0a1f44] mb-6 pb-3 border-b-2 border-pink-500">
                      Tags
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {tags.map((tag, index) => (
                        <button
                          key={index}
                          onClick={() => handleTagClick(tag)}
                          className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-pink-500 hover:text-white transition-all duration-300 text-sm capitalize"
                        >
                          {tag}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* Custom Styles */}
      <style>{`
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .prose {
          color: #374151;
        }

        .prose h1, .prose h2, .prose h3, .prose h4 {
          color: #0a1f44;
          font-weight: bold;
          margin-top: 1.5rem;
          margin-bottom: 1rem;
        }

        .prose p {
          margin-bottom: 1rem;
          line-height: 1.8;
        }

        .prose ul, .prose ol {
          margin-left: 1.5rem;
          margin-bottom: 1rem;
        }

        .prose a {
          color: #ec4899;
          text-decoration: underline;
        }

        .prose a:hover {
          color: #db2777;
        }

        .prose img {
          max-width: 100%;
          height: auto;
          border-radius: 0.5rem;
          margin: 1.5rem 0;
        }

        ::-webkit-scrollbar {
          width: 10px;
        }

        ::-webkit-scrollbar-track {
          background: #f1f1f1;
        }

        ::-webkit-scrollbar-thumb {
          background: #ec4899;
          border-radius: 5px;
        }

        ::-webkit-scrollbar-thumb:hover {
          background: #db2777;
        }
      `}</style>
    </div>
  );
}