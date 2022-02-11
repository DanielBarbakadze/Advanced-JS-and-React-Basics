import React, { useEffect, useState } from "react";
import TutorialDataService from "../services/TutorialService";

import Tutorial from "./Tutorial";

const TutorialsList = () => {
  const [tutorials, setTutorials] = useState([]);
  const [currentTutorial, setCurrentTutorial] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(-1);

  const onDataChange = (items) => {
    let tempTutorials = [];

    items.forEach((item) => {
      let key = item.key;
      let data = item.val();
      tempTutorials.push({
        key: key,
        title: data.title,
        description: data.description,
        published: data.published,
      });
    });

    setTutorials(tempTutorials);
  };

  const setActiveTutorial = (tutorial, index) => {
    setCurrentTutorial(tutorial);
    setCurrentIndex(index);
  };

  const refreshList = () => {
    setCurrentTutorial(null);
    setCurrentIndex(-1);
  };

  const removeAllTutorials = () => {
    TutorialDataService.deleteAll()
      .then(() => refreshList())
      .catch((e) => console.log(e));
  };

  useEffect(() => {
    TutorialDataService.getAll().on("value", onDataChange);

    return () => {
      TutorialDataService.getAll().off("value", onDataChange);
    };
  }, []);

  return (
    <div className="list row">
      <div className="col-md-6">
        <h4>Tutorials List</h4>

        <ul className="list-group">
          {tutorials &&
            tutorials.map((tutorial, index) => (
              <li
                className={
                  "list-group-item " + (index === currentIndex ? "active" : "")
                }
                onClick={() => setActiveTutorial(tutorial, index)}
                key={index}
              >
                {tutorial.title}
              </li>
            ))}
        </ul>

        <button
          className="m-3 btn btn-sm btn-danger"
          onClick={removeAllTutorials}
        >
          Remove All
        </button>
      </div>
      <div className="col-md-6">
        {currentTutorial ? (
          <Tutorial tutorial={currentTutorial} refreshList={refreshList} />
        ) : (
          <div>
            <br />
            <p>Please click on a Tutorial...</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TutorialsList;
