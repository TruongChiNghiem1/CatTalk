let users = [];

exports.addUser = ({ id, chatIdJoin, userNameJoin }) => {
  if (!userNameJoin || !chatIdJoin) return { error: "Username and room are required." };
  const user = { id, userNameJoin, chatIdJoin };

  users.push(user);

  return { user };
};
exports.removeUser = (id) => {
  const index = users.findIndex((user) => user.id === id);
  return users[index];
};
