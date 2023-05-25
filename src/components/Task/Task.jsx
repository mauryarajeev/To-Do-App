import React, { useContext, useState } from 'react';
import moment from 'moment';
import "./task.css";
import TaskContext from '../../context/TaskContext';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

function Task({ task, id }) {
  const { dispatch } = useContext(TaskContext);
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(task.title);
  const [editedDescription, setEditedDescription] = useState(task.description);

  const handleRemove = (e) => {
    e.preventDefault();

    dispatch({
      type: "REMOVE_TASK",
      id
    });
  };

  const handleMarkDone = (e) => {
    dispatch({
      type: "MARK_DONE",
      id
    });
  };

  const handleEdit = (e) => {
    e.preventDefault();
    setIsEditing(true);
  };

  const handleSave = (e) => {
    e.preventDefault();
    // Dispatch an action to update the task with the edited values
    dispatch({
      type: "UPDATE_TASK",
      id,
      title: editedTitle,
      description: editedDescription
    });
    setIsEditing(false);
  };

  return (
    <div className='bg-slate-300 py-4 rounded-lg shadow-md flex items-center justify-center gap-2 mb-3'>
      <div className="mark-done">
        <input type="checkbox" className="checkbox" onChange={handleMarkDone} checked={task.completed} />
      </div>
      <div className="task-info text-slate-900 text-sm w-10/12">
        {isEditing ? (
          <>
            <input
              type="text"
              value={editedTitle}
              onChange={(e) => setEditedTitle(e.target.value)}
            />
            <textarea
              value={editedDescription}
              onChange={(e) => setEditedDescription(e.target.value)}
            />
          </>
        ) : (
          <>
            <h4 className="task-title text-lg capitalize">{task.title}</h4>
            <p className="task-description">{task.description}</p>
          </>
        )}
        <div className=' italic opacity-60'>
          {task?.createdAt ? (
            <p>{moment(task.createdAt).fromNow()}</p>
          ) : (
            <p>just now</p>
          )}
        </div>
      </div>
      <div className="task-actions" >
        {isEditing ? (
          <button onClick={handleSave}>Save</button>
        ) : (
          <>
            <button onClick={handleEdit} className="edit-button"   style={{ fontSize: 25, cursor: "pointer" }}>
        <EditIcon />
      </button>
            <DeleteIcon
              style={{ fontSize: 30, cursor: "pointer" }}
              size="large"
              onClick={handleRemove}
              className="remove-task-btn bg-blue-700 rounded-full border-2 shadow-2xl border-white p-1"
            />
          </>
        )}
      </div>
    </div>
  );
}

export default Task;
