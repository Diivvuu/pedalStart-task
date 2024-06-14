import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllTasks, editTask } from "../../redux/taskSlice";
import ListCard from "./ListCard";
import EditTask from "./EditTask";
import "./tasklist.scss";

const TaskList = () => {
  const [editingTask, setEditingTask] = useState(null);
  const [expandedTask, setExpandedTask] = useState(null);

  const auth = useSelector((state) => state.auth);
  const tasks = useSelector((state) => state.task);

  const { currentUser } = auth;
  const { AllTasks } = tasks;

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllTasks(currentUser.token, currentUser.id));
  }, [dispatch, currentUser.token, currentUser.id]);

  const handleEdit = (task) => {
    setEditingTask(task);
  };

  const handleSave = (updatedTask) => {
    dispatch(editTask(updatedTask._id, updatedTask.task, updatedTask.status));
    setEditingTask(null);
  };

  const handleExpand = (taskId) => {
    if (expandedTask === taskId) {
      setExpandedTask(null);
    } else {
      setExpandedTask(taskId);
    }
  };

  const shouldExpand = (taskId) => expandedTask === taskId;

  return (
    <div>
      {editingTask ? (
        <EditTask
          taskId={editingTask._id}
          existingTask={editingTask.task}
          existingStatus={editingTask.status}
          onSave={handleSave}
          onCancel={() => setEditingTask(null)}
        />
      ) : (
        <>
          <ul className="list-header">
            <li>
              <h5>Id</h5>
            </li>
            <li>
              <h5>Issue Name</h5>
            </li>
            <li>
              <h5>Status</h5>
            </li>
            <li>
              <h5>Action</h5>
            </li>
          </ul>
          {Object.values(AllTasks).map((item) => (
            <ListCard
              key={item._id}
              item={item}
              onEdit={() => handleEdit(item)}
              expanded={shouldExpand(item._id)}
              onExpand={() => handleExpand(item._id)}
            />
          ))}
        </>
      )}
    </div>
  );
};

export default TaskList;
