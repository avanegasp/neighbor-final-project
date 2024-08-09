const getState = ({ getStore, getActions, setStore }) => {
  return {
    store: {
      // message: null,
      neighbor: null,
      seller: null,
      admin: null,
      users: null,
    },
    actions: {
      // Use getActions to call a function within a fuction
      exampleFunction: () => {
        getActions().changeColor(0, "green");
      },

      // getMessage: async () => {
      //   try {
      //     // fetching data from the backend
      //     const resp = await fetch(process.env.BACKEND_URL + "/api/hello");
      //     const data = await resp.json();
      //     setStore({ message: data.message });
      //     // don't forget to return something, that is how the async resolves
      //     return data;
      //   } catch (error) {
      //     console.log("Error loading message from backend", error);
      //   }
      // },
      // changeColor: (index, color) => {
      //   //get the store
      //   const store = getStore();

      //   //we have to loop the entire demo array to look for the respective index
      //   //and change its color
      //   const demo = store.demo.map((elm, i) => {
      //     if (i === index) elm.background = color;
      //     return elm;
      //   });

      //   //reset the global store
      //   setStore({ demo: demo });
      // },
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
          const data = response.json();
          return data;
        } catch (error) {
          console.log(error);
        }
      },

      getProfileNeighbor: async (id) => {
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
    },
  };
};

export default getState;
