import React from 'react';
import styled from 'styled-components';

const StyledFooter = styled.div`
  display: flex;
  justify-content: space-around;
  background-color: #02060c;
  padding: 20px;
  height: 20rem;
  padding-top: 5rem;
`;

const StyledFooterSection = styled.div`
  text-align: left;

  h4 {
    color: #fff;
    font-size: 3rem;
    margin-bottom: 10px;
  }

  ul {
    list-style: none;
    padding: 0;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    width: 14rem;
  }

  li {
    color: #fff;
    margin-bottom: 5px;
    cursor: pointer;
    font-size: 1.5rem;

    &:hover {
      color: #e44d26;
    }
  }
`;

const Footer = () => {
  return (
    <StyledFooter className="swiggy-footer">
      <StyledFooterSection className="footer-section">
        <h4>Discover</h4>
        <ul>
          <li>About us</li>
          <li>Team</li>
          <li>Careers</li>
        </ul>
      </StyledFooterSection>

      <StyledFooterSection className="footer-section">
        <h4>Contact</h4>
        <ul>
          <li>Help & Support</li>
          <li>Partner with us</li>
        </ul>
      </StyledFooterSection>

      <StyledFooterSection className="footer-section">
        <h4>Legal</h4>
        <ul>
          <li>Terms & Conditions</li>
          <li>Privacy Policy</li>
        </ul>
      </StyledFooterSection>
    </StyledFooter>
  );
};

export default Footer;
