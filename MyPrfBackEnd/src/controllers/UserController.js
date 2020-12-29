const express = require("express");

//puxar o model de user para fazer as ações de cadastro e login do usuário
const User = require("../models/User");

const parse = require("../utils/paserStringAsArray");
const hash = require("../utils/hashPassword");
const bcrypt = require("bcrypt");

module.exports = {
  //definir uma rota de cadastro
  async create(req, res) {
    const {
      name,
      email,
      password,
      bio,
      skills,
      contacts,
      twitter,
      facebook,
      instagram,
    } = req.body;

    const skillsArray = parse.StringAsArray(skills);
    const contactsArray = parse.StringAsArray(contacts);
    const hashedPass = await hash.hashPassword(password);

    try {
      const user = await User.create({
        name,
        email,
        password: hashedPass,
        bio,
        skills: skillsArray,
        contacts: contactsArray,
        socialMedia: {
          twitter,
          facebook,
          instagram,
        },
      });
      return res.send(user);
    } catch (err) {
      return res.status(400).send(err);
    }
  },

  async login(req, res) {
    const { email, password } = req.body;
    try {
      const user = await User.findOne({ email }).select("+password");
      if (!user) {
        return res.status(400).send({ error: "User not found" });
      }

      if (!(await bcrypt.compare(password, user.password))) {
        return res.status(400).send({ error: "Invalid password" });
      }

      user.password = "";
      return res.send(user);
    } catch (err) {
      return res.status(400).send({ error: "Alguma coisa deu errado" });
    }
  },

  async index(req, res) {
    try {
      const user = await User.find();

      return res.send(user);
    } catch (err) {
      return res.status(400).send({ error: "Registration failed" });
    }
  },

  async upload(req, res) {
    const { id } = req.params;
    const {
      email,
      password,
      bio,
      skills,
      contacts,
      twitter,
      facebook,
      instagram,
    } = req.body;

    const skillsArray = parse.StringAsArray(skills);
    const contactsArray = parse.StringAsArray(contacts);
    const hashedPass = await hash.hashPassword(password);

    let user;
    try {
      user = User.findById(id);

      if (!user) {
        return res.status(400).send({ error: "User not found" });
      }

      if (password !== "") {
        if (req.file) {
          const { filename } = req.file;
          user = await User.findByIdAndUpdate(
            id,
            {
              email,
              image: filename,
              password: hashedPass,
              bio,
              skills: skillsArray,
              contacts: contactsArray,
              twitter,
              facebook,
              instagram,
            },
            {
              new: true,
            }
          );

          return res.send(user);
        } else {
          user = await User.findByIdAndUpdate(
            id,
            {
              email,
              password: hashedPass,
              bio,
              skills: skillsArray,
              contacts: contactsArray,
              twitter,
              facebook,
              instagram,
            },
            {
              new: true,
            }
          );
          return res.send(user);
        }
      } else {
        if (req.file) {
          const { filename } = req.file;
          user = await User.findByIdAndUpdate(
            id,
            {
              email,
              image: filename,
              bio,
              skills: skillsArray,
              contacts: contactsArray,
              twitter,
              facebook,
              instagram,
            },
            {
              new: true,
            }
          );

          return res.send(user);
        } else {
          user = await User.findByIdAndUpdate(
            id,
            {
              email,
              bio,
              skills: skillsArray,
              contacts: contactsArray,
              twitter,
              facebook,
              instagram,
            },
            {
              new: true,
            }
          );
          return res.send(user);
        }
      }
    } catch (err) {
      return res.status(400).send(err);
    }
  },

  async list(req, res) {
    const { name } = req.params;
    let userNames;
    try {
      userNames = await User.find({ name: { $regex: name, $options: "i" } });

      return res.send(userNames);
    } catch (err) {
      return res.status(400).send(err);
    }
  },
};
