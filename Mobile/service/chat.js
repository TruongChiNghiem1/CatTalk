import axios from 'axios';
import {url} from './cattalk';

export const getAllChat = async token => {
  return await axios.get(`${url}/chat/all-chat`, {
    headers: {authorization: `Bearer ${token}`},
  });
};

export const getOneChat = async (token, userChat) => {
  return await axios.get(`${url}/chat/one-chat?userChat=${userChat}`, {
    headers: {authorization: `Bearer ${token}`},
  });
};

export const getMessage = async (token, objectChat) => {
  return await axios.get(`${url}/chat/get-message?objectChat=${objectChat}`, {
    headers: {authorization: `Bearer ${token}`},
  });
};

export const getMemberInGroup = async (token, chatId) => {
  return await axios.get(`${url}/chat/get-member-in-group?chatId=${chatId}`, {
    headers: {authorization: `Bearer ${token}`},
  });
};

export const createThisGroup = async (token, dataAddGroup) => {
  return await axios.post(`${url}/chat/create-this-group`, dataAddGroup, {
    headers: {authorization: `Bearer ${token}`},
  });
};

export const createNewMemberGroup = async (token, dataAddGroup) => {
  return await axios.post(`${url}/chat/create-new-member-group`, dataAddGroup, {
    headers: {authorization: `Bearer ${token}`},
  });
};

export const deleteMember = async (token, chatId, userNameDelete) => {
  return await axios.post(
    `${url}/chat/delete-member`,
    {chatId, userNameDelete},
    {
      headers: {authorization: `Bearer ${token}`},
    },
  );
};

export const deleteMessage = async (myUserName, data,chatId) => {
    return await axios.post(
    `${url}/chat/delete-message`,
    {data,chatId,myUserName},
  );
};
