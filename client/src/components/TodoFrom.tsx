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
  const [titleError, setTitleError] = useState("");

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
    setTitleError("");
  }, [initialTask]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const trimmedTitle = title.trim(); /*form validation for title field*/
    if (!trimmedTitle) {
      setTitleError("Title is required");
      return;
    }

    if (trimmedTitle.length < 3) {
      setTitleError("Title must be at least 3 characters");
      return;
    }
    setTitleError("");
    onSubmit(title.trim(), description.trim(), isDone);
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <h3>{initialTask ? "Edit Task" : "Add New Task"}</h3>
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
              setTitleError("");
            }}
          />
          {titleError && (
            <span className="error-message">             
            {titleError}
            </span>
          )}
        </div>
        <div>
          <label>
            Description <span></span>
          </label>
          <textarea
            value={description}
            placeholder="Enter task description"
            onChange={(e) => {
              setDescription(e.target.value);
            }}
          />
        </div>

        <div className="status-field">
          <label>
            <input
              type="checkbox"
              checked={isDone}
              onChange={(e) => setIsDone(e.target.checked)}
            />
            <span className="done-label">Done</span>
          </label>
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
