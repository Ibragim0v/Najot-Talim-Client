import { lazy, Suspense } from "react";
import { Loader } from "./components";
import { useAuth } from "./hooks/useAuth";

const Private = lazy(() =>
  import("./Private").then((res) => ({
    default: res.Private,
  }))
);
const Public = lazy(() =>
  import("./Public").then((res) => ({
    default: res.Public,
  }))
);

function App() {
  const { token } = useAuth(true);

  if (token) {
    return (
      <Suspense fallback={<Loader />}>
        <Private />
      </Suspense>
    );
  }

  return (
    <Suspense fallback={<Loader />}>
      <Public />
    </Suspense>
  );
}

export default App;
