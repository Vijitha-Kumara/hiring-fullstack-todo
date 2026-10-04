import { useEffect, useState } from "react";
import type { Task } from "../models/todo";
import TodoForm from "./TodoFrom";
import axios from "axios";


const TodoList = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [showAddForm, setShowAddForm] = useState(false);
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

  const handleDelete = async (id: string) => {
    const isConfirmed = window.confirm(
      "Are you sure you want to delete this task?",
    );

    if (!isConfirmed) return;

    try {
      await axios.delete(`${API_URL}/${id}`);

      setTasks((prevTasks) => prevTasks.filter((task) => task._id !== id));
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  const handleToggleDone = async (task: Task) => {
    try {
      const response = await axios.put(`${API_URL}/${task._id}`, {
        title: task.title,
        description: task.description,
        done: !task.done,
      });

      const responseData = response.data.data || response.data;      
      const updatedTask: Task = {
        ...task,
        ...responseData,
        _id: task._id,
      };

      setTasks((prevTasks) =>
        prevTasks.map((t) => (t._id === task._id ? updatedTask : t)),
      );
    } catch (error) {
      console.error("Error updating Toggle status:", error);
    }
  };

const handleCancel = () => {
  setShowAddForm(false);
};

  const handleSubmitTask = async (
    title: string,
    description: string,
    isDone: boolean,
  ): Promise<void> => {
    try {
      const response = await axios.post(API_URL, {
        title,
        description,
        done: isDone,
      });

      const createdTask = response.data.data || response.data;

      setTasks((prevTasks) => [...prevTasks, createdTask]);
      setShowAddForm(false);
    } catch (error) {
      console.error("Error saving task:", error);
    }
  };
  

  return (
    <>
      <div className="table-container">
         <div>            
        {!showAddForm && (
          <button
            onClick={() => {            
              setShowAddForm(true);
            }}
          >
            Add New Task
          </button>
        )}
         </div>
              {showAddForm && (
        <TodoForm  
           initialTask={null}
          onSubmit={handleSubmitTask}
          onCancel={handleCancel} 
        />
      )}
        
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
              style={{ display: "flex", gap: "0.5rem" }}>
             <button onClick={() => handleToggleDone(task)}>
              {"Toggle Status "}
            </button>
              <button onClick={() => handleDelete(task._id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default TodoList;
