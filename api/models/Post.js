const mongoose = require('mongoose')

const postSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    content: {
      type: String,
      trim: true,
    },
    body: {
      feelings: {
        type: String,
        trim: true,
      },
      at: {
        type: String,
        trim: true,
      },
      date: String,
    },
    image: String,
    isProfilePost: {
      type: Boolean,
      default: false,
    },
    profilePostData: {
      coverImage: String,
      profileImage: String,
    },
    privacy: {
      type: String,
      enum: ['Only me', 'Public'],
      default: 'Public',
    },
    likes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
    hearts: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
  },
  { timestamps: true }
)

module.exports = mongoose.model('Post', postSchema)
