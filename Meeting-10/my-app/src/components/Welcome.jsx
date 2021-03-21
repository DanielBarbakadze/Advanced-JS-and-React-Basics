import React from "react";

function Welcome(props) {
  console.log(props);
  return (
    <div>
      <h1>Welcome {props.name}</h1>
      {props.children}
    </div>
  );
}

export default Welcome;
