import React, { useState } from "react";
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

  const dispatch = useDispatch();

  const handleAddCategory = (userData) => {
    dispatch(addCategory(userData));
    dispatch(setShowAddModal(false));
  };

  const showModal = useSelector((state) => state.categorys.showAddModal);
  const handleClose = () => dispatch(setShowAddModal(false));

  const handleSubmit = async (e) => {
    e.preventDefault();
    await handleAddCategory({ categoryName });
    dispatch(getCategory());
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
                <label htmlFor="categoryImg">Upload files</label>

                <input
                  type="file"
                  id="categoryImg"
                  className={style.categoryImage}
                />
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
