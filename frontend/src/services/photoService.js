import { api, requestConfig } from '../utils/config';

// Publish an user photo
const publishPhoto = async (data, token) => {
  const config = requestConfig('POST', data, token, true);

  try {
    const res = await fetch(api + '/photos', config)
      .then((res) => res.json())
      .catch((err) => err);

    return res;
  } catch (error) {
    console.log(error);
  }
};

// get photos
const getUserPhotos = async (id, token) => {
  const config = requestConfig('GET', null, token);
  try {
    const res = await fetch(`${api}/photos/user/${id}`, config)
      .then((res) => res.json())
      .catch((err) => err);

    return res;
  } catch (error) {
    console.log(error);
  }
};

// delete a photo
const deletePhotos = async (id, token) => {
  const config = requestConfig('DELETE', null, token);

  try {
    const res = await fetch(`${api}/photos/${id}`, config)
      .then((res) => res.json())
      .catch((err) => err);

    return res;
  } catch (error) {
    console.log(error);
  }
};

const updatePhoto = async (data, id, token) => {
  const config = requestConfig('PUT', data, token);

  try {
    const res = await fetch(`${api}/photos/${id}`, config)
      .then((res) => res.json())
      .catch((err) => err);

    return res;
  } catch (error) {
    console.log(error);
  }
};

const getPhotoById = async (id, token) => {
  const config = requestConfig('GET', null, token);

  try {
    const res = await fetch(`${api}/photos/${id}`, config)
      .then((res) => res.json())
      .catch((err) => err);

    return res;
  } catch (error) {
    console.log(error);
  }
};

const like = async (id, token) => {
  const config = requestConfig('PUT', null, token);

  try {
    const res = await fetch(`${api}/photos/likes/${id}`, config)
      .then((res) => res.json())
      .catch((err) => err);

    return res;
  } catch (error) {
    console.log(error);
  }
};

const comment = async (data, id, token) => {
  const config = requestConfig('PUT', data, token);

  try {
    const res = await fetch(`${api}/photos/comment/${id}`, config)
      .then((res) => res.json())
      .catch((err) => err);

    return res;
  } catch (error) {
    console.log(error);
  }
};

const photoService = {
  publishPhoto,
  getUserPhotos,
  deletePhotos,
  updatePhoto,
  getPhotoById,
  like,
  comment,
};

export default photoService;
