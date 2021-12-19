export const initialPostState = {
  posts: [],
  postPagination: {
    currentPage: 0,
    totalPage: 0,
  },
  post: {
    comments: [],
    commentPagination: {
      currentPage: 0,
      totalPage: 0,
    },
  },
}

export const PostReducer = (state, action) => {
  switch (action.type) {
    case 'SET_POSTS':
      return {
        ...state,
        posts: action.payload,
      }

    case 'SET_CURRENT_POST':
      return {
        ...state,
        post: action.payload,
      }

    case 'REMOVE_CURRENT_POST':
      return {
        ...state,
        post: {
          comments: [],
          commentPagination: {
            currentPage: 0,
            totalPage: 0,
          },
        },
      }

    case 'ADD_POST':
      return {
        ...state,
        posts: [action.payload, ...state.posts],
      }

    case 'POST_PAGINATION':
      return {
        ...state,
        posts: [...state.posts, ...action.payload.posts],
        postPagination: {
          ...state.postPagination,
          currentPage: action.payload.currentPage,
          totalPage: action.payload.totalPage,
        },
      }

    case 'COMMENT_PAGINATION':
      return {
        ...state,
        post: {
          commentPagination: {
            ...state.post.commentPagination,
            currentPage: action.payload.currentPage,
            totalPage: action.payload.totalPage,
          },
          comments:
            state.post.comments && state.post.comments.length
              ? [...state.post.comments, ...action.payload.comments]
              : [...action.payload.comments],
        },
      }

    case 'LIKE_UNLIKE_POST':
      let postIndex = state.posts.findIndex(post => post.id === action.payload.id)
      state.posts[postIndex] = action.payload
      if (state.post.id === action.payload.id) {
        state.post = action.payload
      }
      return {
        ...state,
      }

    case 'SET_POST_COMMENTS':
      return {
        ...state,
        posts: {
          ...state.post,
          comments: action.payload,
        },
      }

    case 'ADD_POST_COMMENT':
      return {
        ...state,
        post: {
          ...state.post,
          comments: [action.payload, ...state.post.comments],
        },
      }

    case 'LIKE_UNLIKE_COMMENT':
      let index = state.post.comments.findIndex(comment => comment.id === action.payload.id)
      state.post.comments[index] = action.payload

      return {
        ...state,
      }

    default:
      throw new Error(`Action type ${action.type} is undefined`)
  }
}
