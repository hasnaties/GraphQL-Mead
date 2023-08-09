const Query = {
    users(parent, args, {db}, info) {
        if (!args.query) {
            return db.users;
        }

        return db.users.filter((user) => {
            return user.id.includes(args.query)
        });
    },
    posts(parent, args, {db}, info){

        if (!args.query) {
            return db.posts;
        }

        return db.posts.filter((post) => {
            return post.id.includes(args.query)
        });
    },
    comments(parent, args, {db}, info) {

        return db.comments;
    }
}

export {Query as default}