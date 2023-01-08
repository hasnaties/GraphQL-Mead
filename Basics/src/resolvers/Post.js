const Post = {
    comments (parent, args, {db}, info){
        return db.comments.filter((comment) => {
            return comment.post === parent.id
        })
    }
}

export {Post as default}