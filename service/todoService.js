const Todo = require("../models/todoModel");

// Lấy tất cả công việc
const getAllTodos = async () => {
  const todos = await Todo.findAll(); // Sequelize
  return todos;
};

// Tạo công việc mới
const createTodo = async (data) => {
  const todo = await Todo.create(data);
  return todo;
};

// Cập nhật công việc
const updateTodo = async (id, data) => {
  const todo = await Todo.findByPk(id);
  if (!todo) throw new Error("Todo not found");

  await todo.update(data);
  return todo;
};

// Xóa công việc
const deleteTodo = async (id) => {
  const todo = await Todo.findByPk(id);
  if (!todo) throw new Error("Todo not found");

  await todo.destroy();
  return { message: "Todo deleted successfully" };
};

module.exports = {
  getAllTodos,
  createTodo,
  updateTodo,
  deleteTodo,
};
