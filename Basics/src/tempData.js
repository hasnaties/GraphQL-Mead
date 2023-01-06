const users = [
    {
        id: '1',
        name: 'Name#1',
        email: 'johndoe@gmail.com',
        age: 22
    },
    {
        id: '2',
        name: 'Name#2',
        email: 'johndoe2@gmail.com',
        age: 20
    },
    {
        id: '3',
        name: 'Name#3',
        email: 'johndoe3@gmail.com',
        age: 21
    }
]

const posts = [
    {
        id: '20011',
        title: 'My d',
        body: 'I donn wanna nobody',
        published: false
    },
    {
        id: '20012',
        title: 'My Blog',
        body: 'I donn wanna nobody',
        published: false
    },
    {
        id: '20013',
        title: 'My ',
        body: 'I donn wanna nobody',
        published: false
    }
]

const comments = [
    
    {
        id: '11',
        text: 'First Comment...',
        author: '1',
        post: '20013'
    },
    {
        id: '12',
        text: '2nd Comment...',
        author: '2',
        post: '20011'
    },
    {
        id: '13',
        text: '3rd Comment...',
        author: '3',
        post: '20013'
    },
    {
        id: '14',
        text: '4th Comment...',
        author: '1',
        post: '20012'
    }
]

export {users, posts, comments}