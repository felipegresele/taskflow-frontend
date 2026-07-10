import { Route, Routes } from "react-router-dom";
import { FormLogin } from "./routes/primeiro-acesso/form-login";
import { FormRegister } from "./routes/primeiro-acesso/form-register";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ListTasks } from "./routes/pages/task/list-tasks";

function App() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <Routes>
        <Route path="/login" element={<FormLogin />} />
        <Route path="/" element={<FormRegister />} />
        <Route path="/tasks" element={<ListTasks />} />
      </Routes>
    </QueryClientProvider>
  );
}

export default App;
