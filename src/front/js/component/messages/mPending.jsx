import React from 'react'

function MPending() {
    return (
        <div className="container d-flex flex-column justify-content-center align-items-center bg-dark text-white p-3" style={{ maxWidth: "300px", height: "200px", textAlign: "center", borderRadius: "10px" }}>
            <h5 className="mb-3">Cuenta en verificación</h5>
            <p className="mb-3" style={{ fontSize: "14px" }}>Estamos revisando tu información. Pronto te notificaremos.</p>
            <div className="spinner-border text-primary" role="status">
                <span className="sr-only">Cargando...</span>
            </div>
        </div>

    )
}

export default MPending