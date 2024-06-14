import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {
  BiChevronLeft,
  BiChevronRight,
  BiTrash,
  BiEdit,
  BiExpand,
} from "react-icons/bi";
import { deleteItem, arrowClick } from "../../redux/taskSlice";
import "./listcard.scss";

const ListCard = ({ item, onEdit }) => {
  const [showFullTask, setShowFullTask] = useState(false);
  const dispatch = useDispatch();

  const toggleShowFullTask = () => {
    setShowFullTask(!showFullTask);
  };

  const handleLeftClick = () => {
    dispatch(arrowClick(item, "left"));
  };

  const handleRightClick = () => {
    dispatch(arrowClick(item, "right"));
  };

  const handleTrashClick = () => {
    dispatch(deleteItem(item._id));
  };

  return (
    <div>
      <ul className={`menu ${item.status}`}>
        <li>
          <p>{item._id}</p>
        </li>
        <li>
          <p>{showFullTask ? item.task : `${item.task.slice(0, 50)}...`}</p>
          {item.task.length > 50 && (
            <button className="expand-button" onClick={toggleShowFullTask}>
              {showFullTask ? "Show Less" : "Read More"}
            </button>
          )}
          <button className="expand-button" onClick={toggleShowFullTask}>
            <BiExpand />
          </button>
        </li>
        <li>
          <p>{item.status}</p>
        </li>
        <li>
          <button
            className="action-button"
            disabled={item.status === "backlog"}
            onClick={handleLeftClick}
          >
            <BiChevronLeft />
          </button>
          <button
            className="action-button"
            disabled={item.status === "done"}
            onClick={handleRightClick}
          >
            <BiChevronRight />
          </button>
          <button className="action-button" onClick={handleTrashClick}>
            <BiTrash />
          </button>
          <button className="action-button" onClick={onEdit}>
            <BiEdit />
          </button>
        </li>
      </ul>

      {showFullTask && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>Task Details</h2>
            <p>{item.task}</p>
            <button className="close-button" onClick={toggleShowFullTask}>
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ListCard;
