const Model = require('./model');

const addUser = async (user) => {
    const verifyUser = await Model.findOne({ user_name: user.user_name });
    
    if(verifyUser) {
        throw new Error('The user name is already taken, pick another one');
    } else {
        const newUser = new Model(user);
        await newUser.save();
    }
}

const logInUser = async (user) => {
    const verifyUser = await Model.findOne({ user_name: user.user_name });

    if(verifyUser) {
        return verifyUser;
    } else {
        throw new Error('The user name doesnt exist');
    }
}

module.exports = {
    add: addUser,
    logIn: logInUser,
}