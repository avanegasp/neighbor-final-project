import React from 'react';


const Business = () => {


  return (
    <div className="container bg-white p-3">
      <div className="row my-3">

      </div>
      <div className="row my-3">
        <div className="col">
          <div className="container">
            <div className="card-header bg-white text-black text-center fs-2 ">Business</div>
            <div className="card-body">
              <div className="col">

                <div className="row">
                  <div className="card mb-3 m-2" style={{ maxWidth: "18rem", textAlign: "center" }}>
                    <img src={`https://fastly.picsum.photos/id/133/2742/1828.jpg?hmac=0X5o8bHUICkOIvZHtykCRL50Bjn1N8w1AvkenF7n93E`} className="card-img" alt="..." style={{ padding: "20px" }} />

                  </div>
                  <div className="card mb-3 m-2" style={{ maxWidth: "18rem", textAlign: "center" }}>
                    <img src={`https://fastly.picsum.photos/id/26/4209/2769.jpg?hmac=vcInmowFvPCyKGtV7Vfh7zWcA_Z0kStrPDW3ppP0iGI`} className="card-img" alt="..." style={{ padding: "10px" }} />

                  </div>
                  <div className="card mb-3 m-2" style={{ maxWidth: "18rem", textAlign: "center" }}>
                    <img src={`https://fastly.picsum.photos/id/133/2742/1828.jpg?hmac=0X5o8bHUICkOIvZHtykCRL50Bjn1N8w1AvkenF7n93E`} className="card-img" alt="..." style={{ padding: "20px" }} />

                  </div>
                  <div className="card mb-3 m-2" style={{ maxWidth: "18rem", textAlign: "center" }}>
                    <img src={`https://fastly.picsum.photos/id/26/4209/2769.jpg?hmac=vcInmowFvPCyKGtV7Vfh7zWcA_Z0kStrPDW3ppP0iGI`} className="card-img" alt="..." style={{ padding: "20px" }} />

                  </div>
                </div>
              </div>

            </div>
            <table class="table">
              <thead>
                <tr>
                  <th scope="col">Date</th>
                  <th scope="col">Amount</th>
                  <th scope="col">Product</th>
                  <th scope="col">Price</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                 
                  <td>Date</td>
                  <td>Amount</td>
                  <td>Product</td>
                  <td>Price</td>
                </tr>
                <tr>
                  
                  <td>Date</td>
                  <td>Amount</td>
                  <td>Product</td>
                  <td>Price</td>
                </tr>
                <tr>
                 
                  <td>Date</td>
                  <td>Amount</td>
                  <td>Product</td>
                  <td>Price</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="row my-2">
            <div className="col">
              <textarea className="form-control" rows={3} placeholder="Anonymous Review"></textarea>
            </div>
          </div>
          <div className="row">
            <div className="col">
              <button className="btn btn-primary">Edit info</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Business;
