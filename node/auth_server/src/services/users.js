const fs = require("fs");
const usersListPath = `${__dirname}/../..${process.env.CONNECTION}/users.json`;

function getUsers() {
  return new Promise((res, rej) => {
    fs.readFile(usersListPath, (err, users) => {
      if (err) return rej(err);
      res(JSON.parse(users));
    });
  });
}

async function findOneUser(query) {
  const users = await getUsers();

  const user = users.find((item) => {
    for (const key in query) {
      if (String(item[key]) !== query[key]) return false;
    }
    return true;
  });

  if (!user) throw new Error("User not found");

  return user;
}

async function updateOneUser(query, update) {
  if (update.id) throw new Error("Can't update id");
  const user = await findOneUser(query);

  const users = await getUsers();

  const updateUsers = users.map((item) => (item.id !== user.id ? item : { ...item, ...update }));

  await fs.writeFile(usersListPath, JSON.stringify(updateUsers), (err) => {
    if (err) throw err;
  });

  return { ...user, ...update };
}

// async function update(query, values) {
//   const entry = find(query);
//   if (entry) {
//     Object.assign(entry, values);
//   }
// }

module.exports = {
  getUsers,
  findOneUser,
  updateOneUser,
};
