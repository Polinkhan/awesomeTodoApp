import HeroScreen from "./App/Screens/HeroScreen";
import { useFonts } from "expo-font";
import Navigator from "./App/Navigators/Navigator";
import * as Notifications from "expo-notifications";
import * as TaskManager from "expo-task-manager";
import * as Application from "expo-application";

console.log(Application.androidId);

const BACKGROUND_NOTIFICATION_TASK = "BACKGROUND-NOTIFICATION-TASK";

TaskManager.defineTask(
  BACKGROUND_NOTIFICATION_TASK,
  ({ data, error, executionInfo }) => {
    if (error) {
      console.log("error occurred");
    }
    if (data) {
      console.log("data-----", data);
    }
  }
);

Notifications.registerTaskAsync(BACKGROUND_NOTIFICATION_TASK);

export default function App() {
  const [fontsLoaded] = useFonts({
    Pop: require("./App/assets/fonts/static/Poppins-Regular.ttf"),
    BoldPop: require("./App/assets/fonts/static/Poppins-SemiBold.ttf"),
    LightPop: require("./App/assets/fonts/static/Poppins-Light.ttf"),
  });
  return fontsLoaded && <Navigator />;
}
