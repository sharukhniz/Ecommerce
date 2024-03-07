import React, { useState, useRef } from "react";
import { Modal, Button } from "react-bootstrap";
import {
  addCategory,
  getCategory,
  setShowAddModal,
} from "../../../../redux/CategorySlice";
import { useSelector, useDispatch } from "react-redux";
import "bootstrap/dist/css/bootstrap.min.css";
import style from "./AddCategory.module.css";

const AddCategory = () => {
  const [categoryName, setCategoryName] = useState("");
  const imageRef = useRef(null);

  const dispatch = useDispatch();

  const handleAddCategory = (userData) => {
    dispatch(addCategory(userData));
    dispatch(setShowAddModal(false));
  };

  const showModal = useSelector((state) => state.categorys.showAddModal);
  const handleClose = () => dispatch(setShowAddModal(false));

  const handleSubmit = async (e) => {
    e.preventDefault();
    await handleAddCategory({
      categoryName,
      categoryImg: imageRef.current.files[0],
    });
    dispatch(getCategory());
  };

  const handleImageChange = () => {
    const chooseFile = document.getElementById("categoryImg");
    const imgPreview = document.getElementById("addImgPreview");
    const categoryLabel = document.getElementById("categoryLabel");
    const files = chooseFile.files[0];
    if (files) {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(files);
      fileReader.addEventListener("load", function () {
        imgPreview.innerHTML = '<img src="' + this.result + '" />';
        categoryLabel.style.display = "none";
      });
    }
  };

  return (
    <div>
      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Category</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <div className={style.imageContainer}>
                <label htmlFor="categoryImg" id="categoryLabel">
                  Upload files
                </label>

                <input
                  type="file"
                  id="categoryImg"
                  ref={imageRef}
                  onChange={handleImageChange}
                  className={style.categoryImage}
                />
                <div className={style.addImgPreview} id="addImgPreview"></div>
              </div>
              <label htmlFor="categoryName">Title</label>
              <input
                type="text"
                className="form-control"
                id="categoryName"
                placeholder="Title"
                onChange={(e) => setCategoryName(e.target.value)}
              />
            </div>
            <Button variant="primary" type="submit" className={style.addCatBtn}>
              Add Category
            </Button>
          </form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default AddCategory;
