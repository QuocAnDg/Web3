import { ProviderWrapper as CountsProviderWrapper } from "../../contexts/countersContext.jsx";
import App from "./App.jsx";

const AppLoader= () => {
  return (
    <CountsProviderWrapper >
        <App />
      </CountsProviderWrapper >
  )
}
export default AppLoader;
