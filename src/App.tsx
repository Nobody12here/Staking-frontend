import Header from "./components/Header/Header";
import Footer from "./components/Footer";
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
        <Footer></Footer>
      </QueryClientProvider>
    </>
  );
}

export default App;
