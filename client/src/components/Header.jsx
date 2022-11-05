import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { authActions } from "./../store/auth";
import SearchBox from "./SearchBox";

function Header() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  function inputSubmit(e) {
    e.preventDefault();
    navigate(`/search/${searchTerm}`, { state: {} });
    setSearchTerm("");
  }
  const authenticated = useSelector((state) => state.auth.authenticated);
  const userInfo = useSelector((state) => state.auth.userInfo);
  const dispatch = useDispatch();
  const logoutHandler = () => {
    localStorage.removeItem("userInfo");
    dispatch(authActions.signOut());
    navigate(`/login`);
  };

  return (
    <nav
      className="navbar navbar-expand-lg navbar-light bg-light"
      style={{ margin: "0rem 1rem" }}
    >
      <NavLink className="navbar-brand" to="/">
        E - Shop
      </NavLink>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      <div
        className="collapse navbar-collapse"
        id="navbarSupportedContent"
        style={{ justifyContent: "space-evenly" }}
      >
        <ul
          className="navbar-nav mr-auto"
          style={{ justifyContent: "space-evenly" }}
        >
          <li className="nav-item active">
            <NavLink className="nav-link" to="/">
              Home
            </NavLink>
          </li>
          {authenticated ? (
            <></>
          ) : (
            <li className="nav-item">
              <NavLink className="nav-link" to="/login/">
                {" "}
                <i className="fas fa-user"></i> Login{" "}
              </NavLink>
            </li>
          )}
          <li className="nav-item">
            <NavLink className="nav-link" to="/cart/">
              <i className="fas fa-shopping-cart"></i> Cart
            </NavLink>
          </li>
          {authenticated ? (
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                href="#"
                id="navbarDropdown"
                role="button"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                {userInfo.name ? userInfo.name : ""}
              </a>
              <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                <NavLink className="dropdown-item" to="/profile">
                  View Profile
                </NavLink>
                {userInfo.isAdmin ? (
                  <>
                    <NavLink className="dropdown-item" to="/admin/userlist">
                      View All Users
                    </NavLink>
                    <NavLink className="dropdown-item" to="/admin/productlist">
                      All Products
                    </NavLink>
                    <NavLink className="dropdown-item" to="/admin/orderlist">
                      All Orders
                    </NavLink>
                  </>
                ) : (
                  <></>
                )}

                <button
                  type="button"
                  className="btn btn-danger"
                  style={{ marginLeft: 12, marginTop: 5 }}
                  onClick={logoutHandler}
                >
                  Logout
                </button>
              </div>
            </li>
          ) : (
            <></>
          )}
        </ul>

        <SearchBox />
      </div>
    </nav>
  );
}

export default Header;
