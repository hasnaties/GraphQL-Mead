import { v4 as uuidV4 } from 'uuid';

const Mutation = {

    createPost(parent, { data }, {db, pubsub}, info){

        const newPost = {
            id: uuidV4(),
            ...data,
            comments: []
        }
        
        db.posts.push(newPost)

        if (newPost.published) {
            

            const result = pubsub.publish('post', {post: newPost})
            console.log(result);
        }

        return newPost;
    },

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

    createComment(parent, args, {db, pubsub}, info){

        const isPost = db.posts.find((post) => post.id === args.data.post)

        if (!isPost || !isPost.published) {
           
            throw new Error('Post does not exist or not published.')
        }

        const newComment = {
            id: uuidV4(),
            ...args.data
        }

        db.comments.push(newComment);
        
        pubsub.publish('comment', {
            comment: {
                mutation: "CREATED",
                data: newComment
            }
        })

        return newComment;
    },

    deleteComment(parent, args, {db, pubsub}, info){
        
        const commentIndex = db.comments.findIndex((comment) => comment.id === args.id);

        if (commentIndex === -1) {
            throw new Error ("comment doesn't exist.")
        }

        const [deletedComment] = db.comments.splice(commentIndex, 1);

        pubsub.publish('comment', {
            post: {
                mutation: "DELETED",
                data: deletedPost
            }
        })

        return deletedComment;
    },
    updateComment(parent, args, {db, pubsub}, info){

        const {id, data} = args
        const comment = db.comments.find((comment) => comment.id === id)

        if (!comment) {
            throw new Error("Comment doesn't exist.")
        }

        if (typeof data.text === "string") {
            comment.text = data.text
            
            pubsub.publish('comment', {
                post: {
                    mutation: "UPDATED",
                    data: deletedPost
                }
            })
        }

        return comment;

    }

}

export { Mutation as default }