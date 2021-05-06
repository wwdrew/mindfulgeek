import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import RootStack from "./navigation/RootStack.navigator";

const MindfulGeek = () => {
  return (
    <NavigationContainer>
      <RootStack />
    </NavigationContainer>
  );
};

export default MindfulGeek;
