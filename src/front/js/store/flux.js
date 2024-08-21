const getState = ({ getStore, getActions, setStore }) => {
  return {
    store: {
      // message: null,
      neighbor: {},
      seller: {},
      admin: {},
      users: null,
      favorites: [],
      people: {
        neighbor: [],
        seller: [],
      },
      business: [],
      shop: {},
      currentUser: {},
      recommendations: []

    },
    actions: {
      addToFavorite: (id, name, role) => {
        const store = getStore();
        const isFavoriteExist = store.favorites.some(
          (favorite) => favorite.id === id && favorite.role === role
        );
        if (!isFavoriteExist) {
          setStore({
            favorites: [...store.favorites, { id, name, role }],
          });
        }
      },

      removeToFavorite: (id) => {
        const store = getStore();
        const filteredFavorite = store.favorites.filter(
          (favorite) => favorite.name !== id
        );
        setStore({ favorites: filteredFavorite });
      },

      // Use getActions to call a function within a fuction
      exampleFunction: () => {
        getActions().changeColor(0, "green");
      },

      login: async (email, password, userType) => {
        try {
          const response = await fetch(process.env.BACKEND_URL + "/api/login", {
            method: "POST",
            headers: { "Content-type": "application/json" },

            body: JSON.stringify({ email, password, userType }),
          });
          // console.log("responseloginflux", response)
          // if (!response.ok) {
          //   return false;
          // }
          const data = await response.json();
          console.log("data completa del login", data);

          if (data.user) {
            setStore({ currentUser: data.user });
            localStorage.setItem('token', data.token);
            localStorage.setItem('role', data.user.role)
            localStorage.setItem('name', data.user.name)
            localStorage.setItem('id', data.user.id)

            return data;
          } else {
            console.log("El objeto 'user' no está presente en la respuesta")
            return false
          }
        } catch (error) {
          console.log(error)
          return false
        }
      },

      getProfileNeighbor: async (id) => {
        // console.log("HEREEEE PROFILE", id);
        // if (!id) return;

        try {
          const token = localStorage.getItem("token")
          // console.log("TOKEN NEIGHBOR", token)
          const response = await fetch(
            `${process.env.BACKEND_URL}/api/neighbor/${id}`,
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
              },
            }
          );

          // console.log("response", response)
          if (response.ok) {
            const data = await response.json();
            // console.log("data neighbor", data)
            setStore({ neighbor: data });
            return data;
          } else {
            const errorData = await response.json()
            console.error("Authorization error:", errorData.error || "Unknown error");
            return { error: errorData.error || "Authorization error" };
          }
        } catch (error) {
          console.error("Error fetching neighbor:", error.message);
          return { error: "An error occurred" };
        }
      },


      getProfileSeller: async (id) => {
        // console.log("HEREEEE PROFILE", id);
        if (!id) return;

        const token = localStorage.getItem("token")
        if (!token) {
          console.error("No token found")
          return { error: "No token found" }
        }

        try {
          const response = await fetch(
            `${process.env.BACKEND_URL}/api/seller/${id}`,
            {
              method: "GET",
              headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
              },
            }
          );

          if (response.ok) {
            const data = await response.json();
            setStore({ seller: data });
            console.log(data);
            console.log(token);
            return data;
          } else {
            const errorData = await response.json()
            console.error("Authorization error:", errorData.error || "Unknown error")
            return { error: errorData.error || "Authorization error" };
          }
        } catch (error) {
          console.error("Error fetching seller:", error.message)
          return { error: "An error occurred" };
        }
      },

      getProfileAdmin: async (id) => {
        if (!id) {
          console.error("No ID provided");
          return { error: "No ID provided" };
        }

        const token = localStorage.getItem("token");
        if (!token) {
          console.error("No token found");
          return { error: "No token found" };
        }

        try {
          const response = await fetch(
            `${process.env.BACKEND_URL}/api/administrator/${id}`,
            {
              method: "GET",
              headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
              },
            }
          );

          if (response.ok) {
            const data = await response.json();
            setStore({ admin: data });
            return data;
          } else {
            const errorData = await response.json();
            console.error("Authorization error:", errorData.error || "Unknown error");
            return { error: errorData.error || "Authorization error" };
          }
        } catch (error) {
          console.error("Error fetching admin:", error.message);
          return { error: "An error occurred" };
        }
      },


      getAllDirectory: async () => {
        const token = localStorage.getItem("token");
        if (!token) {
          console.error("No token found");
          return { error: "No token found" };
        }

        try {
          const response = await fetch(
            `${process.env.BACKEND_URL}/api/directory`,
            {
              method: "GET",
              headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
              },
            }
          );

          if (response.ok) {
            const data = await response.json();
            setStore({ users: data });
            return data;
          } else {
            const errorData = await response.json()
            console.error("Authorization error:", errorData.error || "Unknown error");
            return { error: errorData.error || "Authorization error" };
          }
        } catch (error) {
          console.error("Error fetching directory:", error.message);
        }
      },
      editNeighbor: async (id, fields) => {
        const actions = getActions();
        try {
          const response = await fetch(
            `${process.env.BACKEND_URL}/api/editNeighbor/${id}`,
            {
              method: "PUT",
              body: JSON.stringify({
                name: fields.name,
                lastname: fields.lastname,
                floor: fields.floor,
                email: fields.email,
              }),
              headers: {
                "Content-type": "application/json",
              },
            }
          );
          if (!response.ok) {
            console.error(`Error: ${response.status} ${response.statusText}`);
            return false;
          }
          const data = await response.json();
          // console.log("DATAAAA", data);
          actions.getProfileNeighbor(id);
        } catch (error) {
          console.error("Error editing neighbor:", error.message);
        }
      },
      editSeller: async (id, fields) => {
        const actions = getActions();
        try {
          const response = await fetch(
            `${process.env.BACKEND_URL}/api/editSeller/${id}`,
            {
              method: "PUT",
              body: JSON.stringify({
                name: fields.name,
                lastname: fields.lastname,
                floor: fields.floor,
                email: fields.email,
                phone: fields.phone,
                shopName: fields.shopName,
              }),
              headers: {
                "Content-type": "application/json",
              },
            }
          );
          if (!response.ok) {
            console.error(`Error: ${response.status} ${response.statusText}`);
            return false;
          }
          const data = await response.json();
          actions.getProfileSeller(id);
        } catch (error) {
          console.error("Error editing seller:", error.message);
        }
      },
      editAdmin: async (id, fields) => {
        const actions = getActions();
        try {
          const response = await fetch(
            `${process.env.BACKEND_URL}/api/editAdministrator/${id}`,
            {
              method: "PUT",
              body: JSON.stringify({
                name: fields.name,
                lastname: fields.lastname,
                floor: fields.floor,
                email: fields.email,
                buildingName: fields.buildingName,
              }),
              headers: {
                "Content-type": "application/json",
              },
            }
          );
          if (!response.ok) {
            console.error(`Error: ${response.status} ${response.statusText}`);
            return false;
          }
          const data = await response.json();
          actions.getProfileSeller(id);
        } catch (error) {
          console.error("Error editing seller:", error.message);
        }
      },
      registerNeighbor: async (email, password, name, lastname, floor) => {
        try {
          const response = await fetch(
            process.env.BACKEND_URL + `/api/neighbor/registers`,
            {
              method: "POST",
              headers: { "Content-type": "application/json" },

              body: JSON.stringify({ email, password, name, lastname, floor }),
            }
          );
          if (!response.ok) {
            return false;
          }
          const data = await response.json();
          // console.log("data completa del registerNeighbor", data);

          if (data.user) {
            setStore({ currentUser: data.user });
          } else {
            console.log("El objeto 'user' no está presente en la respuesta");
          }
          localStorage.setItem('token', data.token);
          return data;
        } catch (error) {
          console.log(error);
        }
      },
      registerSeller: async (
        email,
        password,
        name,
        lastname,
        floor,
        phone,
        shopName
      ) => {
        try {
          // console.log("seller flux Fab", phone)
          const response = await fetch(
            process.env.BACKEND_URL + `/api/seller/registers`,
            {
              method: "POST",
              headers: { "Content-type": "application/json" },
              body: JSON.stringify({
                email,
                password,
                name,
                lastname,
                floor,
                phone,
                shopName,
              }),
            }
          );

          if (!response.ok) {
            return false;
          }
          const data = await response.json();
          console.log("data completa del login", data);

          if (data.user) {
            setStore({ currentUser: data.user });
          } else {
            console.log("El objeto 'user' no está presente en la respuesta");
          }
          localStorage.setItem('token', data.token);
          return data;
        } catch (error) {
          console.log(error);
        }
      },



      registerAdmin: async (
        email,
        password,
        name,
        lastname,
        floor,
        buildingName
      ) => {
        try {
          const response = await fetch(
            process.env.BACKEND_URL + `/api/administrator/registers`,
            {
              method: "POST",
              headers: { "Content-type": "application/json" },

              body: JSON.stringify({
                email,
                password,
                name,
                lastname,
                floor,
                buildingName,
              }),
            }
          );
          if (!response.ok) {
            return false;
          }
          const data = await response.json();
          console.log("data completa del login", data);

          if (data.user) {
            setStore({ currentUser: data.user });
          } else {
            console.log("El objeto 'user' no está presente en la respuesta");
          }
          localStorage.setItem('token', data.token);
          return data;
        } catch (error) {
          console.log(error);
        }
      },



      getAllUser: async () => {
        try {
          console.log("hola")
            const response = await fetch(process.env.BACKEND_URL+ `/api/neighbors/sellers`,
              {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });
    
            if (response.ok) {
                const data = await response.json();
                setStore({ people:{
                  neighbor:data.neighbor,
                  seller:data.seller
                }});
            } else {
                console.error("Error encontrando los neighbors:", response.statusText);
            }
        } catch (error) {
            console.error("Error encontrando los seller:", error.message);
        }
    },

    deleteUser: async (id,userType) => {
      let actions = getActions();
      const role = userType.toLowerCase()
      const response = await fetch(process.env.BACKEND_URL+`/api/administrator/${role}/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          'Access-Control-Allow-Origin': '*',
      },
      })  
      if (!response.ok) {
        alert("No se puede eliminar neighbor");
      }else {
        actions.getAllUser();
}},

      getSingleBusiness: async (seller_id, product_name) => {
        if (!seller_id || !product_name) return;
        //const jwt = localStorage.getItem("token");
        try {
          const response = await fetch(
            `${process.env.BACKEND_URL}/api/seller/${seller_id}/business/${product_name}`,
            {
              method: "GET",
              headers: {
                //authorization: `Bearer ${jwt}`
              },
            }
          );
          if (!response.ok) {
            console.error(`Error: ${response.status} ${response.statusText}`);
            return false;
          }
          const data = await response.json();
          setStore({ shop: data.Business });
          return true;
        } catch (error) {
          console.log(error);
        }
      },

      createReview: async (business_id) => {
        if (!business_id) return;
        const token = localStorage.getItem("token");
        try {
          const response = await fetch(
            `${process.env.BACKEND_URL}/api/neighbor/${neighbor_id}/business/${business_id}`,
            {
              methods: "POST",
              headers: {
                "Content-type": "appliaction/json",
                authorization: `Bearer ${token}`
              },
            }
          );
          if (!response.ok) {
            return false;
          }
          const data = response.json();
          return data;
        } catch (error) {
          return (error);
        }
      },

        getCurrentUser: async () => {
          const token = localStorage("token");
          try {
            const response = await fetch(`${process.env.BACKEND_URL} + /me`, {
              headers: {
                authorization: `Bearer ${token}`,
              },
            });
            const data = await response.json();
            setStore({ currentUser: data });
          } catch (error) {
            console.log(error);
          }
        },

      getAllRecommendations: async () => {
        const token = localStorage.getItem("token")
        if (!token) {
          console.error("No token found")
          return { error: "No token found" }
        }
        try {
          const response = await fetch(
            `${process.env.BACKEND_URL}/api/recommendations`,
            {
              method: "GET",
              headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
              },
            }
          );

          if (response.ok) {
            const data = await response.json();
            setStore({ recommendations: data.recommendations });
            return data;
          } else {
            const errorData = await response.json()
            console.error("Authorization error:", errorData.error || "Unknown error");
            return { error: errorData.error || "Authorization error" };
          }
        } catch (error) {
          console.error("Error fetching recommendations:", error.message);
        }
      },

        createBusiness: async(id, shopName, price, schedule) =>{
        const token = localStorage.getItem("token")
        if (!token) {
          console.error("No token found")
          return { error: "No token found" }
        }
        try {
          const response = await fetch(
            `${process.env.BACKEND_URL}/api/seller/${id}/create-business`,
            {
              method: "POST",
              headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
              },
              body: JSON.stringify({shopName, price, schedule}),
            }
          );
          if (!response.ok) {
            console.log(response);
          } else {
            const data = await response.json();
            return data;
          }
        } catch (error) {
          console.log(error);
        }

      },

      createAdminRecommendation: async (id, { name, shopName, lastname, phone }) => {
        if (!id) return;
        // const token = localStorage.getItem("token");
        try {
          const response = await
            fetch(
              `${process.env.BACKEND_URL}/api/administrator/${id}/createReco`, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                // Authorization:`Bearer ${localStorage.getItem("token")}`
              },
              body: JSON.stringify({
                name,
                lastname,
                shopName,
                phone
              })
            })
          if (response.ok) {
            alert("Recommendation created successfully!");
          } else {
            alert(response.error || "Failed to create recommendation");
          }
          return
        } catch (error) {
          console.error("Error:", error)
        }
      },

      createNeighborRecommendation: async (id, { name, shopName, lastname, phone }) => {
        if (!id) return;
        // const token = localStorage.getItem("token");
        try {
          const response = await
            fetch(
              `${process.env.BACKEND_URL}/api/neighbor/${id}/createReco`, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                // Authorization:`Bearer ${localStorage.getItem("token")}`
              },
              body: JSON.stringify({
                name,
                lastname,
                shopName,
                phone
              })
            })
          if (response.ok) {
            alert("Recommendation created successfully!");
          } else {
            alert(response.error || "Failed to create recommendation");
          }
          return
        } catch (error) {
          console.error("Error:", error)
        }
      },

      createSellerRecommendation: async (id, { name, shopName, lastname, phone }) => {
        if (!id) return;
        // const token = localStorage.getItem("token");
        try {
          const response = await
            fetch(
              `${process.env.BACKEND_URL}/api/seller/${id}/createReco`, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                // Authorization:`Bearer ${localStorage.getItem("token")}`
              },
              body: JSON.stringify({
                name,
                lastname,
                shopName,
                phone
              })
            })
          if (response.ok) {
            alert("Recommendation created successfully!");
          } else {
            alert(response.error || "Failed to create recommendation");
          }
          return
        } catch (error) {
          console.error("Error:", error)
        }
      },
      chekingStatus: async () => {
        const token = localStorage.getItem("token")
        try {
          const response = await fetch(
            process.env.BACKEND_URL + "/api/checking",
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
              },
            }
          )
          if (!response.ok) {
            return false;
          }
          const data = await response.json();
          return data
        } catch (error) {
          console.log(error)
        }
      },

      changeStatus: async (id, role, status) => {
        const token = localStorage.getItem("token")
        try {
          const response = await fetch(process.env.BACKEND_URL + "/api/changeStatus",
            {
              method: "PUT",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
              },
              body: JSON.stringify({ id, role, status })
            }

          )
          const data = await response.json()
          return data
        } catch (error) {
          console.log(error)
        }

      },

    // deleteSeller: async (id) => {
    //   let actions = getActions();
    //   const response = await fetch(process.env.BACKEND_URL+'/administrator/seller'+ `/${id}`, {
    //     method: "DELETE",
    //     headers: {
    //       "Content-Type": "application/json",
    //   },
    //   })
    //   if (!response.ok) {
    //     alert("No se puede eliminar Seller");
    //   }else {
    //     actions.getAllUser();
    //   }
    // },
    //},
  },
};
};

export default getState;
