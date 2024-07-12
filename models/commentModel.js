const Comment = require('./sequelizeModels/comments.model.js');

// creates a new comment, gets data from controller
function createComment(userData){
    return Comment.create(userData)
}

// gets all comments
async function getAllComments(){
    return Comment.findAll();
}

// gets all comments for a specific game
function getCommentsForGame(gameid){
    return Comment.findAll({
        where:{
            gameid:gameid
        }
    })
}

// gets comment by id
function getCommentById(id) {
    return Comment.findByPk(id);
}

// gets all comments for a specific user
function getCommentByUser(userid) {
    return Comment.findAll({
        where: {
            userid: userid
        }
    })
}

// updates a comment, finds right comment by id, gets data from controller
function updateComment(userData) {
    Comment.update(userData, {
        where: { id: userData.id }
    });
}

// deletes a comment by id
function deleteComment(id) {
        return Comment.destroy({
            where: { commentId: id }
        });
}

// deletes all comments by user, done when user is deleted
function deleteCommentByUser(userid){
    return Comment.destroy({
        where: {userid: userid}
    })
}

module.exports = {
    getAllComments,
    getCommentById,
    getCommentsForGame,
    updateComment,
    createComment,
    deleteComment,
    getCommentByUser,
    deleteCommentByUser
}