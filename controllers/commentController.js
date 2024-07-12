const commentModel = require("../models/commentModel")

// send comment data to the comment model to create a new comment and redirect to the game page as a refresh
function createComment(req, res, next) {
    commentModel.createComment(req.body)
        .then(game => res.redirect(`/games/${game.gameId}`))
        .catch((err)=>{
            res.status(404)
            next(err)
        })
}

// send comment id to the model for deletion and redirect to the game page as a refresh
function deleteComment(req, res, next) {
    commentModel.getCommentById(parseInt(req.params.id))
        .then(comment => {
        commentModel.deleteComment(parseInt(req.params.id))
            .then(() => {
            console.log('in controller', comment)
            res.redirect(`/games/${req.body.gameId}`)
        })
    })
.catch((err)=>{
        res.status(404)
        next(err)
    })
}

module.exports = {
    createComment,
    deleteComment
}