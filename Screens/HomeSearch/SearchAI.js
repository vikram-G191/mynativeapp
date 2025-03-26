import { useEffect, useRef, useState } from 'react';
import {
  StyleSheet,
  SafeAreaView,
  Animated,
  Dimensions,
  ImageBackground,
  Easing,
  Image,
  View,
  Text,
  Platform,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import FastImage from 'react-native-fast-image';
import { useRoute } from '@react-navigation/native';

const SearchAI = ({ navigation }) => {
  const screenHeight = Dimensions.get('window').height;

  const translateValue = useRef(new Animated.Value(0)).current;
  const imageTranslateValue = useRef(new Animated.Value(0)).current;
  const scaleValue = useRef(new Animated.Value(0)).current;
  const opacityValue = useRef(new Animated.Value(1)).current;

  const [fillValue, setFillValue] = useState(0);
  const [showGif, setShowGif] = useState(false);

  const ANIMATION_DURATION = 8000; // Adjusted to 8 seconds
  const route = useRoute();

  const Journey_Details = route.params?.state?.Journey_Details || 'No Source ID';
  const Journey_Date = route.params?.state?.Journey_Date;
  const selectedBusesRegular = route?.params?.state?.selectedBusesRegular
  const selectedBusesLuxury = route?.params?.state?.selectedBusesLuxury
  const selectedBusesAll = route?.params?.state?.selectedBusesAll
  // Background scrolling animation
  const scrollUpAnimation = () => {
    return Animated.timing(translateValue, {
      toValue: -screenHeight,
      duration: ANIMATION_DURATION,
      easing: Easing.linear,
      useNativeDriver: false, // Use false for layout-affecting transformations
    });
  };

  // Image bounce animation (up & down)
  const imageScrollAnimation = () => {
    return Animated.sequence([
      Animated.timing(imageTranslateValue, {
        toValue: screenHeight - 100,
        duration: ANIMATION_DURATION / 5,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
      Animated.timing(imageTranslateValue, {
        toValue: 0,
        duration: ANIMATION_DURATION / 5,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
    ]);
  };

  useEffect(() => {
    Animated.parallel([
      Animated.loop(scrollUpAnimation()),
      Animated.loop(imageScrollAnimation()),
    ]).start();
  }, []); // Added dependency array to ensure it runs only once

  useEffect(() => {
    if (fillValue === 100) {
      // Scaling animation when progress completes
      Animated.timing(scaleValue, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }).start();

      setTimeout(() => {
        Animated.timing(opacityValue, {
          toValue: 0,
          duration: 1000,
          useNativeDriver: true,
        }).start(() => {
          setShowGif(true);
          Animated.timing(opacityValue, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: true,
          }).start();

          setTimeout(() => {
            navigation.navigate('TripListScreen', {
              state: {
                Journey_Details, Journey_Date,
                selectedBusesRegular,
                selectedBusesLuxury,
                selectedBusesAll
              }
            });
          }, 2000);
        });
      }, 2000);
    }
  }, [fillValue]);

  return (
    <SafeAreaView style={styles.container}>
      <Animated.View style={[styles.backgroundContainer, { transform: [{ translateY: translateValue }] }]}>
        {[...Array(4)].map((_, i) => (
          <ImageBackground
            key={i}
            source={require('../assets/imageAI.png')}
            style={styles.backgroundImage}
            resizeMode="contain"
          />
        ))}
      </Animated.View>

      <Animated.View style={{ transform: [{ translateY: imageTranslateValue }] }}>
        <View style={styles.container1}>
          <LinearGradient
            colors={['#1F487C1A', '#1F487C44', '#1F487C80', '#FFFFFF']}
            style={styles.gradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 0, y: 1 }}
          />
        </View>
      </Animated.View>

      <View style={styles.imageContainer}>
        <Image
          source={require('../assets/topLeftImage.png')}
          style={[styles.cornerImage, styles.topLeft]}
        />
        <Image
          source={require('../assets/topRightImage.png')}
          style={[styles.cornerImage, styles.topRight]}
        />
        <Image
          source={require('../assets/bottomLeftImage.png')}
          style={[styles.cornerImage, styles.bottomLeft]}
        />
        <Image
          source={require('../assets/bottomRightImage.png')}
          style={[styles.cornerImage, styles.bottomRight]}
        />
      </View>

      <View style={styles.centeredView}>
        {fillValue !== 100 && (
          <AnimatedCircularProgress
            size={200}
            width={20}
            fill={100}
            duration={ANIMATION_DURATION}
            tintColor="#1F487C"
            backgroundColor="#fff"
            onAnimationComplete={() => setFillValue(100)}
          >
            {fill => {
              const value = Math.round(fill);
              if (value !== fillValue) setFillValue(value);
              return <Text style={styles.progressText}>{`${value}%`}</Text>;
            }}
          </AnimatedCircularProgress>
        )}
        {fillValue === 100 && !showGif && (
          <Animated.Image
            source={require('../assets/owal.png')}
            style={[{ width: '100%', height: '100%' }, { transform: [{ scale: scaleValue }] }, { opacity: opacityValue }]}
            resizeMode="contain"
          />
        )}
        {showGif &&
          (Platform.OS === 'ios' ? (
            <Animated.Image
              source={require('../assets/tick.gif')}
              style={[styles.image, { transform: [{ scale: scaleValue }] }, { opacity: opacityValue }]}
            />
          ) : (
            <FastImage
              source={require('../assets/tick.gif')}
              style={{ height: 140, width: 140 }}
              resizeMode={FastImage.resizeMode.contain}
            />
          ))}
      </View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E5FFF1',
  },
  backgroundContainer: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  backgroundImage: {
    height: '100%',
    width: '100%',
    resizeMode: 'cover',
  },
  container1: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },
  gradient: {
    width: '100%',
    height: 60,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,

    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  imageContainer: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#39393980',
    marginLeft: 1,
    marginBottom: 1,
  },
  cornerImage: {
    position: 'absolute',
    width: Dimensions.get('window').width / 5,
    height: Dimensions.get('window').width / 5,
  },
  topLeft: {
    top: 0,
    left: 3,
  },
  topRight: {
    top: 0,
    right: 3,
  },
  bottomLeft: {
    bottom: 0,
    left: 3,
  },
  bottomRight: {
    bottom: 0,
    right: 3,
  },
  OvalShapeView: {
    width: '100%',
    height: 120,
    backgroundColor: '#FFF',
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  centeredView: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  progressText: {
    color: '#fff',
    fontSize: 26,
    fontWeight: '700',
  },
  image: {
    height: 200,
    width: 200,
  },
});

export default SearchAI;
