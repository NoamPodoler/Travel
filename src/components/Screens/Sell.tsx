import {
  Dimensions,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
} from "react-native";
import React, { useMemo, useState } from "react";
import {
  Entypo,
  FontAwesome,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import {
  RootNavigatorParamList,
  CHATS,
  PRODUCT_LISTING,
  MainNavigatorParamList,
} from "../navigations/NavigationTypes";
import NumberScroll from "../common/NumberScroll";
import {
  useAppDispatch,
  useAppSelector,
  useThemeColors,
} from "../../app/hooks";
import Chevron from "../common/Chevron";
import Button from "../common/Button";
import Footer from "../common/Footer";
import { addOffer, addToCart, Offer } from "../../features/CartSlice";
import Popup from "../common/Popup";
import SlidingBar from "../common/SlidingBar";
import Chat from "./Chat";
import { blue } from "../../utils/colors";
import { SCREEN_HEIGHT, SCREEN_WIDTH } from "../../utils/constants";

const Sell = () => {
  const {
    params: { price, title, description, id },
  } = useRoute<RouteProp<MainNavigatorParamList>>();

  const sell = { title, price, description, id };
  const [currentPrice, setCurrentPrice] = useState<number>(price);

  const MainNavigator =
    useNavigation<NativeStackNavigationProp<MainNavigatorParamList>>();

  const dispatch = useAppDispatch();

  const colors = useThemeColors();

  const [isTabShown, setTabShown] = useState<boolean>(false);

  const { cartList } = useAppSelector((state) => state.cart);

  const cartItem = useMemo(() => cartList[id], [cartList]);

  const buyerOffers = useMemo(() => {
    if (cartItem)
      return cartItem.offers
        .filter((item) => item.buyer)
        .map((item) => item.price);

    return null;
  }, [cartItem]);

  const sellerOffers = useMemo(() => {
    if (cartItem)
      return cartItem.offers
        .filter((item) => !item.buyer)
        .map((item) => item.price);

    return null;
  }, [cartItem]);

  const chat = useMemo(() => {
    if (cartItem) return cartItem.chat;

    return null;
  }, [cartItem]);

  const handleBuy = () => {
    if (cartItem) {
      // New Offer
      dispatch(
        addOffer({
          id: sell.id,
          offer: { price: currentPrice, buyer: true },
          buyer: true,
        })
      );
    } else {
      dispatch(
        addToCart({
          sell: sell,
          offer: { price: currentPrice, buyer: true },
        })
      );
    }

    setTabShown(true);
  };

  // Document Variables

  const buttonTitle = useMemo(() => {
    if (cartItem) {
      if (currentPrice > sellerOffers.at(-1))
        return "Seller Offered " + sellerOffers.at(-1);
      else if (currentPrice === buyerOffers.at(-1)) return "Offer Sent";
      else if (currentPrice === price) return "Buy Now";
      else if (currentPrice === 0) return "Enter Price";
      else return "Update Offer";
    } else {
      if (currentPrice === price) return "Buy Now";
      else return "Send an Offer";
    }
  }, [currentPrice, cartItem]);

  // Footer

  const left = (
    <Chevron
      onPress={() => MainNavigator.goBack()}
      chevronColor={colors.invertedMain}
      alternate
    />
  );

  const center = (
    <Button onPress={() => handleBuy()}>
      <Text style={{ color: colors.invertedMain }}>{buttonTitle}</Text>
    </Button>
  );

  const right = (
    <Button
      onPress={() =>
        MainNavigator.navigate(PRODUCT_LISTING, {
          title,
          price,
          description,
          id,
        })
      }
    >
      <Entypo name="documents" size={24} color={colors.invertedMain} />
    </Button>
  );

  return (
    <View style={{ flex: 1 }}>
      <SafeAreaView style={{ flex: 1 }}>
        {/* Image */}
        {isTabShown && (
          <SlidingBar
            setShown={(bool) => setTabShown(bool)}
            bottom
            height={SCREEN_HEIGHT - 150}
          >
            <Chat chat={chat} id={cartItem.sell.id} />
          </SlidingBar>
        )}

        <View style={styles.imageContainer}>
          <Image
            source={require("../../../assets/images/playstation5.jpeg")}
            style={{ position: "absolute", width: "100%", height: "100%" }}
          />
        </View>

        <View style={{ flex: 1 }}>
          <View style={{ flexGrow: 1, justifyContent: "flex-end" }}>
            <View style={styles.descriptionContainer}>
              <View style={{ alignItems: "center" }}>
                <Footer
                  left={
                    <Button onPress={() => {}}>
                      <FontAwesome
                        name="user-o"
                        size={20}
                        color={colors.invertedMain}
                      />
                    </Button>
                  }
                  center={
                    <Text
                      style={[styles.title, { color: colors.invertedSecond }]}
                    >
                      {title}
                    </Text>
                  }
                  right={
                    cartItem && (
                      <Button onPress={() => setTabShown(true)}>
                        <Entypo
                          name="chat"
                          size={20}
                          color={colors.invertedMain}
                        />
                      </Button>
                    )
                  }
                  margin={60}
                />
                <Text
                  style={[styles.description, { color: colors.invertedSecond }]}
                >
                  Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ut
                  suscipit iure perferendis similique quos ad odit nam alias
                  nobis odio!
                </Text>
              </View>

              <NumberScroll initialValue={price} setValue={setCurrentPrice} />
            </View>
          </View>
        </View>

        <Footer left={left} center={center} right={right} />
      </SafeAreaView>
    </View>
  );
};

export default Sell;

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    margin: 14,
    zIndex: 2,
  },

  imageContainer: {
    height: 340,
    margin: 14,
    borderRadius: 20,
    overflow: "hidden",
    zIndex: 1,
  },

  descriptionContainer: {
    flex: 1,
    justifyContent: "space-around",
    alignItems: "center",
  },

  title: {
    fontSize: 20,
    fontWeight: "300",
  },

  description: {
    marginHorizontal: 40,
    marginVertical: 20,
    opacity: 0.5,
    textAlign: "center",
  },
});
