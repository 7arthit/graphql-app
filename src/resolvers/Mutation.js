const { v4: uuidv4 } = require('uuid');

const Mutation = {
    addUser(parent, args, ctx, info) {
        const { name, age } = args;
        const { users, pubsub } = ctx;

        const newUser = {
            id: uuidv4(),
            name,
            age,
        };
        users.push(newUser);
        return users;
    },
    deleteUser(parent, args, ctx, info) {
        const { users } = ctx;
        const { id } = args;
        const index = users.findIndex(user => user.id === id);
        if (index === -1) {
            throw new Error('User not found');
        }
        users.splice(index, 1);
        return users;
    },
    updateUser(parent, args, ctx, info) {
        const { id, name, age } = args;
        const { users, pubsub } = ctx;
        const index = users.findIndex(user => user.id === id);
        if (index === -1) {
            throw new Error('User not found');
        }
        if (name !== undefined) {
            users[index].name = name;
        }
        if (age !== undefined) {
            users[index].age = age;
        }

        pubsub.publish('update_user', {
            update: users
        })
        return users[index];
    }
}

module.exports = Mutation;
