import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { authActions } from './../store/auth';

function Header() {
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState("");
    function inputSubmit(e) {
        e.preventDefault();
        navigate(`/search/${searchTerm}`, { state: {} });
        setSearchTerm("");
    }
    const authenticated = useSelector(state => state.auth.authenticated);
    const dispatch = useDispatch();
    const logoutHandler = () => {
        dispatch(authActions.signOut());
        navigate(`/login`);
    }

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light" style={{ "margin": "0rem 1rem" }}>
            <NavLink className="navbar-brand" to="/">E - Shop</NavLink>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarSupportedContent" style={{ "justifyContent": "space-evenly" }}>
                <ul className="navbar-nav mr-auto" style={{ "justifyContent": "space-evenly" }}>
                    <li className="nav-item active">
                        <NavLink className="nav-link" to="/">Home</NavLink>
                    </li>
                    {authenticated ? <></> : <li className="nav-item">
                        <NavLink className="nav-link" to="/login/" > <i className='fas fa-user'></i> Login  </NavLink>
                    </li>
                    }
                    <li className="nav-item">
                        <NavLink className="nav-link" to="/cart"><i className='fas fa-shopping-cart'></i> Cart</NavLink>
                    </li>
                    {authenticated ?
                        <li className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                Profile
                            </a>
                            <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                                <NavLink className="dropdown-item" to="/profile">View Profile</NavLink>
                                <NavLink className="dropdown-item" to="/userlist">View All Users</NavLink>
                                <button type="button" className="btn btn-danger" style={{ "marginLeft": 12 }} onClick={logoutHandler}>Logout</button>

                            </div>
                        </li>
                        :
                        <></>}

                </ul>
                <div className="form-inline my-2 my-lg-0">
                    <form style={{ "float": "left", "margin": "0rem 0.4rem" }} onSubmit={inputSubmit} >
                        <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" onChange={(e) => setSearchTerm(e.target.value)} value={searchTerm} />
                    </form>
                    <div style={{ "float": "left", "margin": "0rem 0.4rem" }}>
                        <button className="btn btn-outline-success my-2 my-sm-0" type="button" onClick={inputSubmit}>Search</button>
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default Header;