import React, { useEffect, useState } from "react";
import TutorialDataService from "../services/TutorialService";

const Tutorial = ({ tutorial, refreshList }) => {
  const [title, setTitle] = useState(tutorial.title);

  const [description, setDescription] = useState(tutorial.description);

  const [published, setPublished] = useState(tutorial.published);

  const [message, setMessage] = useState("");

  const updatePublished = (status) => {
    TutorialDataService.update(tutorial.key, { published: status })
      .then(() => {
        setPublished(status);
        setMessage("The status was updated successfully!");
      })
      .catch((e) => console.log(e));
  };

  const updateTutorial = () => {
    const data = {
      title: title,
      description: description,
    };

    TutorialDataService.update(tutorial.key, data)
      .then(() => setMessage("The tutorial was updated successfully!"))
      .catch((e) => console.log(e));
  };

  const deleteTutorial = () => {
    TutorialDataService.delete(tutorial.key)
      .then(() => refreshList())
      .catch((e) => console.log(e));
  };

  useEffect(() => {
    setTitle(tutorial.title);
    setPublished(tutorial.published);
    setDescription(tutorial.description);
  }, [tutorial]);

  return (
    <div>
      <h4>Tutorial</h4>
      {tutorial ? (
        <div className="edit-form">
          <form>
            <div className="form-group">
              <label htmlFor="title">Title</label>
              <input
                type="text"
                className="form-control"
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="description">Description</label>
              <input
                type="text"
                className="form-control"
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label>
                <strong>Status: </strong>
              </label>
              {published ? "Published" : "Pending"}
            </div>
          </form>

          <button
            className="badge badge-primary mr-2 btn"
            onClick={() => updatePublished(!published)}
          >
            {published ? "UnPublish" : "Publish"}
          </button>

          <button
            className="badge badge-danger mr-2 btn"
            onClick={deleteTutorial}
          >
            Delete
          </button>

          <button
            type="submit"
            className="badge badge-success btn"
            onClick={updateTutorial}
          >
            Update
          </button>
          <p>{message}</p>
        </div>
      ) : (
        <div>
          <br />
          <p>Please click on a Tutorial...</p>
        </div>
      )}
    </div>
  );
};

export default Tutorial;
