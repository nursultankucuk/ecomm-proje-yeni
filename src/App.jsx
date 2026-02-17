import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ShoppingCart } from "lucide-react";

import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchProducts } from "./store/productReducer";

function Home() {
  const dispatch = useDispatch();

  const message = useSelector((state) => state.test.message);
  const { products, loading, error } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-semibold flex items-center gap-2">
        <ShoppingCart /> Home
      </h1>

      {/* Redux Test */}
      <p className="text-green-600 font-bold">{message}</p>

      {/* Toast Test */}
      <button
        className="px-4 py-2 rounded bg-black text-white"
        onClick={() => toast.success("Toast çalışıyor!")}
      >
        Test Toast
      </button>

      {/* Loading */}
      {loading && <p>Yükleniyor...</p>}

      {/* Error */}
      {error && <p className="text-red-500">{error}</p>}

      {/* Products */}
      <div className="grid grid-cols-3 gap-4">
        {products.map((item) => (
          <div key={item.id} className="border p-3 rounded shadow">
            <h2 className="font-semibold">{item.title}</h2>
            <p>${item.price}</p>
          </div>
        ))}
      </div>

      <Link className="underline block mt-6" to="/x">
        404’e git
      </Link>
    </div>
  );
}

function NotFound() {
  return <div className="p-6">404 - Not Found</div>;
}

export default function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route component={NotFound} />
      </Switch>

      <ToastContainer position="top-right" autoClose={2500} />
    </Router>
  );
}
