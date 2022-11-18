import { useState } from "react";

export default function Todo({
  todo,
  toggleComplete,
  handleDelete,
  handleEdit,
  openFile,
}) {
  const [newTitle, setNewTitle] = useState(todo.title);
  const [newText, setNewText] = useState(todo.text);

  const handleChangeTitle = (e) => {
    e.preventDefault();
    if (todo.complete === true) {
      setNewTitle(todo.title);
    } else {
      todo.title = "";
      setNewTitle(e.target.value);
    }
  };
  const handleChangeText = (e) => {
    e.preventDefault();
    if (todo.complete === true) {
      setNewText(todo.text);
    } else {
      todo.text = "";
      setNewText(e.target.value);
    }
  };
  let url;
  return (
    <div className={`todo ${todo.completed ? "todoComplete" : null}`}>
      <input
        type="text"
        value={todo.title === "" ? newTitle : todo.title}
        onChange={handleChangeTitle}
        onKeyDown={(e) =>
          e.keyCode === 13 ? handleEdit(todo, newTitle, "title") : null
        }
        onBlur={() => handleEdit(todo, newTitle, "title")}
      ></input>
      <textarea
        type="text"
        value={todo.text === "" ? newText : todo.text}
        onChange={handleChangeText}
        onKeyDown={(e) => (e.keyCode === 13 ? handleEdit(todo, newText) : null)}
        onBlur={() => handleEdit(todo, newText)}
      ></textarea>
      <div>Date of completion:{todo.date ? todo.date : "unlimited"}</div>
      {todo.completed ? (
        <div className="completedTodo" onClick={() => handleDelete(todo.id)}>
          &#10004;
        </div>
      ) : null}
      <button className="togglecComplete" onClick={() => toggleComplete(todo)}>
        {!todo.completed ? "fulfilled" : "failed"}
      </button>
      <div className="closeTodo" onClick={() => handleDelete(todo.id)}>
        &#10008;
      </div>
      <div className="fileWrapper">
        <a className="file" href={url} onClick={(e) => openFile(e, todo.id)}>
          open File
        </a>
      </div>
    </div>
  );
}
