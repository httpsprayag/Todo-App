import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleCheck,
  faPen,
  faTrashCan,
} from "@fortawesome/free-solid-svg-icons";

function App() {
  const [todo, setTodo] = useState([
    { id: 1, title: "Task 1", status: false },
    { id: 2, title: "Task 2", status: false },
  ]);
  const [newTask, setNewTask] = useState("");
  const [updateData, setUpdateData] = useState("");

  const addTask = () => {
    if (newTask) {
      let newEntry = { id: todo.length + 1, title: newTask, status: false };
      setTodo([...todo, newEntry]);
      setNewTask("");
    }
  };

  const deleteTask = (id) => {
    console.log("id :", id);
    setTodo(todo.filter((task) => task.id !== id));
  };

  const markDone = (id) => {
    let markedTask = todo.map((task) => {
      if (task.id === id) {
        return { ...task, status: !task.status };
      }
      console.log("task : ", task);
      return task;
    });
    setTodo(markedTask);
  };

  const cancelUpdate = () => {
    setUpdateData("");
  };

  const changeTask = (e) => {
    let newEntry = {
      id: updateData.id,
      title: e.target.value,
      status: updateData.status ? true : false,
    };
    setUpdateData(newEntry);
    console.log("updatedata: ", updateData);
  };

  const updateTask = () => {
    const filteredRecords = [...todo].filter(
      (task) => task.id !== updateData.id
    );
    let updatedObject = [...filteredRecords, updateData];
    setTodo(updatedObject);
    console.log("todo : ", todo);
    setUpdateData("");
  };

  return (
    <div className="container App">
      <br />
      <br />
      <h2>React-Todo-App</h2>
      <br /> <br />
      {todo && todo.length ? "" : "No Tasks..."}
      {updateData && updateData ? (
        <div className="row mb-3">
          {/* update task */}
          <div className="col">
            <input
              type="text"
              className="form-control form-control-lg"
              value={updateData.title}
              onChange={(e) => changeTask(e)}
            />
          </div>
          <div className="col-auto">
            <button
              className="btn btn-lg btn-success mx-4"
              onClick={updateTask}
            >
              Update
            </button>
            <button className="btn btn-lg btn-warning" onClick={cancelUpdate}>
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <div className="row mb-3">
          {/* Add new task */}
          <div className="col">
            <input
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
              type="text"
              className="form-control form-control-lg"
            />
          </div>
          <div className="col-auto">
            <button onClick={addTask} className="btn btn-lg btn-success">
              Add Task
            </button>
          </div>
        </div>
      )}
      {/* Task-list */}
      {todo?.map((task, index) => {
        return (
          <div key={task.id} className="col taskBg my-3">
            <div className={task.status ? "done tasks" : "tasks"}>
              <div className="taskNumber">{index + 1}</div>
              <div className="taskText">{task.title}</div>
            </div>
            <div className="iconWrapper">
              <button className="btn-done" onClick={() => markDone(task.id)}>
                <FontAwesomeIcon icon={faCircleCheck} />
              </button>
              {!task.status && (
                <button
                  className="btn-edit"
                  onClick={() =>
                    setUpdateData({
                      id: task.id,
                      title: task.title,
                      status: task.status ? true : false,
                    })
                  }
                >
                  <FontAwesomeIcon icon={faPen} />
                </button>
              )}
              <button
                className="btn-delete"
                onClick={() => deleteTask(task.id)}
              >
                <FontAwesomeIcon icon={faTrashCan} />
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default App;
