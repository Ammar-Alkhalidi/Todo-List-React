

import { useState } from "react";

function TaskItem({
  task,
  toggleComplete,
  handleDelete,
  handleEditText,
  handleEditPriority,
  formatDateTime,
  setPriorityColor,
}) {
  const [isEditingText, setIsEditingText] = useState(false);
  const [editText, setEditText] = useState(task.text);

  const [isEditingPriority, setIsEditingPriority] = useState(false);
  const [editPriority, setEditPriority] = useState(task.priority);

  const handleSaveText = () => {
    const trimmed = editText.trim();
    handleEditText(task.id, trimmed || task.text);
    setIsEditingText(false);
  };

  const handleSavePriority = () => {
    handleEditPriority(task.id, editPriority);
    setIsEditingPriority(false);
  };

  return (
    <p
      className={`task-item ${task.completed ? "completed" : ""}`}
      onClick={() => toggleComplete(task.id)}
    >
      {/* Priority Label */}
      {isEditingPriority ? (
        <select
          value={editPriority}
          onChange={(e) => setEditPriority(e.target.value)}
          onBlur={handleSavePriority}
          autoFocus
        >
          <option value="H">H</option>
          <option value="N">N</option>
          <option value="L">L</option>
        </select>
      ) : (
        <span
          className="priority"
          style={setPriorityColor(task.priority)}
          onClick={(e) => {
            e.stopPropagation();
            setIsEditingPriority(true);
          }}
        >
          {task.priority}
        </span>
      )}

      {/* Task Text */}
      {isEditingText ? (
        <input
          type="text"
          value={editText}
          onChange={(e) => setEditText(e.target.value)}
          onBlur={handleSaveText}
          onClick={(e) => e.stopPropagation()}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleSaveText();
          }}
          autoFocus
        />
      ) : (
        <span
          onClick={(e) => e.stopPropagation()}
          onDoubleClick={(e) => {
            e.stopPropagation();
            setIsEditingText(true);
          }}
        >
          {task.text}
        </span>
      )}

      {/* Timestamps */}
      <span className="timestamps">
        (Created: {formatDateTime(task.createdAt)})
        {task.completed && task.completedAt && (
          <span className="completed-timestamp">
            {" "}
            (Completed: {formatDateTime(task.completedAt)})
          </span>
        )}
      </span>

      {/* Icons */}
      <span className="icons" onClick={(e) => e.stopPropagation()}>
        <i
          className="fa fa-check"
          onClick={() => toggleComplete(task.id)}
          title="Mark as Complete"
        ></i>
        <i
          className="fa fa-edit"
          onClick={() => setIsEditingText(true)}
          title="Edit Task"
        ></i>
        <i
          className="fa fa-trash"
          onClick={() => handleDelete(task.id)}
          title="Delete Task"
        ></i>
      </span>
    </p>
  );
}

export default TaskItem;
