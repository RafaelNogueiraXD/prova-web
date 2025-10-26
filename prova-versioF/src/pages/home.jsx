import React from "react";
import { FiShoppingCart } from "react-icons/fi";
import { FaShopify } from "react-icons/fa";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
function Home() {
  return (
    <div
      className="min-vh-100 d-flex align-items-center justify-content-center"
      style={{
        backgroundImage: 'url("./images/bg-home.jpg")',
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed",
      }}
    >
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-8 col-lg-6">
            <div className="card bg-dark bg-opacity-75 text-white border-0 shadow-lg">
              <div className="card-body text-center p-5">
                <h1 className="display-4 mb-4">Bem-vindo </h1>
                <p className="lead mb-4">A melhor loja de programação web!</p>
                <div className="d-flex justify-content-center gap-3">
                  <Link to="/carrinho">
                    <Button variant="outline-info" className="btn-lg">
                      <FiShoppingCart /> Carrinho
                    </Button>
                  </Link>
                  <Link to="/produtos">
                    <Button variant="info" className="btn-lg">
                      <FaShopify /> Ver Produtos
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
