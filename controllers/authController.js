const User = require('../models/userModel');
const Type = require('../models/typeModel');
const Todo = require('../models/todoModel');
const jwt = require('jsonwebtoken');
const { sendJsonResponse, handleServerError } = require('../utils/response');
require('dotenv').config();

async function signup(req, res) {
    try {
        const { username, email, password } = req.body;

        if (!username || !email || !password) {
            return sendJsonResponse(res, 400, { message: 'Vui lòng nhập đầy đủ thông tin' });
        }

        const existingUsername = await User.findByUsername(username);
        if (existingUsername) {
            return sendJsonResponse(res, 400, { message: 'Tên đăng nhập đã tồn tại' });
        }

        const existingEmail = await User.findByEmail(email);
        if (existingEmail) {
            return sendJsonResponse(res, 400, { message: 'Email đã được sử dụng' });
        }

        const newUser = await User.create({ username, email, password });

        const token = jwt.sign(
            { userId: newUser.id, username: newUser.username },
            process.env.JWT_SECRET,
            { expiresIn: '24h' }
        );

        sendJsonResponse(res, 201, {
            message: 'Đăng ký thành công',
            user: {
                id: newUser.id,
                username: newUser.username,
                email: newUser.email,
            },
            token,
        });
    } catch (error) {
        handleServerError(res, error);
    }
}

async function login(req, res) {
    try {
        const { username, password } = req.body;

        if (!username || !password) {
            return sendJsonResponse(res, 400, { message: 'Vui lòng nhập đầy đủ thông tin' });
        }

        const user = await User.findByUsername(username);
        if (!user) {
            return sendJsonResponse(res, 401, { message: 'Tên đăng nhập hoặc mật khẩu không đúng' });
        }

        const passwordMatch = await User.comparePassword(password, user.password);
        if (!passwordMatch) {
            return sendJsonResponse(res, 401, { message: 'Tên đăng nhập hoặc mật khẩu không đúng' });
        }

        const token = jwt.sign(
            { userId: user.id, username: user.username },
            process.env.JWT_SECRET,
            { expiresIn: '24h' }
        );

        sendJsonResponse(res, 200, {
            message: 'Đăng nhập thành công',
            user: {
                id: user.id,
                username: user.username,
                email: user.email,
            },
            token,
        });
    } catch (error) {
        handleServerError(res, error);
    }
}

async function getCurrentUser(req, res) {
    try {
        const userId = req.user.userId;
        const user = await User.findById(userId);

        if (!user) {
            return sendJsonResponse(res, 404, { message: 'Không tìm thấy người dùng' });
        }

        sendJsonResponse(res, 200, { user });
    } catch (error) {
        handleServerError(res, error);
    }
}

async function createType(req, res) {
    try {
        const { name, description } = req.body;

        if (!name || !description) {
            return sendJsonResponse(res, 400, { message: 'Vui lòng nhập đầy đủ thông tin' });
        }

        const newType = await Type.create({ name, description });

        sendJsonResponse(res, 201, {
            message: 'Tạo loại công việc thành công',
            type: newType,
        });
    } catch (error) {
        handleServerError(res, error);
    }
}

async function getTypes(req, res) {
    try {
        const types = await Type.findAll();
        sendJsonResponse(res, 200, { types });
    } catch (error) {
        handleServerError(res, error);
    }
}

async function createTodo(req, res) {
    try {
        const { content, description, type } = req.body;

        if (!content || !description || !type) {
            return sendJsonResponse(res, 400, { message: 'Vui lòng nhập đầy đủ thông tin' });
        }

        const newTodo = await Todo.create({ content, description, type });

        sendJsonResponse(res, 201, {
            message: 'Tạo công việc thành công',
            todo: newTodo,
        });
    } catch (error) {
        handleServerError(res, error);
    }
}

async function getTodos(req, res) {
    try {
        const todos = await Todo.findAll();
        sendJsonResponse(res, 200, { todos });
    } catch (error) {
        handleServerError(res, error);
    }
}

async function updateTodo(req, res) {
    try {
        const { id } = req.params;
        const { isDone } = req.body;

        if (typeof isDone !== 'boolean') {
            return sendJsonResponse(res, 400, { message: 'isDone phải là boolean' });
        }

        const updated = await Todo.update(id, { isDone });

        if (!updated) {
            return sendJsonResponse(res, 404, { message: 'Không tìm thấy công việc' });
        }

        sendJsonResponse(res, 200, { message: 'Cập nhật công việc thành công' });
    } catch (error) {
        handleServerError(res, error);
    }
}

module.exports = {
    signup,
    login,
    getCurrentUser,
    createType,
    getTypes,
    createTodo,
    getTodos,
    updateTodo,
};