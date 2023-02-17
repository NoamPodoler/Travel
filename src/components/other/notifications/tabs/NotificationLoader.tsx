import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import LottieView from "lottie-react-native";
import { SCREEN_WIDTH } from "../../../../utils/constans";
import { useNotifications } from "../Notifications";
import Success from "./NotificationSuccess";
import NotificationSuccess from "./NotificationSuccess";
import NotificationFail from "./NotificationFail";

type Props = {};

type Status = "Loading" | "Failed" | "Success";

const NotificationLoader = ({}: Props) => {
  const notification = useNotifications();

  const lottieRef = useRef<LottieView>(null);

  useEffect(() => {
    if (lottieRef.current) {
      setTimeout(() => {
        lottieRef.current?.reset();
        lottieRef.current?.play();
        lottieRef.current.play();
      }, 100);
    }
  }, [lottieRef.current]);

  return (
    <LottieView
      source={require("../../../../../assets/lottie/loader.json")}
      style={{ flex: 1 }}
      ref={lottieRef}
      autoPlay
      loop
    />
  );
};

export default NotificationLoader;

const styles = StyleSheet.create({});
