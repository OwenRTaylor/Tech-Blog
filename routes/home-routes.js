const router = require('express').Router();
const {Post,User,Comment} = require('../models/index')
router.get('/', (req,res) => {
    console.log('======================');
    Post.findAll({
        attributes: [
        'id',
        'post_text',
        'title',
        'created_at',
        'updated_at'
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
          console.log(posts)
        res.render('homepage', { 
            posts,
            loggedIn: req.session.loggedIn
 })
    })
      .catch(err => {
          console.err(err);
          res.status(500).json(err);
      });
    
})
router.get('/login',(req,res) => {
    if(!req.session.loggedIn == true){
        res.render('login')
    }
    else{
        Post.findAll({
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
    }
})
router.get('/dashboard',(req,res) => {
        Post.findAll({
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
          .catch(() => {
            Post.findAll({
                attributes: [
                'id',
                'post_text',
                'title',
                'created_at',
                'updated_at'
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
                  console.log(posts)
                res.render('homepage', { 
                    posts,
                    loggedIn: req.session.loggedIn
         })
            })
              .catch(err => {
                  console.err(err);
                  res.status(500).json(err);
              });
          });
      
      
    
})

router.get('/single-post/:id',(req,res) => {
    console.log('======================');
    Post.findOne({
        attributes: [
        'id',
        'user_id',
        'title',
        'post_text',
        'created_at',
        'updated_at'
    ],
        order: [['created_at', 'DESC']],
        include: [
            {
                model: User,

                attributes: ['username']
            },
            {
                model: Comment,
                include: {
                    model: User,
                    attributes: ['username']
                  }
                // attributes: ['user_id','comment_text','post_id','created_at']
            }
        ],
        where: {
            id: req.params.id
        }
      })
      .then(dbPostData => {
        if (!dbPostData) {
            Post.findAll({
                attributes: [
                'id',
                'post_text',
                'title',
                'created_at',
                'updated_at'
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
                  console.log(posts)
                res.render('homepage', { 
                    posts,
                    loggedIn: req.session.loggedIn
         })
            })
              .catch(err => {
                  console.err(err);
                  res.status(500).json(err);
              });
          
            return;
          }
          req.session.post_id = dbPostData.id;
          const post = dbPostData.get({plain: true})
          const comments = dbPostData.comments.map(comments => comments.get({ plain: true }));
         
         
          let yourPost;
          
          if (post.user_id == req.session.user_id) {
            yourPost = true;
          } else {
            yourPost = false
          };

          for(let i = 0; i < comments.length; i++) {
            if(comments[i].user_id == req.session.user_id){
                comments[i].yourComment = true;
            }else{
                comments[i].yourComment = false;
            }
          }
          console.log(post)
        res.render('single-post', { 
            post,
            comments,
            loggedIn: req.session.loggedIn,
            yourPost
         })
    })
      .catch(err => {
          console.err(err);
          res.status(500).json(err);
      });
  
  

})
module.exports = router