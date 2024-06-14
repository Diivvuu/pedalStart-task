import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import "./dashboard.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import { getAllTasks } from "../../redux/taskSlice";

const Dashboard = () => {
  const tasklist = useSelector((state) => state.task);
  const { AllTasks } = tasklist;
  const user = useSelector((state) => state.auth);
  const { currentUser } = user;

  let pendingTask = [];
  let completedTask = [];
  for (let i = 0; i < AllTasks.length; i++) {
    if (AllTasks[i].status === "todo") {
      pendingTask.push(AllTasks[i]);
    } else if (AllTasks[i].status === "done") {
      completedTask.push(AllTasks[i]);
    }
  }

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllTasks(currentUser.token, currentUser.id));
  }, [dispatch, currentUser.token, currentUser.id]);

  return (
    <div className="dashboard">
      <div className="dashboard__left">
        <Sidebar />
      </div>
      <div className="dashboard__right">
        <div className="dashboard__content">
          <h2 className="dashboard__title">Task Status Dashboard</h2>
          <div className="dashboard__stats">
            <div className="dashboard__stat">
              <div className="stat__count">{pendingTask.length}</div>
              <div className="stat__label">Todo Tasks</div>
            </div>
            <div className="dashboard__stat">
              <div className="stat__count">{completedTask.length}</div>
              <div className="stat__label">Completed Tasks</div>
            </div>
          </div>
          <div className="dashboard__actions">
            <Link to="/taskmanager" className="button button-primary">
              Create New Task
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
