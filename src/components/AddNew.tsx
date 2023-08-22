import { Field, Form, Formik } from "formik";
import { useEffect } from "react";
import "./AddNew.css";
import Dialog from "./Dialog";

function AddNew() {
  const {
    state: [open, setOpen],
    content: [content, setContent],
    jsx,
  } = Dialog({
    title: "",
    children: <></>,
  });
  const originalContent = {
    title: "Add New...",
    children: (
      <>
        <p>
          Welcome to the super secret Add New menu!
          <br />
          If you are not MeowcaTheoRange, I suggest you turn back as soon as
          possible. It's not like you can use any of these tools anyway.
          <br />
          Sorry this is so sloppy, by the way. But I don't really have to
          apologize, you're not supposed to be here.
        </p>
        <div className="buttons">
          <button
            onClick={() =>
              setContent({
                title: "Add New Blog",
                children: (
                  <>
                    <div className="buttons">
                      <button
                        onClick={() => setContent(originalContent)}
                        className="material-symbols-outlined"
                      >
                        arrow_back
                      </button>
                    </div>
                    <p>
                      Create a blog quickly without having to mess with JSON.
                    </p>
                    <Formik
                      initialValues={{
                        title: "",
                        author: "MeowcaTheoRange",
                        date: new Date().toISOString().slice(0, 10),
                        connection_string: "",
                      }}
                      onSubmit={async (values, { setSubmitting }) => {
                        const blogResponse = await fetch(
                          "https://api.mtr.codes/api/blog/0",
                          {
                            method: "POST",
                            body: JSON.stringify(values),
                          }
                        );
                        console.log(await blogResponse.json());
                      }}
                    >
                      {({ isSubmitting }) => (
                        <Form className="formm">
                          <label htmlFor="connection_string">
                            MongoDB Connection String
                          </label>
                          <Field type="password" name="connection_string" />
                          <label htmlFor="title">Blog Title</label>
                          <Field type="text" name="title" />
                          <label htmlFor="author">Author</label>
                          <Field type="text" name="author" />
                          <label htmlFor="date">Date Published</label>
                          <Field type="date" name="date" />
                          <label htmlFor="content">Content (Markdown)</label>
                          <Field
                            name="content"
                            component="textarea"
                            rows="20"
                            cols="40"
                          ></Field>
                          <Field
                            type="submit"
                            name="submit"
                            value="Publish Blog"
                            disabled={isSubmitting}
                          />
                        </Form>
                      )}
                    </Formik>
                  </>
                ),
              })
            }
          >
            Blog
          </button>
        </div>
      </>
    ),
  };
  useEffect(() => {
    window.addEventListener("keydown", function (event: KeyboardEvent) {
      if (event.shiftKey && event.key === "N") {
        event.preventDefault();
        console.log("SHIFT + N");
        setOpen(true);
      }
    });
    setContent(originalContent);
  }, []);
  return <div className="AddNew">{jsx}</div>;
}

export default AddNew;
