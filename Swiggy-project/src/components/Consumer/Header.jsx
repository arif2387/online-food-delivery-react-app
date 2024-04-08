import React, { useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { styled as Styled, alpha } from "@mui/material/styles";
import { useUser } from "../../context/userContext";
import { useNavigate } from "react-router-dom";
import { Button, Avatar, InputBase, IconButton } from "@mui/material";
import Badge from "@mui/material/Badge";
import {
  Search as SearchIcon,
  ShoppingCart as ShoppingCartIcon,
} from "@mui/icons-material";
import { useSelector } from "react-redux";

const StyledNav = styled.nav`
  background-color: #fff;
  box-shadow: 0 0 10px 0 black;
`;

const StyledContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 5rem;
  padding: 0 5rem;
`;

const StyledUl = styled.ul`
  list-style: none;
  display: flex;
  gap: 1rem;
`;

const StyledLogo = styled.div`
  img {
    height: 3rem;
  }
`;

const StyledIconTextContainer = styled.div`
  display: flex;
  align-items: center;
`;

const StyledSpan = styled.span`
  margin-left: 8px;
  cursor: pointer;
`;
const Search = styled.div`
  margin-top: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const HeaderComponent = ({ prop }) => {
  const cart = useSelector((state) => state.cart);
  const StyledBadge = Styled(Badge)(({ theme }) => ({
    "& .MuiBadge-badge": {
      right: -3,
      top: 5,
      border: `2px solid ${theme.palette.background.paper}`,
      padding: "0 4px",
    },
  }));

  const { user, Login, Logout } = useUser();
  const navigate = useNavigate();

  function handleLogout() {
    Logout();
    navigate("/");
  }

  let totalCount = 0;
  if (cart != undefined)
    totalCount = cart.items.reduce((sum, item) => sum + item.count, 0);

  return (
    <StyledNav>
      <StyledContainer className="container">
        <StyledLogo className="logo">
          <Link to="/">
            {" "}
            <img
              src="https://cdn.worldvectorlogo.com/logos/swiggy-1.svg"
              alt="swiggy-logo"
            />{" "}
          </Link>
        </StyledLogo>

        <StyledUl>
          <li>
            <Link
              to="/search"
              style={{ color: "inherit", textDecoration: "none" }}
            >
              <Search style={{ color: prop }}>
                <SearchIcon style={{ marginRight: "4px" }} /> Search
              </Search>
            </Link>
          </li>
          <li>
            <Link to="/cart">
              <IconButton aria-label="cart">
                <StyledBadge badgeContent={totalCount} color="secondary">
                  <ShoppingCartIcon />
                </StyledBadge>
              </IconButton>
            </Link>
          </li>
          {user ?(
            <>
              <li>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <Avatar alt="Travis Howard" src={user.photoURL} />
                  <StyledSpan>{user.displayName}</StyledSpan>
                </div>
              </li>
              <li>
                <Button variant="outlined" onClick={handleLogout}>
                  Logout
                </Button>
              </li>
            </>)
            :(
              <Link to="/auth">
            <Button variant="outlined" onClick={handleLogout}>
            Log in
          </Button>
          </Link>
          )}
        </StyledUl>
      </StyledContainer>
    </StyledNav>
  );
};

export default HeaderComponent;
