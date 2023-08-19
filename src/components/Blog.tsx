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
  main_uri,
  blog_uri,
  dialogControls,
}: {
  main_uri: string;
  blog_uri: string;
  dialogControls: any;
}) {
  const [blog, setBlog] = useState({} as BlogIndex);
  const [open, setOpen] = useState(false);
  async function getBlog() {
    setBlog(await (await fetch(main_uri + blog_uri + ".json")).json());
  }
  const {
    state: [_, setDialogOpen],
    content: [__, setDialogContent],
  } = dialogControls;
  useEffect(() => {
    getBlog();
  }, [blog_uri]);
  return blog.title ? (
    <div className="BlogIndex">
      <div className="stats">
        <div className="title">
          <a
            href="#"
            onClick={() => {
              setDialogContent({
                header: blog.date,
                title: blog.title,
                underHeader: "by " + blog.author,
                children: blog.content,
                purpose: "Blog",
              });
              console.log(blog);
              setDialogOpen(true);
              return false;
            }}
          >
            <span>{blog.title}</span>
          </a>
        </div>
        <div className="creationName">
          <span>by {blog.author}</span>
          <span> • </span>
          <span>{blog.date}</span>
        </div>
      </div>
    </div>
  ) : (
    <></>
  );
}

function Blog({ url }: { url: string }) {
  const [blog, setBlog] = useState({} as Blogs);
  const minOpenness = 5;
  const [openness, setOpenness] = useState(0);
  async function getBlog() {
    setBlog(await (await fetch(url)).json());
  }
  useEffect(() => {
    getBlog();
  }, []);
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
        {blog.blog_uris ? (
          blog.blog_uris
            .slice(openness - minOpenness, openness)
            .map((uri, i) => (
              <BlogIndexDisplay
                key={i}
                main_uri={blog.main_uri ?? ""}
                blog_uri={uri}
                dialogControls={dialogControls}
              />
            ))
        ) : (
          <></>
        )}
        <div className="buttons">
          <button
            className="special_disabled"
            onClick={() => setOpenness(openness - minOpenness)}
            disabled={openness <= 0}
          >
            {openness <= minOpenness ? "Close" : "See Less"}
          </button>
          <button
            className="special_disabled"
            onClick={() => setOpenness(openness + minOpenness)}
            disabled={openness >= (blog.blog_uris?.length ?? 0)}
          >
            {openness <= 0 ? "Open" : "See More"}
          </button>
        </div>
      </div>
    </>
  );
}

export default Blog;
