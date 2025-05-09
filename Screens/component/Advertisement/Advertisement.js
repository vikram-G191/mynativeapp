import { useDispatch, useSelector } from "react-redux";
import { GetAds } from "../../API/TBSapi/Advertisement/Advertisement";
import FastImage from "react-native-fast-image";
import { useEffect, useState } from "react";
import { Linking, StyleSheet, View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { TouchableOpacity } from "react-native-gesture-handler";

const Advertisement = ({ pageId }) => {
  const dispatch = useDispatch();
  // const apiCrmImage = process.env.REACT_APP_CRM_API_URL_IMAGE
  const apiCrmImage = "https://crm.thebusstand.com";

  const adsList = useSelector((state) => state?.productReducer?.ads_list);
  const [currentIndex, setCurrentIndex] = useState(0);
  // console.log(pageId, 'pageId')
  // Fetch current index from AsyncStorage on mount
  const filteredAds = adsList?.filter(ad => ad?.page_id === pageId);
  useEffect(() => {
    const getads = GetAds(dispatch)
    const fetchIndex = async () => {
      const storedIndex = await AsyncStorage.getItem("currentIndex");
      if (storedIndex !== null) {
        setCurrentIndex(parseInt(storedIndex)); // Convert string to number
      }
    };
    fetchIndex();
  }, []);

  // Update current index in AsyncStorage every 10 seconds
  useEffect(() => {
    if (filteredAds?.length > 0) {
      const interval = setInterval(async () => {
        const newIndex = (currentIndex + 1) % filteredAds?.length;
        setCurrentIndex(newIndex);
        await AsyncStorage?.setItem("currentIndex", newIndex?.toString());
      }, 10000); // Change image every 10 seconds

      return () => clearInterval(interval);
    }
  }, [currentIndex, filteredAds]);

  //   console.log("djdjdj",filteredAds,pageId,adsList);
  // console.log(filteredAds?.[currentIndex]?.web_url,"link")
  const webUrl = filteredAds?.[currentIndex]?.web_url
  const handlePress = () => {
    Linking.openURL(`https://${webUrl}`).catch(err => console.error("Failed to open URL:", err))
  }
  return (
    <View>
      <TouchableOpacity onPress={handlePress}>
        <FastImage
          source={{ uri: `${apiCrmImage}${filteredAds?.[currentIndex]?.mobad_vdo}` }}
          style={styles.fullSizeImage}
          resizeMode={FastImage.resizeMode.cover}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  fullSizeImage: {
    height: "100%",
    width: "100%",
    borderRadius: 10
  },
});

export default Advertisement;
