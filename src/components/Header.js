export default function Header({ checked, setCheked }) {
  return (
    <div className="header">
      <div className="wrapper">
        <h1 className="Title">TODO LIST</h1>
      </div>
      <div className="switchWrapper">
        <span>grid</span>
        <label className="switch">
          <input
            type="checkbox"
            defaultChecked={checked}
            onChange={() => setCheked(!checked)}
          />
          <span className="slider round"></span>
        </label>
        <span>col</span>
      </div>
    </div>
  );
}
