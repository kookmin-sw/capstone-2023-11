import { QueryClient, QueryClientProvider } from "react-query";
import "./App.css";
import Router from "./core/router";
import GlobalStyle from "./styles/global";
import { useState } from "react";
function App() {
  const [queryClient] = useState(() => new QueryClient());
  return (
    <QueryClientProvider client={queryClient}>
      <GlobalStyle />
      <Router />
    </QueryClientProvider>
  );
}

export default App;
