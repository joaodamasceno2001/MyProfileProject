const mongoose = require("mongoose");

//campos dos banco de dados
const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      require: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
      lowecase: true,
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
    bio: {
      type: String,
    },
    skills: [
      {
        type: String,
      },
    ],
    contacts: [
      {
        type: String,
      },
    ],
    socialMedia: {
      twitter: { type: String },
      facebook: { type: String },
      instagram: { type: String },
    },

    image: {
      type: String,
    },

    creatAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    toJSON: {
      virtuals: true,
    },
  }
);

UserSchema.virtual("image_url").get(function () {
  return `http://localhost:3333/uploads/${this.image}`;
});

//difinir user/model
const User = mongoose.model("User", UserSchema);

//exportar o usuário
module.exports = User;
