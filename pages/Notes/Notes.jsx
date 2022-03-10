import React from "react";
import MainPage from "../../components/MainPage/MainPage";
import { Link } from "react-router-dom";

const Notes = () => {
  const deleteHandler = () => {
    if (window.confirm("Are you sure")) {
    }
  };

  return (
    <MainPage title="Welcome Back Jaden">
      {/* <Link to="createnote">
        <button style={{ marginLeft: 10, marginBottom: 6 }}>
          Create New Note
        </button>
      </Link>
      <div>
        <div>
          <div style={{ display: "flex" }}>
            <span
              style={{
                color: "black",
                textDecoration: "none",
                flex: 1,
                cursor: "pointer",
                alignSelf: "center",
                fontSize: 18,
              }}
            >
              <div>{note.title}</div>
            </span>
            <div>
              <button href={`/note/${note._id}`}>Edit</button>
              <button onClick={() => deleteHandler(note._id)}>Delete</button>
            </div>
          </div>
          <div>
            <div>
              <h4>Category - {note.category}</h4>
              <blockquote className="blockquote mb-0">
                <p>{note.content}</p>
                <footer className="blockquote-footer">Created On - date</footer>
              </blockquote>
            </div>
          </div>
        </div>
      </div> */}
    </MainPage>
  );
};

export default Notes;
