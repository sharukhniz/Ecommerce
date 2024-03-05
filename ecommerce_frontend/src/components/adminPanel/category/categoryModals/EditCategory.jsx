import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import style from "./AddCategory.module.css";
import { Button, Modal } from "react-bootstrap";
import { getCategory } from "../../../../redux/CategorySlice";

const EditCategory = ({
  showUpdateModal,
  handleEditCloseModal,           
  handleConfirmUpdate,
  categoryId,
}) => {
  const dispatch = useDispatch();

  const categorys = useSelector((state) => state.categorys.categorys);

  const [categoryName, setCategoryName] = useState("");

  useEffect(() => {
    if (categoryId) {
      const category = categorys.find((c) => c._id === categoryId);
      if (category) {
        setCategoryName(category.categoryName);
      }
    }
  }, [categoryId, categorys]);

  const handleUpdate = (e) => {
    e.preventDefault();
    dispatch(getCategory());
    handleConfirmUpdate(categoryName);
    handleEditCloseModal();
  };

  return (
    <div>
      <Modal show={showUpdateModal} onHide={handleEditCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Add Category</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleUpdate}>
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
                value={categoryName}
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

export default EditCategory;
