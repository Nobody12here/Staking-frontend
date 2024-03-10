import Header from "./components/Header/Header";
import StakingCard from "./components/StakingCard/StakingCard";
import "./App.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// Create a client
const queryClient = new QueryClient();

function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Header></Header>
        <StakingCard></StakingCard>
      </QueryClientProvider>
    </>
  );
}

export default App;
