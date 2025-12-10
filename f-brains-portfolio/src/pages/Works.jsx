import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase, isSupabaseEnabled } from "../lib/supabaseClient";
import { ArrowRight, ChevronLeft } from "lucide-react";

const Works = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (!supabase) {
      setLoading(false);
      return;
    }

    const fetchPosts = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from("posts")
        .select("id, title, created_at, content, slug, post_thumbnail") // slug と post_thumbnail も取得
        .eq("post_type", "work") // post_type 'works' で絞り込み
        .eq("status", "published")
        .order("created_at", { ascending: false });

      if (data) {
        const formattedPosts = data.map((p) => ({
          ...p,
          excerpt: p.content
            ? p.content.replace(/<[^>]+>/g, "").substring(0, 100) + "..."
            : "",
        }));
        setPosts(formattedPosts);
      }
      setLoading(false);
    };

    fetchPosts();
    window.scrollTo(0, 0);
  }, []);

  // 詳細ページは固定ページと同様の '/:slug' で表示するため、Pageコンポーネントに遷移させる
  const handleNavigate = (slug) => {
    navigate(`/${slug}`);
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
    <div className="max-w-6xl mx-auto px-6 py-12 min-h-[60vh]">
      <button
        onClick={() => navigate("/")}
        className="mb-12 flex items-center gap-2 text-xs font-bold text-slate-500 hover:text-indigo-900 transition-colors"
      >
        <ChevronLeft size={14} /> トップに戻る
      </button>

      <div className="text-center mb-16">
        <span className="text-indigo-900 font-bold tracking-widest text-xs uppercase mb-2 block">
          WORKS
        </span>
        <h1 className="text-3xl font-serif font-bold text-slate-900">
          公開実績
        </h1>
      </div>

      {loading ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="h-96 bg-slate-100 animate-pulse rounded-sm"
            ></div>
          ))}
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => (
            <div
              key={post.id}
              onClick={() => handleNavigate(post.slug)}
              className="group bg-white border border-slate-200 cursor-pointer hover:border-indigo-900 hover:shadow-lg transition-all flex flex-col"
            >
              {post.post_thumbnail && (
                <div className="w-full h-48 overflow-hidden">
                  <img
                    src={post.post_thumbnail}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
              )}
              <div className="p-6 flex flex-col flex-grow">
                <div className="text-xs font-mono text-slate-400 mb-2">
                  {new Date(post.created_at).toLocaleDateString()}
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-3 group-hover:text-indigo-900 transition-colors line-clamp-2">
                  {post.title}
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed mb-4 line-clamp-3 flex-grow">
                  {post.excerpt}
                </p>
                <span className="text-xs font-bold text-indigo-900 flex items-center gap-1 group-hover:underline mt-auto">
                  READ MORE <ArrowRight size={12} />
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Works;
