import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { createContext, useContext, useMemo, useState } from "react";
import {
  CUSTOM_DURATION,
  SCREEN_HEIGHT,
  SCREEN_WIDTH,
} from "../../../utils/constans";
import Animated, {
  FadeIn,
  FadeInDown,
  FadeOut,
  not,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withDelay,
  withSequence,
  withTiming,
} from "react-native-reanimated";
import { BLACK } from "../../../utils/colors";
import { useThemeColors } from "../../../app/hooks";
import { center } from "../../../utils/styling";
import { NotificationsContext } from "../../../utils/context";
import { Rect } from "react-native-safe-area-context";
import { withCustomTiming } from "../../../utils/fn/style";

type Props = {
  children: React.ReactNode;
};

const Notifications = ({ children }: Props) => {
  const [content, setContent] = useState<React.ReactNode>(<></>);
  const [isShown, _setShown] = useState<boolean>(false);

  // Overlay UI
  const overlayLoad = useSharedValue(0);
  const rStyleOverlay = useAnimatedStyle(() => {
    const opacity = overlayLoad.value;
    return {
      opacity,
    };
  });

  // Content UI
  const contentLoad = useSharedValue(1);
  const rStyleContent = useAnimatedStyle(() => {
    const opacity = contentLoad.value;
    return {
      opacity,
    };
  });

  //

  const push = (item: React.ReactNode) => {
    if (isShown) {
      // contentLoad : 1 -> 0 -> 1
      contentLoad.value = withSequence(
        withCustomTiming(0, CUSTOM_DURATION / 2),
        withDelay(100, withCustomTiming(1, CUSTOM_DURATION / 2))
      );
      setTimeout(() => setContent(item), CUSTOM_DURATION / 2 + 50);
    } else {
      setContent(item);
      setShown(true);
    }
  };

  const setShown = (bool: boolean) => {
    setTimeout(() => _setShown(bool), (CUSTOM_DURATION / 2) * (bool ? 0 : 1));

    overlayLoad.value = withDelay(
      (CUSTOM_DURATION / 4) * (bool ? 0 : 1),
      withCustomTiming(bool ? 1 : 0, CUSTOM_DURATION / 2)
    );
    contentLoad.value = withDelay(
      (CUSTOM_DURATION / 4) * (bool ? 1 : 0),
      withCustomTiming(bool ? 1 : 0, CUSTOM_DURATION / 2)
    );
  };

  const dismiss = () => setShown(false);

  const { main, second, invertedMain, invertedSecond } = useThemeColors();
  return (
    <NotificationsContext.Provider
      value={{
        push,
        dismiss,
      }}
    >
      {children}
      {isShown && (
        <Animated.View
          style={[rStyleOverlay, styles.overlay, { backgroundColor: main }]}
        >
          <Animated.View style={[{ flex: 1 }, center, rStyleContent]}>
            {content}
          </Animated.View>
        </Animated.View>
      )}
    </NotificationsContext.Provider>
  );
};

export default Notifications;

export const useNotifications = () => {
  const { push, dismiss } = useContext(NotificationsContext);
  return { push, dismiss };
};

const styles = StyleSheet.create({
  overlay: {
    position: "absolute",
    height: SCREEN_HEIGHT,
    width: SCREEN_WIDTH,
  },

  notification: {
    height: 200,
    marginHorizontal: 20,
    padding: 20,
    borderRadius: 20,
  },
});
