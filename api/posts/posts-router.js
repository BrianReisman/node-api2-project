// implement your posts router here
const router = require("express").Router();
const Posts = require("./posts-model");

router.get("/", (req, res) => {
  Posts.find()
    .then((data) => {
      console.log(data);
      res.status(200).json(data);
    })
    .catch((err) => {
      res
        .status(500)
        .json({ message: "The posts information could not be retrieved" });
      console.log(err);
    });
});

router.post("/", (req, res) => {
  console.log(".post() within router");
});

router.get("/:id", async (req, res) => {
  try {
    const data = await Posts.findById(req.params.id);
    if (data) {
      res.status(200).send(data);
    } else {
      res
        .status(404)
        .json({ message: "The post with the specified ID does not exist" });
    }
  } catch (err) {
    res
      .status(500)
      .json({ message: "The post information could not be retrieved" });
  }
});

router.put("/:id", (req, res) => {
  console.log("time to [PUT]");
});

router.delete("/:id", async (req, res) => {
  try {
    const data = await Posts.remove(req.params.id);
    data
      ? res.status(200).json({
          message: "The post with the specified ID was successfully deleted",
        })
      : res
          .status(404)
          .json({ message: "The post with the specified ID does not exist" });
  } catch (err) {
    res.status(500).json({ message: "The post could not be removed" });
  }
});

router.get("/:id/comments", (req, res) => {
  Posts.findPostComments(req.params.id)
    .then((data) => {
      if (data) {
        res.status(200).json(data);
      } else {
        res
          .status(404)
          .json({ message: "The post with the specified ID does not exist" });
      }
    })
    .catch((err) => {
      console.log(err);
      res
        .status(500)
        .json({ message: "The comments information could not be retrieved" });
    });
});

module.exports = router;
