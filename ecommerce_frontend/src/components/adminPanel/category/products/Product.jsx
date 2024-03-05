import React, { useEffect } from "react";
import style from "./Product.module.css";
import Header from "../../header/Header";
import { getProduct,setShowAddModal } from "../../../../redux/ProductSlice";
import { useDispatch, useSelector } from "react-redux";
import AddProduct from "./productModals/AddProduct";

const Product = () => {
  const products = useSelector((state) => state.products.products);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProduct());
  }, [dispatch]);

  const handleShowModal = () => {
    dispatch(setShowAddModal(true));
  };

  return (
    <div>
      <Header />
      <div className={style.productContainer}>
        <div className={style.addProduct}>
          <button onClick={handleShowModal}>Add Products</button>
        </div>
        <div className={style.productBody}>
          {products?.map((product, index) => (
            <div className={style.cardContainer}>
              <div className={style.cardImage}>
                <img
                  src="https://rukminim2.flixcart.com/image/850/1000/kxm5qq80/speaker/home-audio-speaker/4/u/b/best-buy-popularity-high-fidelity-transmission-powerful-sound-original-imagaf6efctwfbam.jpeg?q=90&crop=falseg"
                  alt="avatar"
                  style={{ width: "100%" }}
                />
              </div>
              <div className={style.cardDetails}>
                <h1>
                  <b>{product.productTitle}</b>
                </h1>
                <h2>{product.productName}</h2>
                <h6>Features: {product.productFeatures}</h6>
                <p>Description: {product.productDescription}</p>
                <h4>Price: <span>&#x20B9;</span>{product.productPrice}</h4>
              </div>
              <div className={style.cardButtons}>
                <button>Edit</button>
                <button>Delete</button>
              </div>
            </div>
          ))}
        </div>
      </div>
      <AddProduct />
    </div>
  );
};

export default Product;
