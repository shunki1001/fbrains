import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabaseClient";
import { ChevronLeft } from "lucide-react";

const Page = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      if (!supabase || !slug) {
        setLoading(false);
        return;
      }
      setLoading(true);
      const { data } = await supabase
        .from("posts")
        .select("*")
        .eq("slug", slug)
        .eq("post_type", "page")
        .single();

      if (data) setPost(data);
      setLoading(false);
    };

    fetchPost();
    window.scrollTo(0, 0);
  }, [slug]);

  if (loading)
    return (
      <div className="h-screen flex items-center justify-center">
        <div className="animate-spin w-8 h-8 border-4 border-indigo-900 border-t-transparent rounded-full"></div>
      </div>
    );
  if (!post)
    return (
      <div className="py-20 text-center">ページが見つかりませんでした。</div>
    );

  return (
    <div className="max-w-3xl mx-auto px-6 py-12">
      <button
        onClick={() => navigate("/")}
        className="mb-8 flex items-center gap-2 text-xs font-bold text-slate-500 hover:text-indigo-900 transition-colors"
      >
        <ChevronLeft size={14} /> トップに戻る
      </button>

      <article>
        <header className="mb-12 text-center border-b border-slate-200 pb-12">
          <h1 className="text-3xl md:text-5xl font-serif font-bold text-slate-900 leading-tight">
            {post.title}
          </h1>
        </header>
        <div
          className="prose prose-slate prose-lg max-w-none font-serif text-slate-700 leading-loose
            [&>h2]:text-2xl [&>h2]:font-bold [&>h2]:mt-12 [&>h2]:mb-6 [&>h2]:text-slate-900 [&>h2]:border-l-4 [&>h2]:border-indigo-900 [&>h2]:pl-4
            [&>h3]:text-xl [&>h3]:font-bold [&>h3]:mt-8 [&>h3]:mb-4 [&>h3]:text-slate-800
            [&>p]:mb-6
            [&>ul]:list-disc [&>ul]:pl-6 [&>ul]:mb-6
            [&>ol]:list-decimal [&>ol]:pl-6 [&>ol]:mb-6
            [&>img]:w-full [&>img]:h-auto [&>img]:rounded-sm [&>img]:shadow-md [&>img]:my-8
            [&>a]:text-indigo-700 [&>a]:underline hover:[&>a]:text-indigo-900
            [&>blockquote]:border-l-4 [&>blockquote]:border-slate-300 [&>blockquote]:pl-4 [&>blockquote]:italic [&>blockquote]:text-slate-500
          "
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
      </article>
    </div>
  );
};

export default Page;
