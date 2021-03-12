// implement your posts router here
const router = require('express').Router()
const Posts = require('./posts-model');

router.get('/', (req,res)=>{
  Posts.find()
    .then(data =>{
      console.log(data)
      res.status(200).json(data)
    })
    .catch(err => {
      res.status(500).json({ message: "The posts information could not be retrieved" })
      console.log(err)
    })
})

router.post('/', (req, res)=>{
  console.log('.post() within router')
})

router.get('/:id', (req,res)=>{
  console.log('test test from get w/:id')
})

router.put('/:id', (req,res)=>{
  console.log('time to [PUT]')
})

router.delete('/:id', (req,res)=>{
  console.log('DELETE THEM!!!!!!!!!')
})

router.get('/:id/comments', (req,res)=>{
  console.log('id with comments, we\'re getting fancy here')
})

module.exports = router;