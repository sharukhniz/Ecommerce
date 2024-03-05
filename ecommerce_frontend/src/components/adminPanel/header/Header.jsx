import React from "react";
import style from './Header.module.css'

const Header = () => {
  return (
    <div>
      <div className={style.headerContainer}>
        <div className={style.header}>
          <div className={style.navbar}>
            <div className={style.logo}>logo</div>
            <div className={style.menuBar}>
              <a href="/adminpanel ">Home</a>
              <a href="/category">Category</a>
              <a href="/products">Products</a>
              <a href="/">Orders</a>
            </div>
            <div className={style.logout}>
              <button type="submit" className="logoutButton">
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
