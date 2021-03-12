// implement your posts router here
const router = require("express").Router();
const Posts = require("./posts-model");

router.get("/", (req, res) => {
  Posts.find()
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => {
      res
        .status(500)
        .json({ message: "The posts information could not be retrieved" });
      console.log(err);
    });
});

router.post("/", async (req, res) => {
  console.log(req.body);
  try {
    const data = await Posts.insert(req.body);
    data ? res.status(201).json(data) : res.status(400).json({});
  } catch (err) {
    console.log(err);
    res.status(500).json({});
  }
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
  if (req.body.title === undefined || req.body.contents === undefined) {
    res
      .status(400)
      .json({ message: "Please provide title and contents for the post" });
  }
  Posts.update(req.params.id, req.body)
    .then((data) => {
      if (data) {
        // console.log(data)
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
        .json({ message: "The post information could not be modified" });
    });
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
