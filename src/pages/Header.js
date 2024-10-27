// src/pages/Header.js
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <>
      <div className="top">
        <div className="container">
          <div className="row d-flex align-items-center">
            <div className="col">
              <p className="social d-flex">
                <a href="#"><span className="icon-facebook"></span></a>
                <a href="#"><span className="icon-twitter"></span></a>
                <a href="#"><span className="icon-google"></span></a>
                <a href="#"><span className="icon-pinterest"></span></a>
              </p>
            </div>
            <div className="col d-flex justify-content-end">
              <p className="num"><span className="icon-phone"></span> + 1700 12345 6789</p>
            </div>
          </div>
        </div>
      </div>
      <nav className="navbar navbar-expand-lg navbar-dark ftco_navbar bg-dark ftco-navbar-light" id="ftco-navbar">
        <div className="container">
          <Link className="navbar-brand" to="/">Royal<span>estate</span></Link>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#ftco-nav" aria-controls="ftco-nav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="oi oi-menu"></span> Menu
          </button>

          <div className="collapse navbar-collapse" id="ftco-nav">
            <ul className="navbar-nav ml-auto">
              <li className={({ isActive }) => (isActive ? "nav-item active" : "nav-item")} ><Link to="/" className="nav-link">Home</Link></li>
              <li className={({ isActive }) => (isActive ? "nav-item active" : "nav-item")}><Link to="/property" className="nav-link">Property</Link></li>
              <li className={({ isActive }) => (isActive ? "nav-item active" : "nav-item")}><Link to="/about" className="nav-link">About</Link></li>
              <li className={({ isActive }) => (isActive ? "nav-item active" : "nav-item")}><Link to="/contact" className="nav-link">Contact</Link></li>
              <li className="nav-item cta"><Link to="/signin" className="nav-link ml-lg-2"><span className="icon-user"></span> Sign-In</Link></li>
              <li className="nav-item cta cta-colored"><Link to="/signup" className="nav-link"><span className="icon-pencil"></span> Sign-Up</Link></li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Header;
