import type { Task } from "../models/todo";
import { useState, useEffect } from "react";
interface TaskFormProps {
  initialTask?: Task | null;
  onSubmit: (title: string, description: string, isDone: boolean) => void;
  onCancel: () => void;
}

const TodoForm = ({ initialTask, onSubmit, onCancel }: TaskFormProps) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    if (initialTask) {
      setTitle(initialTask.title || "");
      setDescription(initialTask.description || "");
      setIsDone(initialTask.done ?? false);
    } else {
      setTitle("");
      setDescription("");
      setIsDone(false); 
    }
  }, [initialTask]);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    onSubmit(title.trim(), description.trim(), isDone);
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
         <h3 >
        {initialTask ? "Edit Task" : "Add New Task"}
      </h3>
        <div>
          <label>
            Title <span>*</span>
          </label>
          <input
            type="text"
            placeholder="Enter task title"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
            }}
          />
        </div>
        <div>
          <label>
            Description <span>*</span>
          </label>
          <textarea
            value={description}
            placeholder="Enter task description"
            onChange={(e) => {
              setDescription(e.target.value);
            }}
          />
        </div>

        <div>
          <label>Status (Done)</label>
          <select
            value={String(isDone)}
            onChange={(e) => {
              setIsDone(e.target.value === "true");
            }}
          >
            <option value="false">False (Pending)</option>
            <option value="true">True (Completed)</option>
          </select>
        </div>
        <button type="submit">
          {" "}
          {initialTask ? "Update Task" : "Save Task"}
        </button>
        <button type="button" onClick={onCancel}>
          Cancel
        </button>
      </form>
    </>
  );
};
export default TodoForm;
