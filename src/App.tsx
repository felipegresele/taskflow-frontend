import { Route, Routes } from "react-router-dom";
import { FormLogin } from "./routes/primeiro-acesso/form-login";
import { FormRegister } from "./routes/primeiro-acesso/form-register";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ListTasks } from "./routes/pages/task/list-tasks";
import { ModalAddTask } from "./routes/pages/task/form-add";
import { MantineProvider } from "@mantine/core";

function App() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <MantineProvider>
        <Routes>
          <Route path="/login" element={<FormLogin />} />
          <Route path="/" element={<FormRegister />} />
          <Route path="/tasks" element={<ListTasks />} />
          <Route path="/add-task" element={<ModalAddTask />} />
        </Routes>
      </MantineProvider>
    </QueryClientProvider>
  );
}

export default App;
