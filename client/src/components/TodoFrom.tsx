import type { Task } from "../models/todo";
import { useState } from "react";
interface TaskFormProps {
  initialTask?: Task | null;
  onSubmit: (title: string, description: string, isDone: boolean) => void;
  onCancel: () => void;
}

const TodoForm = ({ initialTask, onSubmit, onCancel }: TaskFormProps) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isDone, setIsDone] = useState(false);

  return (
    <>
      <form>
        <h2>Add New Task</h2>
        <div>
          <label>
            Title <span>*</span>
          </label>
          <input type="text" placeholder="Enter task title" value={title} />
        </div>
        <div>
          <label>
            Description <span>*</span>
          </label>
          <textarea value={description} placeholder="Enter task description" />
        </div>

        <div>
          <label>Status (Done)</label>
          <select value={String(isDone)}>
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
