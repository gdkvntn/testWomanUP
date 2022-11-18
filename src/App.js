import "./styles/style.scss";
import AddTodo from "./components/AddTodo";
import Header from "./components/Header";
import Todo from "./components/Todo";
import {
  collection,
  query,
  onSnapshot,
  doc,
  updateDoc,
  deleteDoc,
  setDoc,
} from "firebase/firestore";
import { storage } from "./firebase";
import { ref, uploadBytes, deleteObject } from "firebase/storage";
import { db } from "./firebase";
import { useEffect, useState } from "react";
import { customAlphabet } from "nanoid";
const nanoid = customAlphabet("1234567890", 5);

function App() {
  const [checked, setChecked] = useState(true);
  const [file, setFile] = useState(null);
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [date, setDate] = useState("");

  useEffect(() => {
    const q = query(collection(db, "todos"));
    onSnapshot(q, (querySnapshot) => {
      let todosArr = [];
      querySnapshot.forEach((doc) => {
        todosArr.push({ ...doc.data(), id: doc.id });
      });
      setTodos(todosArr);
    });
  }, []);

  const handleEdit = async (todo, str, title) => {
    await updateDoc(
      doc(db, "todos", todo.id),
      title === "title" ? { title: str } : { text: str }
    );
  };

  const toggleComplete = async (todo) => {
    await updateDoc(doc(db, "todos", todo.id), {
      completed: !todo.completed,
    });
  };

  const handleDelete = async (id) => {
    await deleteDoc(doc(db, "todos", id));
    const desertRef = ref(storage, `files/${id}`);
    deleteObject(desertRef);
  };

  const uploadFile = (id) => {
    if (file === null) return;
    const fileRef = ref(storage, `files/${id}`);
    uploadBytes(fileRef, file[0]);
    setFile(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let id = nanoid();
    await setDoc(doc(db, "todos", id), {
      title,
      text,
      date,
      completed: false,
    });
    uploadFile(id);
    setTitle("");
    setText("");
    setDate("");
  };

  return (
    <div className="App">
      <Header checked={checked} setCheked={setChecked} />
      <AddTodo
        setDate={setDate}
        text={text}
        setText={setText}
        title={title}
        setTitle={setTitle}
        handleSubmit={handleSubmit}
        uploadFile={uploadFile}
        setFile={setFile}
      />

      <div className={checked ? "todosWrapperCol" : "todosWrapperGrid"}>
        {todos.map((todo) => {
          return (
            <Todo
              file={file}
              setFile={setFile}
              key={todo.id}
              todo={todo}
              toggleComplete={toggleComplete}
              handleDelete={handleDelete}
              handleEdit={handleEdit}
            />
          );
        })}
      </div>
    </div>
  );
}

export default App;
