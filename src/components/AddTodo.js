import { useRef } from "react";

export default function AddTodo({
  setFile,
  handleSubmit,
  text,
  setText,
  title,
  setTitle,
  setDate,
}) {
  const dateRef = useRef(null);
  return (
    <div className="wrapper">
      <form className="addTodo" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Заголовок"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        ></input>
        <textarea
          type="text"
          placeholder="Описание"
          value={text}
          onChange={(e) => setText(e.target.value)}
        ></textarea>

        <input
          ref={dateRef}
          type="date"
          onBlur={() => setDate(dateRef.current.value)}
          onKeyDown={(e) =>
            e.keyCode === 13 ? setDate(dateRef.current.value) : null
          }
        ></input>
        <input
          className="inpFile"
          id="file"
          type="file"
          onChange={(e) => setFile(e.target.files)}
        />
        <label for="file" className="fileLabel">
          Выберите файл
        </label>
        <button>Add</button>
      </form>
    </div>
  );
}
