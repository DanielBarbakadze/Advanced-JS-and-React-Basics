// import Welcome from "./components/Welcome";

// const meetingNumber = 10;

// const greeting = () => <strong>Meeting</strong>;

// const imgURL =
//   "https://post.medicalnewstoday.com/wp-content/uploads/sites/3/2020/02/325466_1100-1100x628.jpg";

import Todo from "./components/Todo";
// import Test from "./components/Test";

function App() {
  return (
    <div className="App">
      {/* <Test /> */}
      <Todo />
      {/* <p>
        {greeting()} - {meetingNumber}
      </p>
      <img
        className={"image " + (meetingNumber === 11 ? "Today" : "Old")}
        src={imgURL}
        alt="nature"
      />
      <div>
        <Welcome name="Badri">
          <strong>Georgia</strong>
        </Welcome>
        <Welcome name="Nino">
          <strong>TBC</strong>
        </Welcome>
      </div> */}
    </div>
  );
}

export default App;
