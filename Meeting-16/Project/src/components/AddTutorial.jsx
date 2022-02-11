import React, { useState } from "react";
import TutorialDataService from "../services/TutorialService";

const AddTutorial = () => {
  const [submitted, setSubmitted] = useState(false);

  const [title, setTitle] = useState("");

  const [description, setDescription] = useState("");

  const saveTutorial = () => {
    let data = {
      title: title,
      description: description,
      published: false,
    };

    TutorialDataService.create(data)
      .then(() => setSubmitted(true))
      .catch((e) => console.log(e));
  };

  const clearStates = () => {
    setTitle("");
    setDescription("");
    setSubmitted(false);
  };

  return (
    <div className="submit-form">
      {submitted ? (
        <div>
          <h4>You submitted successfully!</h4>
          <button className="btn btn-success" onClick={clearStates}>
            Add
          </button>
        </div>
      ) : (
        <div>
          <div className="form-group">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              className="form-control"
              id="title"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              name="title"
            />
          </div>

          <div className="form-group">
            <label htmlFor="description">Description</label>
            <input
              type="text"
              className="form-control"
              id="description"
              required
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              name="description"
            />
          </div>

          <button onClick={saveTutorial} className="btn btn-success">
            Submit
          </button>
        </div>
      )}
    </div>
  );
};

export default AddTutorial;
