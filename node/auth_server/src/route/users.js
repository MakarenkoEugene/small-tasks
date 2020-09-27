const router = require("express").Router();
const { getUsers, findOneUser, updateOneUser } = require("../services/users");

router.get("/", async (req, res) => {
  try {
    const haveQuery = Object.keys(req.query).length;

    if (!haveQuery) return res.status(200).json(await getUsers());

    res.status(200).json(await findOneUser(req.query));
  } catch (e) {
    if ("User not found" === e.message) {
      res.status(404).send(e.message);
    } else {
      res.status(500).send(e.message);
    }
  }
});

router.post("/", async (req, res) => {
  try {
    const haveQuery = Object.keys(req.query).length;

    if (!haveQuery) throw new Error("Missing query for find user");

    res.status(200).json(await updateOneUser(req.query, req.body));
  } catch (e) {
    if ("Missing query for find user" === e.message || "Can't update id" === e.message) {
      res.status(400).send(e.message);
    } else if ("User not found" === e.message) {
      res.status(404).send(e.message);
    } else {
      res.status(500).send(e.message);
    }
  }
});

// router.get("/", async (req, res) => {
//   try {
//     console.log(req.query);
//     const users = await findOneUser();
//     res.status(200).send(users);
//   } catch (e) {
//     res.status(500).send(e);
//   }
// });

module.exports = router;
