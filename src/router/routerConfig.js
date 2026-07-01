import { createBrowserRouter } from "react-router-dom";
import App from "../App.jsx";
import { Home, SignUp, Login, AllPosts, AddPost } from "../pages/index.js";
import { Protected } from "../components";
import PostDetails from "../components/PostDetails.jsx";

const routerConfig = createBrowserRouter([
  {
    Component: App,
    path: "/",
    children: [
      // public Routes
      {
        Component: Home,
        index: true,
      },
      {
        Component: Login,
        path: "login",
      },
      {
        Component: SignUp,
        path: "signup",
      },
      // private Routes
      {
        Component: Protected,
        children: [
          {
            Component: AllPosts,
            path: "allposts",
          },
          {
            Component: AddPost,
            path: "addpost",
          },
          {
            Component: PostDetails,
            path: "posts/:id",
          },
        ],
      },
    ],
  },
]);

export default routerConfig;
