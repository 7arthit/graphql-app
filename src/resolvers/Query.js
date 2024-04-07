const Query = {
    name() {
        return 'Arthit';
    },
    age() {
        return 22;
    },
    isSingle() {
        return null;
    },
    numbers() {
        return [10,20,30,40,50]
    },
    location() {
        return {
            state: 'Bangkok',
            city: 'Phayathai'
        }
    },
    users(parent, args, ctx, info) {
        const { users } = ctx;
        return users
    }
}

module.exports = Query;
