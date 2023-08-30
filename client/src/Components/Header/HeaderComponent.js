import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-scroll";
import { Link as RouterLink } from "react-router-dom";
import { Navbar, Nav, Button } from "react-bootstrap";
import { ContextValue } from "../../App";
import { BsSun, BsMoon } from "react-icons/bs";
import "./HeaderComponent.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";


import { useCookies } from "react-cookie";


const NavBar = () => {
  const { theme, changeTheme } = useContext(ContextValue);
  const [isAuth, setIsAuth] = useState(false);
  const [cookies] = useCookies(["token"]);
  const navigate = useNavigate();

  useEffect(() => {
    if (cookies.jwt) {
     setIsAuth(true);
    }
 }, [cookies.jwt]);


  const logoutHandler = async () => {
    try {
      await axios.post(
        'http://localhost:4000/api/user/logout',
        {
          method: 'POST',
          credentials: 'include'
        },
        {
          headers: {
            'Content-Type': 'application/json'
          },
          withCredentials: true
        }
      );
      navigate('/login');
    } catch (error) {
      console.log(error.message);
    }
  };
  
  

  return (
    <div className={theme === false ? "header-dark" : "header-light"}>
      <Navbar
        bg="transparent"
        variant={theme === false ? "dark" : "light"}
        expand="md"
        className="navbar-container"
      >
        <Navbar.Toggle aria-controls="navbar-nav" />
        <div className="switch-container">
          <button onClick={changeTheme} className="theme-toggle-button">
            {theme === false ? (
              <BsSun className="sun-icon" />
            ) : (
              <BsMoon className="moon-icon" />
            )}
          </button>
        </div>
        <Navbar.Collapse id="navbar-nav">
          <Nav className="ml-auto">
            <Nav.Link
              as={Link}
              to="home"
              smooth={true}
              duration={500}
              offset={-70}
              spy={true}
              activeClass="active"
            >
              Home
            </Nav.Link>
            <Nav.Link
              as={Link}
              to="skills"
              smooth={true}
              duration={500}
              offset={-70}
              spy={true}
              activeClass="active"
            >
              Skills
            </Nav.Link>
            <Nav.Link
              as={Link}
              to="projects"
              smooth={true}
              duration={500}
              offset={-70}
              spy={true}
              activeClass="active"
            >
              Projects
            </Nav.Link>
            <Nav.Link
              as={Link}
              to="contact"
              smooth={true}
              duration={500}
              offset={-70}
              spy={true}
              activeClass="active"
            >
              Contact
            </Nav.Link>

            {!isAuth ? (
              <Nav.Link
                as={RouterLink}
                to="/login"
                duration={500}
                offset={-70}
              ><Button variant="outline-primary">Sign in</Button>
                
              </Nav.Link>
            ) : <Nav.Link
            onClick={logoutHandler}
            duration={500}
            offset={-70}
          ><Button>
            Logout
          </Button>
            
          </Nav.Link>}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
};

export default NavBar;
