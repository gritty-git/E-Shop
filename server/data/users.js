const bcrypt = require('bcryptjs');

const users = [
    {
        name: 'M Soumya Prakash Sahoo',
        email: 'msoumya.iitbhu@gmail.com',
        password: bcrypt.hashSync('likuliku', 10),
        isAdmin: true,
    },
    {
        name: 'ASDFGHJKL',
        email: 'asdfghjkl@example.com',
        password: bcrypt.hashSync('123456', 10)
    },
    {
        name: 'QWERTYUIOP',
        email: 'qwertyuiop@example.com',
        password: bcrypt.hashSync('123456', 10)
    },
    {
        name: 'QWERTY',
        email: 'qwerty@example.com',
        password: bcrypt.hashSync('123456', 10)
    },
    {
        name: 'ASDFG',
        email: 'asdfg@example.com',
        password: bcrypt.hashSync('123456', 10)
    }
];

module.exports = users;