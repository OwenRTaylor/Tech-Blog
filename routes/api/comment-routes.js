const router = require('express').Router();
const { Post, User, Comment } = require('../../models');

router.get('/', (req,res) => {
    Comment.findAll({
        include: {
            model: User,
            attributes:['username']
        }
    })
    .then(dbCommentData => res.json(dbCommentData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
}
)

router.post('/', (req,res) => {
    Comment.create({
        comment_text: req.body.comment_text,
        user_id: req.session.user_id,
        post_id: req.session.post_id
    })
    .then(dbCommentData => res.json(dbCommentData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    })
})

router.delete('/:id', (req,res) => {
    Comment.destroy({
        where: {
            id: req.params.id
        }
    })
    .then(dbCommentData => res.json(dbCommentData))
    .catch(err => {
        console.log(err);
        res.status.json(err);
    })
})
module.exports = router