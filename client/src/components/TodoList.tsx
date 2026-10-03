import { useEffect, useState } from "react";
import type { Task } from "../models/todo";
import axios from "axios";

const TodoList = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const API_URL = "http://localhost:8000/api/todos";

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async (): Promise<void> => {
    try {
      const response = await axios.get(API_URL);
      const taskArray = Array.isArray(response.data)
        ? response.data
        : response.data.data || [];

      setTasks(taskArray);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };
  return (
    <>
      <div className="table-container">
        <div className="table-row table-header">
          <div className="table-cell">Title</div>
          <div className="table-cell">Description</div>
          <div className="table-cell">Done</div>
          <div className="table-cell">Action</div>
        </div>

        {tasks.map((task) => (
          <div className="table-row" key={task._id}>
            <div className="table-cell">{task.title}</div>
            <div className="table-cell">{task.description}</div>
            <div className="table-cell">
              <span className={`badge ${task.done}`}>
                {task.done ? "True" : "False"}
              </span>
            </div>
            <div
              className="table-cell"
              style={{ display: "flex", gap: "0.5rem" }}
            ></div>
          </div>
        ))}
      </div>
    </>
  );
};

export default TodoList;
