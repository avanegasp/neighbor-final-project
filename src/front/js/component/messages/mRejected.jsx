import React from 'react'

function MRejected() {
    return (
        <div className="container d-flex flex-column justify-content-center align-items-center bg-dark text-white p-3" style={{ maxWidth: "300px", textAlign: "center", borderRadius: "10px" }}>
            <h5 className="text-center mb-3">Lo sentimos, tu cuenta ha sido rechazada</h5>
            <p className="text-center mb-2" style={{ fontSize: "14px" }}>No hemos podido aprobar tu cuenta debido a que no cumple con nuestros requisitos de seguridad y verificación.</p>
            <p className="text-center mb-2" style={{ fontSize: "14px" }}>Por favor, revisa la información o contacta a un administrador.</p>
        </div>

    )
}

export default MRejected