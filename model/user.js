var mongoose = require("mongoose");
var bcrypt = require("bcryptjs");

var UserSchema = new mongoose.Schema({
   name: {
       type: String,
       required: true
   },
   email : {
       type: String,
       required: true,
       unique : true
   },
   password : {
       type: String,
       required: true
   },
   date: { 
       type: Date,
        default: Date.now
   } 
});
UserSchema.pre("save", function(next){
    if(this.password){
        this.password = bcrypt.hashSync(this.password,10);
    }
    next();
});

UserSchema.methods.verifyPassword = function(password){
    return bcrypt.compareSync(password,this.password);
}
var User = mongoose.model("User",UserSchema);

module.exports = User;