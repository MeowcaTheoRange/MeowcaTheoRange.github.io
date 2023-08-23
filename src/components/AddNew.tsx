import { ArrayHelpers, Field, FieldArray, Form, Formik } from "formik";
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
          <button onClick={() => setContent(blogContent)}>Blog</button>
          <button onClick={() => setContent(eventContent)}>Events</button>
          <button onClick={() => setContent(markEvents)}>Mark Event</button>
          <button onClick={() => setContent(galleryContent)}>
            Gallery Image
          </button>
        </div>
      </>
    ),
  };
  const blogContent = {
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
        <p>Create a blog quickly without having to mess with JSON.</p>
        <Formik
          initialValues={{
            title: "",
            author: "MeowcaTheoRange",
            date: new Date().toISOString().slice(0, 19),
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
            const response = await blogResponse.json();
            if (response) window.location.reload();
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
              <Field type="datetime-local" name="date" />
              <label htmlFor="content">Content (Markdown)</label>
              <Field
                name="content"
                component="textarea"
                rows="20"
                cols="40"
              ></Field>
              <span className="sbs">
                <Field
                  type="submit"
                  name="submit"
                  value="Publish Blog"
                  disabled={isSubmitting}
                />
              </span>
            </Form>
          )}
        </Formik>
      </>
    ),
  };
  const eventContent = {
    title: "Add New Event",
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
        <p>Create an event quickly without having to mess with JSON.</p>
        <Formik
          initialValues={{
            name: "",
            dateStart: new Date().toISOString().slice(0, 10),
            dateEnd: new Date().toISOString().slice(0, 10),
            location: "",
            url: "",
            completed: false,
            postmortem: "",
            connection_string: "",
          }}
          onSubmit={async (values, { setSubmitting }) => {
            const blogResponse = await fetch(
              "https://api.mtr.codes/api/events/0",
              {
                method: "POST",
                body: JSON.stringify(values),
              }
            );
            const response = await blogResponse.json();
            if (response) window.location.reload();
          }}
        >
          {({ isSubmitting }) => (
            <Form className="formm">
              <label htmlFor="connection_string">
                MongoDB Connection String
              </label>
              <Field type="password" name="connection_string" />
              <label htmlFor="name">Event Name</label>
              <Field type="text" name="name" />
              <label htmlFor="dateStart">Starting Date</label>
              <Field type="date" name="dateStart" />
              <label htmlFor="dateEnd">Ending Date</label>
              <Field type="date" name="dateEnd" />
              <label htmlFor="location">Location</label>
              <Field type="text" name="location" placeholder="City, State" />
              <label htmlFor="url">Web Link</label>
              <Field type="url" name="url" placeholder="https://..." />
              <span className="sbs">
                <Field
                  type="submit"
                  name="submit"
                  value="Publish Event"
                  disabled={isSubmitting}
                />
              </span>
            </Form>
          )}
        </Formik>
      </>
    ),
  };
  const markEvents = {
    title: "Mark Event",
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
        <p>Mark an event completed, add a postmortem.</p>
        <Formik
          initialValues={{
            completed: false,
            postmortem: "",
            connection_string: "",
            event_name: "",
          }}
          onSubmit={async (values, { setSubmitting }) => {
            const blogResponse = await fetch(
              "https://api.mtr.codes/api/events/0",
              {
                method: "PUT",
                body: JSON.stringify(values),
              }
            );
            const response = await blogResponse.json();
            if (response) window.location.reload();
          }}
        >
          {({ isSubmitting }) => (
            <Form className="formm">
              <label htmlFor="connection_string">
                MongoDB Connection String
              </label>
              <Field type="password" name="connection_string" />
              <label htmlFor="event_name">Edit Event...</label>
              <Field type="text" name="event_name" />
              <label htmlFor="completed">Completed?</label>
              <Field type="checkbox" name="completed" />
              <label htmlFor="postmortem">Postmortem</label>
              <Field
                name="postmortem"
                component="textarea"
                rows="20"
                cols="40"
              ></Field>
              <span className="sbs">
                <Field
                  type="submit"
                  name="submit"
                  value="Publish Changes"
                  disabled={isSubmitting}
                />
              </span>
            </Form>
          )}
        </Formik>
      </>
    ),
  };
  const galleryContent = {
    title: "Add New Gallery Image",
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
        <p>Create a gallery image quickly without having to mess with JSON.</p>
        <Formik
          initialValues={{
            title: "",
            description: "",
            url: "gallery/images/",
            date: new Date().toISOString().slice(0, 10),
            characters: [],
          }}
          onSubmit={async (values, { setSubmitting }) => {
            const blogResponse = await fetch(
              "https://api.mtr.codes/api/gallery/0",
              {
                method: "POST",
                body: JSON.stringify(values),
              }
            );
            const response = await blogResponse.json();
            if (response) window.location.reload();
          }}
        >
          {({ isSubmitting, values }) => (
            <Form className="formm">
              <label htmlFor="connection_string">
                MongoDB Connection String
              </label>
              <Field type="password" name="connection_string" />
              <label htmlFor="title">Title</label>
              <Field type="text" name="title" />
              <label htmlFor="description">Description (Markdown)</label>
              <Field
                name="description"
                component="textarea"
                rows="20"
                cols="40"
              ></Field>
              <label htmlFor="url">Image URL</label>
              <Field type="text" name="url" placeholder="https://..." />
              <label htmlFor="date">Date Created</label>
              <Field type="date" name="date" />
              <label htmlFor="characters">Characters</label>
              <FieldArray
                name="characters"
                render={(arrayHelpers: ArrayHelpers) => (
                  <>
                    {values.characters && values.characters.length > 0 ? (
                      values.characters.map((ch, i) => (
                        <>
                          <span className="row">
                            <Field type="text" name={`characters.${i}.0`} />
                            {values.characters[i][1] != null ? (
                              <>
                                <Field type="text" name={`characters.${i}.1`} />
                              </>
                            ) : (
                              <></>
                            )}
                            <button
                              onClick={() => arrayHelpers.remove(i)}
                              type="button"
                            >
                              -
                            </button>
                          </span>
                        </>
                      ))
                    ) : (
                      <></>
                    )}
                    <span className="row">
                      <button
                        onClick={() => arrayHelpers.push(["", null])}
                        type="button"
                      >
                        Add Character
                      </button>
                      <button
                        onClick={() => arrayHelpers.push(["", ""])}
                        type="button"
                      >
                        Add Character with Author
                      </button>
                    </span>
                  </>
                )}
              />
              <span className="sbs">
                <Field
                  type="submit"
                  name="submit"
                  value="Publish Event"
                  disabled={isSubmitting}
                />
              </span>
            </Form>
          )}
        </Formik>
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
