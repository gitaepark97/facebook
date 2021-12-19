const Post = require('../../models/Post')
const FilterPostData = require('../../utils/FilterPostData')
const sendDataToFriends = require('../../utils/socket/SendDataToFriend')

exports.createPost = async (req, res) => {
  let { content, privacy, image, body } = req.body
  if (!content && content.trim().length === 0 && !image) {
    return res.status(422).json({
      error: 'Post image or write some content to post. Can`t upload empty post',
    })
  }
  try {
    const createPost = new Post({
      image,
      privacy,
      content,
      user: req.userId,
      isProfilePost: false,
    })
    const savePost = await createPost.save()
    if (Object.keys(body).length) {
      savePost.body = {
        feelings: body.feelings,
        at: body.at,
        date: body.date,
      }
      await savePost.save()
    }
    const post = await Post.findById(savePost.id).populate('user')
    const postData = FilterPostData(post)
    res.status(201).json({ message: 'Post created successfully', post: postData })
    let dataToSend = {
      req,
      key: 'new-post',
      data: postData,
      notifi_body: `${post.user.name} has created new post`,
    }
    await sendDataToFriends(dataToSend)
  } catch (err) {
    return res.status(500).json({ error: 'Something was wrong' })
  }
}

exports.likeDislikePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.postId).populate('user')
    if (!post) {
      return res.status(404).json({ error: 'Post not found' })
    }
    let postData
    const index = post.likes.indexOf(req.userId)
    if (index !== -1) {
      post.likes.splice(index, 1)
      await post.save()
      postData = FilterPostData(post)
      res.status(200).json({ message: 'Removed likes', post: postData })
      await sendDataToFriends({ req, key: 'post-like-change', data: postData })
      return
    }
    post.likes.push(req.userId)
    await post.save()
    postData = FilterPostData(post)
    res.status(200).json({ message: 'Add like', post: postData })
    await sendDataToFriends({ req, key: 'post-like-change', data: postData })
  } catch (err) {
    return res.status(500).json({ error: 'Something was wrong' })
  }
}
