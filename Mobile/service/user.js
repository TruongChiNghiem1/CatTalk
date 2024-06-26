import axios from 'axios';
import {url} from '../service/cattalk';
export const mailConfirm = async mail => {
  return await axios.post(`${url}/user/mail-confirm`, {email: mail});
};

export const signUp = async user => {
  return await axios.post(`${url}/user/signup`, user);
};

export const listenEvents = async () => {
  return await axios.get(`${url}/user/events`);
};

export const authEmail = async data => {
  return await axios.post(`${url}/user/auth-mail`, data);
};

export const logIn = async user => {
  return await axios.post(`${url}/user/login`, user);
};

export const editProfile = async (data, token) => {
  return await axios.post(`${url}/user/edit-profile`, data, {
    headers: {authorization: `Bearer ${token}`},
  });
};

export const uploadAvatarMobile = async (newAvatar, token) => {
  return await axios.post(`${url}/user/upload-avatar-mobile`, newAvatar, {
    headers: {authorization: `Bearer ${token}`},
  });
};

export const updateAboutUs = async (data, token) => {
  return await axios.post(`${url}/user/update-about-us`, data, {
    headers: {authorization: `Bearer ${token}`},
  });
};

export const getFriends = async (token, search) => {
  return await axios.get(`${url}/user/get-friends`, {
    headers: {authorization: `Bearer ${token}`},
    search: search,
  });
};

export const getUser = async (token, username) => {
  return await axios.get(`${url}/user/get-user?username=${username}`, {
    headers: {authorization: `Bearer ${token}`},
  });
};

export const searchUser = async (token, search) => {
  return await axios.get(`${url}/user/search?search=${search}`, {
    headers: {authorization: `Bearer ${token}`},
  });
};

export const addFriend = async (token, userNameAdd) => {
  return await axios.post(
    `${url}/user/add-friend`,
    {userNameAdd: userNameAdd},
    {
      headers: {authorization: `Bearer ${token}`},
    },
  );
};

export const getFriendAddGroup = async (token, search, chatId) => {
  return await axios.get(
    `${url}/user/get-friend-add-group?search=${search}&chatId=${chatId}`,
    {
      headers: {authorization: `Bearer ${token}`},
    },
  );
};

export const deleteFriend = async (token, userNameDelete) => {
  return await axios.post(
    `${url}/user/delete-friend`,
    {userNameDelete: userNameDelete},
    {
      headers: {authorization: `Bearer ${token}`},
    },
  );
};

export const getOneUser = async token => {
  return await axios.post(`${url}/user/user-find-one`, {
    headers: {authorization: `Bearer ${token}`},
  });
};

export const changeTheme = async (token, theme) => {
  return await axios.get(`${url}/user/change-theme?nightMode=${theme}`, {
    headers: {authorization: `Bearer ${token}`},
  });
};
