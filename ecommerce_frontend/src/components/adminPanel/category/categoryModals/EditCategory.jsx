import React, { useEffect, useRef, useState } from "react";
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
  const [categoryImg, setCategoryImg]=useState(null)
  const imageRef = useRef(null);


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
    handleConfirmUpdate(categoryName, categoryImg);
    handleEditCloseModal();
  };
  const handleFileChange = (e) => {
    setCategoryImg(e.target.files[0]);
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
      <Modal show={showUpdateModal} onHide={handleEditCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Add Category</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleUpdate}>
            <div className="form-group">
              <div className={style.imageContainer}>
                <label htmlFor="categoryImg" id="categoryLabel">Upload files</label>

                <input
                  type="file"
                  id="categoryImg"
                  ref={imageRef}
                  onChange={handleFileChange}
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
