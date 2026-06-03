import { Outlet } from "react-router";
import { useAuth } from "@clerk/react";
import PageLoader from "./components/PageLoader";
import Layout from "./components/Layout";

const App = () => {
  const { isLoaded } = useAuth();

  if (!isLoaded) return <PageLoader />;

  return (
    <>
      <Layout>
        <Outlet />
      </Layout>
    </>
  );
};

export default App;
