import React from "react";
import { Container, Row, Col } from "react-bootstrap";

const Footer = () => {
  return (
    <footer>
      <Container>
        <Row>
          <Col className="text-center py-3">
            Made by M Soumya Prakash Sahoo with ReactJS and NodeJS !!
          </Col>
        </Row>
        <Row>
          <Col className="text-center py-3">
            <a href="https://github.com/gritty-git/E-Shop">
              Source Code (Check README for admin access!)
            </a>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
