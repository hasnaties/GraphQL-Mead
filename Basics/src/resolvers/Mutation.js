import { v4 as uuidV4 } from 'uuid';

const Mutation = {

    deletePost(parent, args, {db}, info){
        
        const postIndex = db.posts.findIndex((post) => post.id === args.id);

        if (postIndex === -1) {
            throw new Error ("Post doesn't exist.")
        }

        const deletedPost = db.posts.splice(postIndex, 1);

        db.comments = db.comments.filter((comment) => deletedPost[0].id !== comment.post )

        return deletedPost[0];
    },

    updatePost(parent, args, {db}, info){
        const {id, data} = args;

        const postToUpdate = db.posts.find((post) => post.id === id)

        if (!postToUpdate) {
            throw new Error ("Post doesn't exist.")
        }

        if (typeof data.title === "string") {
            postToUpdate.title = data.title
        }

        if (typeof data.body === "string") {
            postToUpdate.body = data.body
        }

        if (typeof data.published === "boolean") {
            postToUpdate.published = data.published
        }

        return postToUpdate;
    },

    createComment(parent, args, {db}, info){

        const isPost = db.posts.find((post) => post.id === args.data.post)

        if (!isPost || !isPost.published) {
           
            throw new Error('Post does not exist or not published.')
        }

        const newComment = {
            id: uuidV4(),
            ...args.data
        }

        comments.push(newComment);

        return newComment;
    },
    deleteComment(parent, args, {db}, info){
        
        const commentIndex = db.comments.findIndex((comment) => comment.id === args.id);

        if (commentIndex === -1) {
            throw new Error ("comment doesn't exist.")
        }

        const deletedComment = db.comments.splice(commentIndex, 1);

        return deletedComment[0];
    },
    updateComment(parent, args, {db}, info){

        const {id, data} = args
        const comment = db.comments.find((comment) => comment.id === id)

        if (!comment) {
            throw new Error("Comment doesn't exist.")
        }

        if (typeof data.text === "string") {
            comment.text = data.text
        }

        return comment;

    }

}

export { Mutation as default }