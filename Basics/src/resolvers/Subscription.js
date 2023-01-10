const Subscription = {
    post: {
        subscribe(parent, args, {pubsub}, info) {
            
            return pubsub.asyncIterator('post')
        }
    },

    comment: {
        subscribe(parent, args, {pubsub}, info) {
            
            return pubsub.asyncIterator('comment')
        }
    }
}

export {Subscription as default}