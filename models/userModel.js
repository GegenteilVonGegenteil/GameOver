const User = require('./sequelizeModels/users.model.js');
const Comment = require("./sequelizeModels/comments.model");

// Get all users
function getAllUsers(){
    return User.findAll();
}

// Get user by userId (primarykey)
function getUserById(id) {
    return User.findByPk(id);
}

// Update user, finds right user by userId, gets data from controller
function updateUser(userData) {
    return User.update(userData, {
        where: { userId: userData.userId }
    }).then(() => userData)
}

// Create user, gets data from controller
function createUser(userData) {
    return User.create(userData);
}

// Delete user by userId
function deleteUser(id) {
    return User.destroy({
        where: { userId: id }
    });
}

module.exports = {
    getAllUsers,
    getUserById,
    updateUser,
    createUser,
    deleteUser,
}