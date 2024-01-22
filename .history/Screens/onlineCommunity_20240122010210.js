import { View, Text } from 'react-native'
import React from 'react'
import { OnboardFlow } from "react-native-onboard";

export default function onlineCommunity() {
  return (
    <OnboardFlow
      pages={[
        {
          title: "Welcome to my app",
          subtitle: "This is page 1",
          imageUri: "https://frigade.com/img/example1.png",
        },
        {
          title: "Page 2 header",
          subtitle: "This is page 2",
          imageUri: "https://frigade.com/img/example2.png",
        },
      ]}
      type={"fullscreen"}
    ></OnboardFlow>
  );
}