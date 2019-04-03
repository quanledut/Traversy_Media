const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = mongoose.model('User');

module.exports = {
    authentication: (username, password) => {
        return new Promise(async (resolve, reject) =>{
            try{
                let user = await User.findOne({username});
                bcrypt.compare(password, user.password, (err, isMatch) =>{
                    if(!isMatch){
                        reject('Authentication Failed');
                    }
                    else resolve(user);

                })
            }
            catch(error){
                reject('Authentication Failed');
            }
        })
    }
}