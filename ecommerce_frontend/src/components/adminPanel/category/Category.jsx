import React, { useEffect, useState } from "react";
import Header from "../header/Header";
import style from "./Category.module.css";
import { useDispatch, useSelector } from "react-redux";
import {
  getCategory,
  deleteCategory,
  setShowAddModal,
  setSelectedCategoryId,
  updateCategory,
} from "../../../redux/CategorySlice";
import AddCategory from "./categoryModals/AddCategory";
import DeleteCategory from "./categoryModals/DeleteCategory";
import EditCategory from "./categoryModals/EditCategory";


const Category = () => {
  const dispatch = useDispatch();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

  const selectedCategoryId = useSelector(
    (state) => state.categorys.selectedCategoryId
  );

  const categorys = useSelector((state) => state.categorys.categorys);

  useEffect(() => {
    dispatch(getCategory());
  }, [dispatch]);

  const handleShowModal = () => {
    dispatch(setShowAddModal(true));
  };

  // DELETE
  const handleDelete = async (id) => {
    await dispatch(setSelectedCategoryId(id));
    setShowDeleteModal(true);
  };

  const handleConfirmDelete = async () => {
    await dispatch(deleteCategory({ id: selectedCategoryId }));

    dispatch(getCategory());
    setShowDeleteModal(false);
  };

  const handleCloseModal = () => {
    setShowDeleteModal(false);
    dispatch(setSelectedCategoryId(null));
  };

  // edit
  const handleUpdate = (id) => {
    dispatch(setSelectedCategoryId(id));
    setShowEditModal(true);
  };

  // const handleConfirmUpdate = (categoryName) => {
  //   try {
  //     dispatch(updateCategory( categoryName));
  //     dispatch(getCategory());
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };


  const handleConfirmUpdate = (categoryName) => {
    try {
      dispatch(updateCategory({ id: selectedCategoryId, categoryName }));
      dispatch(getCategory());
    } catch (err) {
      console.log(err);
    }
  };

  const handleEditCloseModal = () => {
    setShowEditModal(false);
    dispatch(setSelectedCategoryId(null));
  };

  return (
    <div>
      <Header />
      <div className={style.categoryContainer}>
        <div className={style.addCategory}>
          <button onClick={handleShowModal}>Add Category</button>
        </div>
        <div className={style.catBody}>
          {categorys?.map((category, index) => (
            <div className={style.cardContainer} key={index}>
              <div className={style.cardImage}>
                <img
                  src="https://rukminim2.flixcart.com/image/850/1000/kxm5qq80/speaker/home-audio-speaker/4/u/b/best-buy-popularity-high-fidelity-transmission-powerful-sound-original-imagaf6efctwfbam.jpeg?q=90&crop=falseg"
                  alt="avatar"
                  style={{ width: "100%" }}
                />
              </div>
              <div className={style.cardDetails}>
                <h4>
                  <b>{category.categoryName}</b>
                </h4>
              </div>
              <div className={style.cardButtons}>
                <button onClick={()=> handleUpdate(category._id)}>Edit</button>
                <button onClick={() => handleDelete(category._id)}>Delete</button>
              </div>
            </div>
          ))}
        </div>
      </div>
      <AddCategory />
      <EditCategory
        showUpdateModal={showEditModal}
        handleEditCloseModal={handleEditCloseModal}
        handleConfirmUpdate={handleConfirmUpdate}
        categoryId={selectedCategoryId}
      />
      <DeleteCategory
        showDeleteModal={showDeleteModal}
        handleCloseModal={handleCloseModal}
        handleConfirmDelete={handleConfirmDelete}
      />
    </div>
  );
};

export default Category;
