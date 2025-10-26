import React from "react";

export default function NotFound() {
  return (
    <div className="bg-dark bg-opacity-75 text-white min-vh-100 d-flex flex-column align-items-center justify-content-center">
      <section className="text-white d-flex flex-column align-items-center justify-content-center p-5">
        <div className="bg-light text-dark mt-4 p-4 rounded shadow-lg bg-opacity-75 w-100">
          <div className="d-flex flex-column align-items-center justify-content-center ">
            <h1 className="display-4 mb-4 text-danger">
              404 - Página Não Encontrada
            </h1>
            <p className="lead mb-4 text-danger">
              A página que você está procurando não existe.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
