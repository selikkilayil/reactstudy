import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { db } from "./firebaseConfig";
import CounterHooks from "./components/counterHooks";
import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

const queryClient = new QueryClient();

async function AddData({ firstName, lastName, dob }) {
  return await addDoc(collection(db, "users"), {
    first: firstName,
    last: lastName,
    born: dob,
  });
}

function ListData() {
  const [val, setVal] = useState([]);

  const { isLoading, error, data } = useQuery(["userData"], () =>
    getDocs(collection(db, "users"))
  );

  const mutationDlt = useMutation(deleteDoc, {
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries(["userData"]);
    },
  });

  function deleteHandler(id) {
    mutationDlt.mutate(doc(db, "users", id));
  }

  if (isLoading)
    return (
      <Box sx={{ display: "flex" }}>
        <CircularProgress />
      </Box>
    );

  if (error) return "An error has occurred: " + error.message;

  // const getAnswer = async () => {
  //   const data = await getDocs(collection(db, "users"));
  //   setVal(
  //     data.docs.map((doc) => {
  //       return {
  //         ...doc.data(),
  //         id: doc.id,
  //       };
  //     })
  //   );
  // };

  console.log(val);

  const listItems = data.docs.map((user) => {
    return (
      <li key={user.id}>
        {user.data().first} {user.data().last}
        <button onClick={() => deleteHandler(user.id)}>Delete</button>
      </li>
    );
  });
  return <ul>{listItems}</ul>;
}

function AddUser() {
  const mutation = useMutation(AddData, {
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries(["userData"]);
    },
  });

  const form = useFormik({
    initialValues: {
      first: "",
      last: "",
      born: 0,
    },
    onSubmit: (values) => {
      console.log(values);
      mutation.mutate({
        firstName: values.first,
        lastName: values.last,
        dob: values.born,
      });

      values.first = "";
      values.last = "";
      values.born = 0;
    },
  });

  return (
    <div>
      <form onSubmit={form.handleSubmit}>
        <input
          id="first"
          name="first"
          onChange={form.handleChange}
          value={form.values.first}
          placeholder="first"
        />
        <input
          id="last"
          name="last"
          onChange={form.handleChange}
          value={form.values.last}
          placeholder="last"
        />
        <input
          id="born"
          name="born"
          onChange={form.handleChange}
          value={form.values.born}
          placeholder="born"
        />
        <button type="submit" onClick={form.onSubmit}>
          Save
        </button>
      </form>
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AddUser />
      <ListData />
    </QueryClientProvider>
  );
}

export default App;
