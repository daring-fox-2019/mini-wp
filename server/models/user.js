const mongoose = require("mongoose");
const bcrypt = require("../helpers/bcryptjs-helper");
const { Schema } = mongoose;

const userSchema = new Schema({
  username: {
    type: String,
    required: [true, "Username is required"],

    validate: {
      validator: function(username) {
        return User.find({ _id: { $ne: this._id } })
          .then((members) => {
            const duplicate = members.filter(member => member.username.toLowerCase() === username.toLowerCase())[0];
            if (duplicate) return false;
          })
      },
      message: props => `Username ${props.value} has been taken already.`,
    }
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    minlength: [6, "Min length: 6"],
  },
  displayPicture: {
    type: String,
    default: "./src/img/default/default-user-picture.jpg",
  },
  fullName: {
    type: String,
    required: [true, "Full name is required"],
  }
});

userSchema.pre("save", function(next) {
  this.username = this.username.toLowerCase();
  this.password = bcrypt.hashSync(this.password);
  next();
});

const User = mongoose.model("User", userSchema);

module.exports = User;