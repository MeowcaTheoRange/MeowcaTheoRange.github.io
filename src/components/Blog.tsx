/* eslint-disable jsx-a11y/anchor-is-valid */
/* Someday, optimize for accessibility. */
import { useEffect, useState } from "react";
import "./Blog.css";
import Dialog from "./Dialog";

type BlogIndex = {
  title: string;
  author: string;
  date: string;
  content: string;
};

type Blogs = {
  main_uri: string;
  blog_uris: string[];
};

function BlogIndexDisplay({
  blogidx,
  dialogControls,
}: {
  blogidx: BlogIndex;
  dialogControls: any;
}) {
  const [open, setOpen] = useState(false);
  const {
    state: [_, setDialogOpen],
    content: [__, setDialogContent],
  } = dialogControls;
  return (
    <div className="BlogIndex">
      <div className="stats">
        <div className="title">
          <a
            href="#"
            onClick={() => {
              setDialogContent({
                header:
                  "Published " + new Date(blogidx.date).toLocaleDateString(),
                title: blogidx.title,
                underHeader: "by " + blogidx.author,
                children: blogidx.content,
                purpose: "Blog",
              });
              console.log(blogidx);
              setDialogOpen(true);
              return false;
            }}
          >
            <span>{blogidx.title}</span>
          </a>
        </div>
        <div className="creationName">
          <span>by {blogidx.author}</span>
          <span> • </span>
          <span>Published {new Date(blogidx.date).toLocaleDateString()}</span>
        </div>
      </div>
    </div>
  );
}

function Blog({ url }: { url: string }) {
  const [blog, setBlog] = useState([] as BlogIndex[]);
  const [page, setPage] = useState(0);
  async function getBlog() {
    setBlog(await (await fetch(url + page)).json());
    // if (blog.length === 0) setOpenness(openness - 1);
  }
  useEffect(() => {
    getBlog();
  }, [page]);
  const dialogControls = Dialog({
    title: "",
    children: ``,
    header: "",
    underHeader: "",
    purpose: "Blog",
  });
  return (
    <>
      {dialogControls.jsx}
      <div className="Blog">
        {blog[0] ? (
          blog.map((blogidx, i) => (
            <BlogIndexDisplay
              key={i}
              blogidx={blogidx}
              dialogControls={dialogControls}
            />
          ))
        ) : (
          <></>
        )}
        <div className="buttons">
          <button
            className="special_disabled"
            onClick={() => setPage(page - 1)}
            disabled={page <= 0}
          >
            See Less
          </button>
          <button disabled>Page {page}</button>
          <button
            className="special_disabled"
            onClick={() => setPage(page + 1)}
            disabled={blog.length < 5}
          >
            See More
          </button>
        </div>
      </div>
    </>
  );
}

export default Blog;
