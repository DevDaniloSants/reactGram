const Photo = require('../models/Photo');
const User = require('../models/User');

const insertPhoto = async (req, res) => {
  const { title } = req.body;
  const image = req.file.filename;

  const reqUser = req.user;
  const user = await User.findById(reqUser._id);

  // create a photo
  const newPhoto = await Photo.create({
    image,
    title,
    userId: user._id,
    username: user.name,
  });

  // if photo was created successfully, return data
  if (!newPhoto) {
    res
      .status(422)
      .json({ erros: ['Houve um problema, tente novamente mais tarde'] });
    return;
  }

  res.status(201).json(newPhoto);
};

module.exports = {
  insertPhoto,
};
