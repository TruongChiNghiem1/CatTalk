let users = [];

exports.addUser = ({ id, chatIdJoin, userNameJoin }) => {
  if (!userNameJoin || !chatIdJoin) return { error: "Username and room are required." };
  const user = { id, userNameJoin, chatIdJoin };

  const hashasUserInSameChatId = users.some(obj => obj.userNameJoin === userNameJoin && obj.chatIdJoin === chatIdJoin);
  
  let isAddUrs = false;
  if(!hashasUserInSameChatId){
    users.push(user);
    isAddUrs = true;
  }

  return { user,isAddUrs };
};
exports.removeUser = (id) => {
  const index = users.findIndex((user) => user.id === id);
  return users[index];
};
