const getState = ({ getStore, getActions, setStore }) => {
  return {
    store: {
      message: null,
      neighbor: null,
      seller: null,
    },
    actions: {
      // Use getActions to call a function within a fuction
      exampleFunction: () => {
        getActions().changeColor(0, "green");
      },

      getMessage: async () => {
        try {
          // fetching data from the backend
          const resp = await fetch(process.env.BACKEND_URL + "/api/hello");
          const data = await resp.json();
          setStore({ message: data.message });
          // don't forget to return something, that is how the async resolves
          return data;
        } catch (error) {
          console.log("Error loading message from backend", error);
        }
      },
      changeColor: (index, color) => {
        //get the store
        const store = getStore();

        //we have to loop the entire demo array to look for the respective index
        //and change its color
        const demo = store.demo.map((elm, i) => {
          if (i === index) elm.background = color;
          return elm;
        });

        //reset the global store
        setStore({ demo: demo });
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
          const data = response.json();
          return data;
        } catch (error) {
          console.log(error);
        }
      },

      getProfileNeighbor: async (id) => {
        if (!id) {
          // console.error("Id is undefined");
          return;
        }

        // console.log("Id desde flux", id);

        try {
          const response = await fetch(
            `${process.env.BACKEND_URL}/api/neighbor/${id}`
          );
          // console.log("Ruta neighbor", response);
          if (!response.ok) return false;

          const data = await response.json();
          console.log("Esto es data de neighbor", data);
          if (data.error) {
            console.error(data.error);
          } else {
            setStore({
              neighbor: data,
            });
          }
        } catch (error) {
          console.error("Error fetching neighbor:", error);
        }
      },

      getProfileSeller: async (id) => {
        if (!id) {
          console.error("Id es undefined en seller flux", id);
          return;
        }
        try {
          const response = await fetch(
            `${process.env.BACKEND_URL}/api/seller/${id}`
          );
          if (!response.ok) return false;

          const data = await response.json();
          console.log("Data seller flux", data);
          if (data.error) {
            console.error(data.error);
          } else {
            setStore({
              seller: data,
            });
          }
        } catch (error) {
          console.error("Error fetching seller:", error);
        }
      },
    },
  };
};

export default getState;
