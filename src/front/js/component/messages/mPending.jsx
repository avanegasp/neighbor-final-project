import React from 'react';

function MPending() {
    return (
        <div
            className="d-flex justify-content-center align-items-center"
            style={{ minHeight: "50vh", marginTop: "50px", marginBottom: "50px" }}
        >
            <div className="container d-flex flex-column justify-content-center align-items-center bg-dark text-white p-3" style={{ minHeight: "55vh", maxWidth: "500px", textAlign: "center", borderRadius: "10px" }}>
                <h5 className="mb-3">Cuenta en verificación</h5>
                <p className="mb-3" style={{ fontSize: "14px" }}>Estamos revisando tu información. Pronto te notificaremos.</p>
                <div className="spinner-border text-primary" role="status">
                    <span className="sr-only">Cargando...</span>
                </div>
            </div>
        </div>
    );
}

export default MPending;
