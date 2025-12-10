import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase, isSupabaseEnabled } from "../lib/supabaseClient";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";

const Blog = () => {
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const ITEMS_PER_PAGE = 6;
  const navigate = useNavigate();

  useEffect(() => {
    if (!supabase) {
      setLoading(false);
      return;
    }

    const fetchPosts = async () => {
      setLoading(true);
      const from = (page - 1) * ITEMS_PER_PAGE;
      const to = from + ITEMS_PER_PAGE - 1;

      const [countResult, dataResult] = await Promise.all([
        supabase
          .from("posts")
          .select("id", { count: "exact", head: true })
          .eq("post_type", "post")
          .eq("status", "published"),
        supabase
          .from("posts")
          .select("id, title, created_at, content, slug")
          .eq("post_type", "post")
          .eq("status", "published")
          .order("created_at", { ascending: false })
          .range(from, to),
      ]);

      if (countResult.count) {
        setTotalPages(Math.ceil(countResult.count / ITEMS_PER_PAGE));
      }

      if (dataResult.data) {
        const formattedPosts = dataResult.data.map((p) => ({
          ...p,
          excerpt: p.content
            ? p.content.replace(/<[^>]+>/g, "").substring(0, 120) + "..."
            : "",
        }));
        setPosts(formattedPosts);
      }
      setLoading(false);
    };

    fetchPosts();
    window.scrollTo(0, 0);
  }, [page]);

  const handleNavigate = (postId) => {
    navigate(`/post/${postId}`);
  };

  if (!isSupabaseEnabled) {
    return (
      <div className="py-20 text-center">
        <div className="inline-block p-4 bg-amber-50 text-amber-800 border border-amber-200 rounded">
          ⚠️ Supabaseの設定が見つかりません。.envファイルを確認してください。
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-6 py-12 min-h-[60vh]">
      <div className="text-center mb-16">
        <span className="text-indigo-900 font-bold tracking-widest text-xs uppercase mb-2 block">
          Knowledge Base
        </span>
        <h2 className="text-3xl font-serif font-bold text-slate-900">
          兵法書（ブログ）
        </h2>
      </div>

      {loading ? (
        <div className="grid md:grid-cols-2 gap-8">
          {[...Array(4)].map((_, i) => (
            <div
              key={i}
              className="h-64 bg-slate-100 animate-pulse rounded-sm"
            ></div>
          ))}
        </div>
      ) : (
        <>
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {posts.map((post) => (
              <div
                key={post.id}
                onClick={() => handleNavigate(post.id)}
                className="group bg-white border border-slate-200 p-8 cursor-pointer hover:border-indigo-900 hover:shadow-lg transition-all"
              >
                <div className="text-xs font-mono text-slate-400 mb-2">
                  {new Date(post.created_at).toLocaleDateString()}
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-4 group-hover:text-indigo-900 transition-colors line-clamp-2">
                  {post.title}
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed mb-4 line-clamp-3">
                  {post.excerpt}
                </p>
                <span className="text-xs font-bold text-indigo-900 flex items-center gap-1 group-hover:underline">
                  READ MORE <ArrowRight size={12} />
                </span>
              </div>
            ))}
          </div>

          <div className="flex justify-center gap-4">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
              className="flex items-center gap-2 px-6 py-3 border border-slate-200 text-sm font-bold disabled:opacity-30 hover:bg-slate-50 transition-colors"
            >
              <ChevronLeft size={16} /> PREV
            </button>
            <span className="flex items-center px-4 font-mono text-slate-400">
              {page} / {totalPages}
            </span>
            <button
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              className="flex items-center gap-2 px-6 py-3 border border-slate-200 text-sm font-bold disabled:opacity-30 hover:bg-slate-50 transition-colors"
            >
              NEXT <ChevronRight size={16} />
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Blog;
