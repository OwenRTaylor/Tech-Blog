const router = require('express').Router();

const { Post, User,Comment } = require('../../models');
const { sequelize } = require('../../models/User');


router.get('/', (req, res) => {
    console.log('======================');
    Post.findAll({
        attributes: [
        'id',
        'post_text',
        'title',
        'created_at',
        
    ],
        order: [['created_at', 'DESC']],
        include: [
            {
                model: User,

                attributes: ['username']
            }
        ]
      })
      .then(dbPostData => res.json(dbPostData))
      .catch(err => {
          console.err(err);
          res.status(500).json(err);
      });
  
  });
router.get('/:id', (req,res) => {
    Post.findOne({
        where: {
            id: req.params.id
        },
        attributes: [
            'id',
            'post_text',
            'title',
            'created_at',
            
        ],
        include: [
            {
                model: User,
                attributes: ['username']
            }
        ]
    })
.then(dbPostData => {
    if (!dbPostData) {
        res.status(404).json({message: 'No post found with this id'});
        return;
    }
    res.json(dbPostData);
})
.catch(err => {
    console.log(err);
    res.status(500).json(err);
});
});


router.post('/', (req,res) => {
    console.log(req.body)
    Post.create(
        {
            title: req.body.title,
            post_text: req.body.post_text,
            user_id: req.session.user_id
        })
.then(dbPostData => res.json(dbPostData))
.catch(err => {
    console.log(err);
    res.status(500).json(err);
    });
});


router.put('/:id', (req, res) => {
    console.log(req.body)
    console.log(req.params)
    Post.update(
      {
        title: req.body.title,
        post_text: req.body.post_text
      },
      {
        where: {
          id: req.params.id
        }
      }
    )
      .then(updatedPostData => {
        if (!updatedPostData) {
          res.status(404).json({ message: 'No post found with this id' });
          return;
        }
        console.log(updatedPostData)
        res.json(updatedPostData);
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  });

  router.delete('/:id', (req,res) => {
    console.log(req.params)
    Comment.destroy({
        where:{
            post_id: req.params.id
        }
    }).then(() => {
        Post.destroy(
            {
                where: {
                    id: req.params.id,
                }
            })
            .then( dbPostData => {
                if (!dbPostData) {
                    res.status(404).json({message: 'No post found with this id'});
                    return;
                }
                res.json(dbPostData);
            })
            .catch(err => {
                console.log(err);
                res.status(500).json(err);
            });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
  });
  module.exports = router;

  