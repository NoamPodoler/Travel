import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import LottieView from "lottie-react-native";
import { SCREEN_WIDTH } from "../../../../utils/constans";
import { useNotifications } from "../Notifications";

type Props = {};

const NotificationFail = ({}: Props) => {
  const notification = useNotifications();
  const lottieRef = useRef<LottieView>(null);

  useEffect(() => {
    if (lottieRef.current) {
      setTimeout(() => {
        lottieRef.current?.reset();
        lottieRef.current?.play();
        lottieRef.current.play();

        setTimeout(() => notification.dismiss(), 2000);
      }, 100);
    }
  }, [lottieRef.current]);

  return (
    <LottieView
      source={require("../../../../../assets/lottie/alert.json")}
      style={{ width: SCREEN_WIDTH - 80 }}
      ref={lottieRef}
      autoPlay
    />
  );
};

export default NotificationFail;

const styles = StyleSheet.create({});
