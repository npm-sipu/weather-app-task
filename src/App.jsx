import {
  Route,
  createBrowserRouter,
  RouterProvider,
  createRoutesFromElements,
} from "react-router-dom";

import RootLayout from "./Components/RootLayout";
import Homescreen from "./Screens/Homescreen";

const App = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path='/' element={<RootLayout />}>
        <Route index element={<Homescreen />} />
      </Route>
    )
  );

  return <RouterProvider router={router} />;
};

export default App;
