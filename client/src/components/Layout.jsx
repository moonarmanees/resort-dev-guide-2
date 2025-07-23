import React from "react";
import { Outlet, Link } from "react-router-dom";

import Header from "./Header";
import Button from "./Button";
import Footer from "./Footer";


export default function Layout() {
  // example click handler for demo
  const onDemoClick = () => alert("Button clicked!");

    // Skip link for keyboard users
  <a href="#main-content" className="visually-hidden-focusable">
    Skip to main content
    </a>

  return (
    <>
      <nav className="navbar …" role="navigation" aria-label="Main navigation">
        <div className="container">
          <Link className="navbar-brand" to="/">
            <Header title="My App" />
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#mainNavbar"
            aria-controls="mainNavbar"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="mainNavbar">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <Link className="nav-link" to="/">
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/about">
                  About
                </Link>
              </li>
            </ul>
            {/* Demo Button in navbar */}
            <Button label="Demo" variant="secondary" onClick={onDemoClick} />
          </div>
        </div>
      </nav>

     <main id="main-content" className="container" role="main">
        <Outlet />
      </main>

      {/* Props‑driven footer */}
      <Footer text="My Awesome App" />
    </>
  );
}
