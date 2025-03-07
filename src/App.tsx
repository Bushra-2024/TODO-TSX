import React, { useState } from "react";
interface TodoItem {
  id: string;
  title: string;
  description: string;
  completed: boolean;
}

const todoList: TodoItem[] = [
  {
    id: "1",
    title: "Buy Groceries",
    description: "Milk, eggs, and bread",
    completed: false,
  },
  {
    id: "2",
    title: "Workout",
    description: "1-hour gym session",
    completed: true,
  },
  {
    id: "3",
    title: "Study React",
    description: "Learn about useState and props",
    completed: false,
  },
  {
    id: "4",
    title: "Read a Book",
    description: "Finish 2 chapters of 'Atomic Habits'",
    completed: true,
  },
  {
    id: "5",
    title: "Call Mom",
    description: "Catch up with family",
    completed: false,
  },
  {
    id: "6",
    title: "Clean Room",
    description: "Organize desk and closet",
    completed: true,
  },
  {
    id: "7",
    title: "Write a Blog Post",
    description: "Topic: Benefits of minimalism",
    completed: false,
  },
];

const TodoApp: React.FC = () => {
  const [data, setData] = useState<TodoItem[]>(todoList);
  const [addTiltle, setAddTiltle] = useState<string>("");
  const [addDescription, setAddDescription] = useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const [editTiltle, setEditTiltle] = useState<string>("");
  const [editDescription, setEditDescription] = useState<string>("");
  const [EditModalOpen, setEditModalOpen] = useState<boolean>(false);
  const [currentTodo, setCurrentTodo] = useState<TodoItem | null>(null); // Changed from string to TodoItem

  //delete
  const deleteTodo = (id: string) => {
    setData(data.filter((e) => id !== e.id));
  };
  //completed
  const completedTodo = (id: string) => {
    const updating = data.map((el) =>
      el.id === id ? { ...el, completed: !el.completed } : el
    );
    setData(updating);
  };

  // Add
  const generateId = () => (data.length + 1).toString();
  const adding = () => {
    let newTodo: TodoItem = {
      id: generateId(),
      title: addTiltle,
      description: addDescription,
      completed: false,
    };
    setData([...data, newTodo]);
    setAddTiltle("");
    setAddDescription("");
    setIsModalOpen(false);
  };
  // edit
  function editt(todo: TodoItem) {
    setEditTiltle(todo.title);
    setEditDescription(todo.description);
    setCurrentTodo(todo);
    setEditModalOpen(true);
  }

  const editing = () => {
    if (currentTodo) {
      let updatedData = data.map((todo) =>
        todo.id === currentTodo.id
          ? { ...todo, title: editTiltle, description: editDescription }
          : todo
      );
      setData(updatedData);
      setEditModalOpen(false);
    }
  };
  return (
    <div className="flex flex-col justify-center mt-[30px] m-auto items-center">
      <div className="flex justify-center items-center gap-[120px] mb-4">
        <h1 className="font-bold text-[33px]">TODO LIST</h1>
        <button
          onClick={() => setIsModalOpen(true)}
          className="border mb-[-30px] py-1 px-4 bg-green-800 text-white rounded-sm hover:bg-green-700"
        >
          Add Task
        </button>
      </div>
      {/* addModal */}
      {isModalOpen && (
        <div className="fixed flex items-center justify-center border rounded-sm">
          <div className="bg-gray-50 p-6 w-[350px]">
            <h2 className="text-xl font-bold mb-4">Add New Task</h2>
            <input
              type="text"
              value={addTiltle}
              onChange={(e) => setAddTiltle(e.target.value)}
              placeholder="Task Title"
              className="w-full p-[10px] border rounded-md mb-2"
            />
            <input
              type="text"
              value={addDescription}
              onChange={(e) => setAddDescription(e.target.value)}
              placeholder="Task Description"
              className="w-full p-[10px] border rounded-md mb-4"
            />
            <button
              onClick={adding}
              className="px-4 py-2 bg-green-800 text-white rounded-md hover:bg-green-700 "
            >
              Save
            </button>
          </div>
        </div>
      )}
      {/* edit */}
      {EditModalOpen && currentTodo && (
        <div className="fixed flex items-center justify-center border rounded-sm">
          <div className="bg-gray-50 p-6 w-[350px]">
            <h2 className="text-xl font-bold mb-4">Edit Task</h2>
            <input
              type="text"
              value={editTiltle}
              onChange={(e) => setEditTiltle(e.target.value)}
              placeholder="Task Title"
              className="w-full p-[10px] border rounded-md mb-2"
            />
            <input
              type="text"
              value={editDescription}
              onChange={(e) => setEditDescription(e.target.value)}
              placeholder="Task Description"
              className="w-full p-[10px] border rounded-md mb-4"
            />
            <button
              onClick={editing}
              className="px-4 py-2 bg-green-800 text-white rounded-md hover:bg-green-700"
            >
              Save Changes
            </button>
          </div>
        </div>
      )}
      <div className="overflow-x-auto w-full mx-auto">
        <table className="w-full sm:w-[50%] border border-gray-300 mx-auto">
          <thead>
            <tr>
              <th className="py-1 px-2 text-start">ID</th>
              <th className="py-1 px-2 text-start">Title</th>
              <th className="py-1 px-2 text-start">Description</th>
              <th className="py-1 px-2 text-start">Completed</th>
              <th className="py-1 px-2 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {data.map((todo) => (
              <tr key={todo.id} className="border-t border-gray-200">
                <td className="py-1 px-2">{todo.id}</td>
                <td className="py-1 px-2">{todo.title}</td>
                <td className="py-1 px-2">{todo.description}</td>
                <td className="py-1 px-2">
                  <button
                    className={`px-1 py-0.5 rounded-sm text-[12px] text-white ${
                      todo.completed ? "bg-gray-700" : "bg-gray-400"
                    }`}
                  >
                    {todo.completed ? "Done" : "Not Done"}
                  </button>
                </td>
                <td className="py-3 px-4 flex gap-2 items-center">
                  <button
                    onClick={() => deleteTodo(todo.id)}
                    className="px-2 py-[1px] bg-red-500 text-[13px] text-white rounded-lg hover:bg-red-400"
                  >
                    Delete
                  </button>
                  <button
                    onClick={() => editt(todo)}
                    className="px-2 py-[1px] bg-green-800 text-[13px] text-white rounded-lg hover:bg-green-700"
                  >
                    Edit
                  </button>
                  <button className="px-3">
                    <input
                      type="checkbox"
                      checked={todo.completed}
                      onChange={() => completedTodo(todo.id)}
                      className="w-4 h-4"
                    />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TodoApp;
