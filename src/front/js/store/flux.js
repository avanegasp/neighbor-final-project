import { faL } from "@fortawesome/free-solid-svg-icons";

const getState = ({ getStore, getActions, setStore }) => {
  return {
    store: {
      // message: null,
      neighbor: {},
      seller: {},
      admin: {},
      users: null,
      favorites: [],
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
          if (!response.ok) {
            return false;
          }
          const data = await response.json();
          setStore({ currentUser: data.user })
          localStorage.setItem('token', data.token);
          console.log(data);
          console.log(getStore().currentUser);
          return data;
        } catch (error) {
          console.log(error);
        }
      },

      getProfileNeighbor: async (id) => {
        console.log("HEREEEE PROFILE", id);
        if (!id) return;

        try {
          const response = await fetch(
            `${process.env.BACKEND_URL}/api/neighbor/${id}`,
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
              },
            }
          );

          if (!response.ok) {
            console.error(`Error: ${response.status} ${response.statusText}`);
            return false;
          }

          const data = await response.json();
          setStore({ neighbor: data });
        } catch (error) {
          console.error("Error fetching neighbor:", error.message);
        }
      },

      getProfileSeller: async (id) => {
        console.log("HEREEEE PROFILE", id);
        if (!id) return;

        try {
          const response = await fetch(
            `${process.env.BACKEND_URL}/api/seller/${id}`,
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
              },
            }
          );

          if (!response.ok) {
            console.error(`Error: ${response.status} ${response.statusText}`);
            return false;
          }

          const data = await response.json();
          setStore({ seller: data });
        } catch (error) {
          console.error("Error fetching seller:", error.message);
        }
      },

      getProfileAdmin: async (id) => {
        if (!id) return;

        try {
          const response = await fetch(
            `${process.env.BACKEND_URL}/api/administrator/${id}`,
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
              },
            }
          );

          if (!response.ok) {
            console.error(`Error: ${response.status} ${response.statusText}`);
            return false;
          }

          const data = await response.json();
          setStore({ admin: data });
        } catch (error) {
          console.error("Error fetching admin:", error.message);
        }
      },

      getAllDirectory: async () => {
        try {
          const response = await fetch(
            `${process.env.BACKEND_URL}/api/directory`,
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
              },
            }
          );

          if (!response.ok) {
            console.error(`Error: ${response.status} ${response.statusText}`);
            return false;
          }

          const data = await response.json();
          setStore({ users: data });
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
          console.log("DATAAAA", data);
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
          return data;
        } catch (error) {
          console.log(error);
        }
      },

      getSingleBusiness: async (seller_id, business_id) => {
        if (!seller_id || !business_id) return;
        // const jwt = localStorage.getItem("token");
        try {
          const response = await fetch(
            `${process.env.BACKEND_URL}/api/seller/${seller_id}/business/${business_id}`,
            {
              method: "GET",
              headers: {
                // authorization: `Bearer ${jwt}`
              },
            }
          );
          if (!response.ok) {
            console.error(`Error: ${response.status} ${response.statusText}`);
            return false;
          }
          const data = await response.json();
          setStore({ shop: data });
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
      }



    },
  };
};

export default getState;
