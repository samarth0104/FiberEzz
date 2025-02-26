import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator, CardStyleInterpolators } from "@react-navigation/stack";
import LoginScreen from "./login";
import SignUpScreen from "./signup";
import Home from "./home";
import MyOrders from "./myOrders";
import Support from "./support";
import Plans from "./plans";
import Availability from "./availability";

const Stack = createStackNavigator();

export default function App() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        gestureEnabled: true, // Enable swipe gestures
        animation: "slide_from_right", // Native smooth transition
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS, // Smooth slide-in animation
      }}
    >
      {/* Auth Screens */}
      {/* <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
        <Stack.Screen name="SignUp" component={SignUpScreen} options={{ headerShown: false }} /> */}

      {/* Main Screens */}
      <Stack.Screen name="Home" component={Home} options={{ headerShown: false }} />
      <Stack.Screen name="Plans" component={Plans} />
      <Stack.Screen name="MyOrders" component={MyOrders} options={{ headerShown: false }} />
      <Stack.Screen name="Support" component={Support} options={{ headerShown: false }} />
      <Stack.Screen name="Availability" component={Availability} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
}
