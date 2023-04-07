import { QueryClient, QueryClientProvider } from "react-query";
import "./App.css";
import Router from "./core/router";
import GlobalStyle from "./styles/global";
import { useState } from "react";
import { RecoilRoot } from "recoil";
function App() {
  const [queryClient] = useState(() => new QueryClient());
  return (
    <QueryClientProvider client={queryClient}>
      <RecoilRoot>
        <GlobalStyle />
        <Router />
      </RecoilRoot>
    </QueryClientProvider>
  );
}

export default App;
