import { RouterProvider } from 'react-router-dom';

// Routes
import router from './router';

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
