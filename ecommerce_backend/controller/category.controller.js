const categorySchema = require("../models/categorys.model");
const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "category");
  },
  filename: function (req, file, cb) {
    cb(
      null,
      `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
    );
  },
});

const upload = multer({ storage: storage }).single("categoryImg");

exports.postCategory = async (req, res) => {
  upload(req, {}, async (error) => {
    if (error instanceof multer.MulterError) {
      return res.status(400).json({ error: "image error" + error });
    } else if (error) {
      return res.status(500).json({ error: "server error" + error });
    }

    const requireFields = ["categoryName"];
    for (const field of requireFields) {
      if (!req.body[field]) {
        return res
          .status(400)
          .send({ message: `Error: Missing ${field} field` });
      }
    }
    const categoryImg = req.file.path;

    const category = new categorySchema({
      ...req.body,
      categoryImg: categoryImg,
    });

    category
      .save(category)
      .then((data) => {
        res.send(data);
      })
      .catch((err) => {
        res.status(500).send({
          message: err.message || "some error occured during creating category",
        });
      });
  });
};


exports.getCategory = async (req, res) => {
  categorySchema.find()
      .then(categories => {
          res.send(categories)
      })
      .catch(err => {
          res.status(500).send({
              message: err.message || "error occured while retriving data"
          });
      });
};
exports.editCategory = async (req, res) => {
  const id = req.params.id;
  let categoryImg; 

  upload(req, {}, async (error) => {
      if (error instanceof multer.MulterError) {
          return res.status(400).json({ error: "image error" + error });
      } else if (error) {
          return res.status(500).json({ error: "server error" + error })
      }

      try {
          if (req.file) {
              categoryImg = path.join('category', req.file.filename);
          }

          const category = await categorySchema.findById(id);
          console.log(category);
          if (!category) {
              return res.status(400).send({ message: `Error while updating category` });
          }

          const updatedData = {
              ...req.body,
              categoryImg: categoryImg,
          }

          const updated = await categorySchema.findByIdAndUpdate(id, updatedData, { new: true });
          res.status(200).json(updated);
      } catch (err) {
          console.error(err);
          res.status(500).json({ error: "Server error" });
      }
  });
}

exports.deleteCategory = async (req, res) => {
  const id = req.params.id;
  categorySchema.findByIdAndDelete(id)
      .then(data => {
          if (!data) {
              res.status(404).send({ message: `cannot delete category with id` + id })
          }
          else {
              res.send({
                  message: "category deleted successfully"
              })
          }
      }).catch(err => {
          res.status(500).send({
              message: "could not delete category item" + err
          });
      });
};