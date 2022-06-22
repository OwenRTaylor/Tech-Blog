const router = require('express').Router();
const {Post,User,Comment,Vote} = require('../models/index')
router.get('/', (req,res) => {
    console.log('======================');
    Post.findAll({
        attributes: [
        'id',
        'post_url',
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
      .then(dbPostData => {
        if (!dbPostData) {
            res.status(404).json({ message: 'No post found with this id' });
            return;
          }
          const posts = dbPostData.map(post => post.get({ plain: true }));
          
        res.render('homepage', { 
            posts,
            loggedIn: req.session.loggedIn
 })
    })
      .catch(err => {
          console.err(err);
          res.status(500).json(err);
      });
    // res.render('homepage', {
    //     loggedIn: req.session.loggedIn
    // })
})
router.get('/login',(req,res) => {
    res.render('login')
})
router.get('/dashboard',(req,res) => {
        console.log('======================');
        Post.findAll({
            attributes: [
            'id',
            'post_url',
            'title',
            'created_at',
        ],
            order: [['created_at', 'DESC']],
            include: [
                {
                    model: User,
    
                    attributes: ['username']
                }
            ],
            where: {
                user_id: req.session.user_id
            }
          })
          .then(dbPostData => {
            if (!dbPostData) {
                res.status(404).json({ message: 'No post found with this id' });
                return;
              }
              const posts = dbPostData.map(post => post.get({ plain: true }));
              
            res.render('dashboard', { 
                posts,
                loggedIn: req.session.loggedIn
             })
        })
          .catch(err => {
              console.err(err);
              res.status(500).json(err);
          });
      
      
    
})

router.get('/single-post/:id',(req,res) => {
    console.log('======================');
    Post.findOne({
        attributes: [
        'id',
        'post_url',
        'title',
        'created_at',
    ],
        order: [['created_at', 'DESC']],
        include: [
            {
                model: User,

                attributes: ['username']
            }
        ],
        where: {
            id: req.params.id
        }
      })
      .then(dbPostData => {
        if (!dbPostData) {
            res.status(404).json({ message: 'No post found with this id' });
            return;
          }
          const post = dbPostData.get({plain: true})
        res.render('single-post', { 
            post,
            loggedIn: req.session.loggedIn
         })
    })
      .catch(err => {
          console.err(err);
          res.status(500).json(err);
      });
  
  

})
module.exports = router