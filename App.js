import Route from './src';
import { Provider } from "react-redux";
import store from "./src/Redux/store";

export default function App() {
  return (
    <Provider store={store}>
      <Route />
    </Provider>
  );
}


