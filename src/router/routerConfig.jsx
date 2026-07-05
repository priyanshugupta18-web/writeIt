import { createBrowserRouter } from "react-router-dom";
import App from "../App.jsx";
import { Protected, ExtraProtected } from "../components/index.js";
import { lazy, Suspense } from "react";
import { Loader } from "../components/index.js";
import { Edit } from "lucide-react";

const Home = lazy(() => import("../pages/home/Home.jsx"));
const SignUp = lazy(() => import("../pages/signup/SignUp.jsx"));
const Login = lazy(() => import("../pages/login/Login.jsx"));
const AllPosts = lazy(() => import("../pages/allposts/AllPosts.jsx"));
const AddPost = lazy(() => import("../pages/addpost/AddPost.jsx"));
const PostDetails = lazy(() => import("../components/PostDetails.jsx"));
const EditPost = lazy(() => import("../components/EditPost.jsx"));

const withSuspense = (Component) => (
  <Suspense fallback={<Loader />}>
    <Component />
  </Suspense>
);

const routerConfig = createBrowserRouter([
  {
    element: <App />,
    path: "/",
    children: [
      // public Routes
      {
        element: withSuspense(Home),
        index: true,
      },
      {
        element: withSuspense(Login),
        path: "login",
      },
      {
        element: withSuspense(SignUp),
        path: "signup",
      },
      {
        element: withSuspense(AllPosts),
        path:"allposts",
      },
      // private Routes
      {
        element: <Protected />,
        children: [
          {
            element: withSuspense(AddPost),
            path: "addpost",
          },
          {
            element: withSuspense(PostDetails),
            path: "posts/:id",
          },
          {
            element: <ExtraProtected />,
            children: [
              {
                element: withSuspense(EditPost),
                path:"/editpost/:id"
              }
            ]
          }
        ],
      },
    ],
  },
]);

export default routerConfig;
