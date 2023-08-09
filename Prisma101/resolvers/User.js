const User = {
    comments (parent, args, {db}, info){
        return db.comments.filter((comment) => {
            return comment.author === parent.id
        })
    }
}

export {User as default}