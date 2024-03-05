import React, { useEffect, useState } from "react";
import { Modal, Button } from "react-bootstrap";
import {
  addProduct,
  getProduct,
  setShowAddModal,
} from "../../../../../redux/ProductSlice";

import { useSelector, useDispatch } from "react-redux";
import "bootstrap/dist/css/bootstrap.min.css";
import style from "./AddProduct.module.css";
import { getCategory } from "../../../../../redux/CategorySlice";

const AddProduct = () => {
  const [productTitle, setProductTitle] = useState("");
  const [productName, setProductName] = useState("");
  const [productFeatures, setProductFeatures] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productCategory, setProductCategory] = useState("");
  const [selectedOption, setSelectedOption] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCategory());
  }, [dispatch]);

  const options = useSelector((state) => state.categorys.categorys);

  const handleAddProduct = (userData) => {
    dispatch(addProduct(userData));
    dispatch(setShowAddModal(false));
  };

  const showModal = useSelector((state) => state.products.showAddModal);
  const handleClose = () => dispatch(setShowAddModal(false));

  const handleSubmit = async (e) => {
    e.preventDefault();
    await handleAddProduct({
      productTitle,
      productName,
      productFeatures,
      productDescription,
      productPrice,
      productCategory,
    });
    dispatch(getProduct());
  };
  const handleOptionChange = (event) => {
    const selectedCategoryId = event.target.value;
    setSelectedOption(selectedCategoryId);
  
    const selectedCategory = options.find(
      (option) => option._id === selectedCategoryId
    );
  
    console.log("Selected category:", selectedCategory); // Debugging statement
    setProductCategory(selectedCategory ? selectedCategory.categoryName : "");
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
              <div>
                <h6>Select Category:</h6>
                <select value={selectedOption} onChange={handleOptionChange}>
                  <option value="">Select</option>
                  {options.map((option) => (
                    <option key={option._id} value={option._id}>
                      {option.categoryName}
                    </option>
                  ))}
                </select>
                {productCategory && <p>You selected: {productCategory}</p>}
              </div>
              <label htmlFor="productTitle">Product Title</label>
              <input
                type="text"
                className="form-control"
                id="productTitle"
                placeholder="Product Title"
                onChange={(e) => setProductTitle(e.target.value)}
              />
              <label htmlFor="productName">Product Name</label>
              <input
                type="text"
                className="form-control"
                id="productName"
                placeholder="Product Name"
                onChange={(e) => setProductName(e.target.value)}
              />
              <label htmlFor="productFeatures">Features</label>
              <input
                type="text"
                className="form-control"
                id="productFeatures"
                placeholder="Features"
                onChange={(e) => setProductFeatures(e.target.value)}
              />
              <label htmlFor="productDescription">Description</label>
              <input
                type="text"
                className="form-control"
                id="productDescription"
                placeholder="Description"
                onChange={(e) => setProductDescription(e.target.value)}
              />
              <label htmlFor="productPrice">Price</label>
              <input
                type="number"
                className="form-control"
                id="productPrice"
                placeholder="Price"
                onChange={(e) => setProductPrice(e.target.value)}
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

export default AddProduct;
