import { useDispatch, useSelector } from "react-redux";
import { GetAds } from "../../API/TBSapi/Advertisement/Advertisement";
import FastImage from "react-native-fast-image";
import { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Advertisement = ({pageId}) => {
  const dispatch = useDispatch();
  const apiCrmImage = "https://crm.thebusstand.com";
  const adsList = useSelector((state) => state?.productReducer?.ads_list);
  const [currentIndex, setCurrentIndex] = useState(0); 

  // Fetch current index from AsyncStorage on mount
  const filteredAds = adsList?.filter(ad => ad?.page_id === pageId);
  useEffect(() => {
    const getads= GetAds(dispatch)
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
  

  return (
    <View>
      <FastImage
        source={{ uri: `${apiCrmImage}${filteredAds?.[currentIndex]?.mobad_vdo}` }}
        style={styles.fullSizeImage}
        resizeMode={FastImage.resizeMode.cover}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  fullSizeImage: {
    height: "100%",
    width: "100%",
    borderRadius:10
  },
});

export default Advertisement;
