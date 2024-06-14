import React, { useState, useEffect } from "react";

const EditTask = ({
  taskId,
  existingTask,
  existingStatus,
  onSave,
  onCancel,
}) => {
  const [task, setTask] = useState("");
  const [status, setStatus] = useState("backlog");

  useEffect(() => {
    if (existingTask) setTask(existingTask);
    if (existingStatus) setStatus(existingStatus);
  }, [existingTask, existingStatus]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({ _id: taskId, task, status });
  };

  return (
    <div>
      <form id="taskForm" onSubmit={handleSubmit}>
        <input
          type="text"
          id="taskInput"
          value={task}
          onChange={(e) => setTask(e.target.value)}
          placeholder="Enter task"
          required
        />
        <select
          id="statusSelect"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <option value="backlog">Backlog</option>
          <option value="todo">To Do</option>
          <option value="doing">Doing</option>
          <option value="done">Done</option>
        </select>
        <button type="submit">Save Task</button>
        <button type="button" onClick={onCancel}>
          Cancel
        </button>
      </form>
    </div>
  );
};

export default EditTask;
