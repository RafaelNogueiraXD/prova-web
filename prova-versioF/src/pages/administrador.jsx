import React from "react";


export default function Administrador() {
    return (
        <div
            className="bg-dark text-white min-vh-100"
            style={{
                backgroundImage: 'url("/images/bg-admin.jpg")',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                backgroundAttachment: 'fixed'
            }}
        >
            <section className="text-white d-flex flex-column align-items-center justify-content-center p-5">
                <div className="bg-light text-dark mt-4 p-4 rounded shadow-lg bg-opacity-75 w-100" >
                    <div className="d-flex flex-column align-items-center justify-content-center ">
                        <h1 className="display-4 mb-4">Área do Administrador</h1>
                    </div>
                    <div className="bg-light text-dark p-4 rounded shadow-lg bg-opacity-50 mt-4 ">
                        <h2>Gerenciamento de Produtos</h2>
                        {/* Aqui você pode adicionar formulários ou tabelas para gerenciar produtos */}
                    </div>
                </div>
            </section>
        </div>
    );
}