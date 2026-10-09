import Providers from "./Providers";
import AppRoutes from "./router";

export default function App() {
  return (
    <Providers>
      <AppRoutes />
    </Providers>
  );
}