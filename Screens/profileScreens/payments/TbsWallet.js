import { useState } from "react";
import { View, ScrollView, SafeAreaView, TouchableOpacity, Image, StyleSheet, ImageBackground, Text, FlatList } from "react-native";
import { Svg } from 'react-native-svg';
import BackWhite from "../../assets/BackWhite";

const TbsWallet = ({ navigation }) => {
    const [selectedBuses, setSelectedBuses] = useState([]);
    const [isToggled, setIsToggled] = useState('reg');
const [seatFilter,setseatFilter] = 'seater';
 

    const handleSelectBus = (item) => {
        setSelectedBuses((prev) =>
            prev.includes(item.id)
                ? prev.filter((each) => each !== item.id)
                : [...prev, item.id]
        );
    };

    const BusItem = ({ item, type }) => {
        const isSelected = selectedBuses.includes(item.id);
        const backgroundImages = {
            reg: isSelected ? require('../../assets/reg.png') : require('../../assets/regUn.png'),
            lux: isSelected ? require('../../assets/lux.png') : require('../../assets/luxUn.png'),
            all: isSelected ? require('../../assets/all.png') : require('../../assets/allUn.png')
        };

        return (
            <View style={{ padding: 10 }}>
                <TouchableOpacity onPress={() => handleSelectBus(item)}>
                    <ImageBackground
                        resizeMode='contain'
                        source={backgroundImages[type]}
                        style={[styles.busItemBackground]}
                        imageStyle={{ borderRadius: 8 }}
                    >
                        <View style={styles.busItemContent}>
                            <Image source={item.image} style={styles.busItemIcon} resizeMode="contain" />
                            <Text style={styles.busItemText}>{item.title}</Text>
                        </View>
                    </ImageBackground>
                </TouchableOpacity>
            </View>
        );
    };

    const renderBusItems = (type) => (
        <FlatList
            data={data}
            renderItem={({ item }) => <BusItem item={item} type={type} />}
            numColumns={2}
            scrollEnabled={false}
            contentContainerStyle={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center' }}
            keyExtractor={(item) => item.id}
        />
    );


    const SeatComponent = ({ seatFilter }) => {
        return (
          <>
            {/* Seater Seat */}
            {seatFilter === "seater" && (
              <TouchableOpacity
                style={[
                  styles.outerContainer,
                  seatFilter === "seater" ? styles.seaterBackground : styles.defaultBackground,
                ]}
              >
                <View
                  style={[
                    styles.middleContainer,
                    seatFilter === "seater" ? styles.seaterBackground : styles.defaultBackground,
                  ]}
                />
                <View
                  style={[
                    styles.innerContainer,
                    seatFilter === "seater" ? styles.seaterBorder : styles.defaultBorder,
                  ]}
                />
                <View
                  style={[
                    styles.leftBar,
                    seatFilter === "seater" ? styles.seaterBorder : styles.defaultBorder,
                  ]}
                />
                <View
                  style={[
                    styles.rightBar,
                    seatFilter === "seater" ? styles.seaterBorder : styles.defaultBorder,
                  ]}
                />
              </TouchableOpacity>
            )}
      
            {/* Sleeper Seat */}
            {seatFilter === "sleeper" && (
              <TouchableOpacity
                style={[
                  styles.sleeperContainer,
                  seatFilter === "sleeper" ? styles.sleeperBackground : styles.defaultBackground,
                ]}
              >
                <View
                  style={[
                    styles.sleeperInner,
                    seatFilter === "sleeper" ? styles.sleeperBarActive : styles.sleeperBarInactive,
                  ]}
                />
              </TouchableOpacity>
            )}
          </>
        );
      };

    return (
        <SafeAreaView style={styles.container}>
            <ImageBackground source={require('../../assets/appBackgroundImage.png')} style={styles.fullScreenBackground}>

                <View style={styles.bgView}>

                    <View style={styles.navigationView}>
                        <ImageBackground
                            source={require('../../assets/HeadBg.png')}
                            style={styles.topImageBg}
                            imageStyle={{
                                resizeMode: 'cover',
                            }}>
                            <TouchableOpacity
                                style={styles.backBtn}
                                onPress={() => navigation.goBack()}>
                                <View style={{ flex: 1, justifyContent: 'center' }}>
                                    <Svg style={{ width: 30, height: 30, borderRadius: 100 }}>
                                        <BackWhite width="100%" height="100%" />
                                    </Svg>
                                </View>
                            </TouchableOpacity>
                            <View style={styles.topViewTitle}>
                                <Text style={styles.topTitle}>TBS TbsWallet</Text>
                            </View>
                        </ImageBackground>
                    </View>
<View style={{backgroundColor:'red',width:400,height:600,padding:0}}>
<View style={{flex:1}}>
<TouchableOpacity
                style={[
                  styles.outerContainer,
                   styles.seaterBackground, ,
                ]}
              >
                <View
                  style={[
                    styles.middleContainer,
                   styles.seaterBackground ,
                  ]}
                />
                <View
                  style={[
                    styles.innerContainer,
                    styles.seaterBorder ,
                  ]}
                />
                <View
                  style={[
                    styles.leftBar,
                     styles.seaterBorder ,
                  ]}
                />
                <View
                  style={[
                    styles.rightBar,
                     styles.seaterBorder ,
                  ]}
                />
              </TouchableOpacity>
              
</View>
<View style={{flex:1}}>
<TouchableOpacity
                style={[
                  styles.outerContainer,
                   styles.seaterBackground, ,
                ]}
              >
                <View
                  style={[
                    styles.middleContainer,
                   styles.seaterBackground ,
                  ]}
                />
                <View
                  style={[
                    styles.innerContainer,
                    styles.seaterBorder ,
                  ]}
                />
                <View
                  style={[
                    styles.leftBar,
                     styles.seaterBorder ,
                  ]}
                />
                <View
                  style={[
                    styles.rightBar,
                     styles.seaterBorder ,
                  ]}
                />
              </TouchableOpacity>
              
</View>

</View>
                   







                </View>
            </ImageBackground>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#1F487C',
    },
    bgView: {
        flex: 1,
        backgroundColor: '#E5FFF1'
    },
    backBtn: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    navigationView: {
        width: '100%',
        padding: 5,
        flexDirection: 'row',
        backgroundColor: '#1F487C',
    },
    topImageBg: {
        width: '100%',
        height: 40,
        flexDirection: 'row',
        paddingHorizontal: 5,
        overflow: 'hidden',
        position: 'relative',
        bottom: 5,
    },
    topImageBg1: {

        height: 110,
        flexDirection: 'row',

    },
    backBtn: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    topViewTitle: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0)',
        marginRight: 30,
    },
    topTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'right',
        color: 'white',
    },

      /* Shared Seater Styles */
  outerContainer: {
    borderTopWidth: 1,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    height: 5,
    width: 18,
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
   

  },
  middleContainer: {
    borderBottomWidth: 1,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    height: 20,
    width: 20,
    position: 'absolute',
    top: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  innerContainer: {
    borderBottomWidth: 1,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    height: 15,
    width: 15,
    position: 'absolute',
    top: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  leftBar: {
    borderTopWidth: 1,
    width: 3,

    position: 'absolute',
    top: 4,
    left: -1,
  },
  rightBar: {
    borderTopWidth: 1,
    width: 3,
    position: 'absolute',
    top: 4,
    right: -2,
  },
  seaterBackground: {
    backgroundColor: 'white',
    borderColor: '#1F487C',
  },
  defaultBackground: {
    backgroundColor: '#1F487C',
    borderColor: 'white',
  },
  seaterBorder: {
    borderColor: '#1F487C',
  },
  defaultBorder: {
    borderColor: 'white',
  },

  /* Sleeper Styles */
  sleeperContainer: {
    borderWidth: 0.1,
    height: 2,
    width: 1,
    borderRadius: 0.1,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    cursor: 'pointer',
  },
  sleeperInner: {
    width: 0.5,
    height: 0.2,
    position: 'absolute',
    bottom: 0.3,
    borderRadius: 0.1,
  },
  sleeperBackground: {
    backgroundColor: 'white',
    borderColor: '#1F487C',
  },
  sleeperBarActive: {
    backgroundColor: '#1F487C',
    borderColor: '#1F487C',
  },
  sleeperBarInactive: {
    backgroundColor: 'white',
    borderColor: 'white',
  },
});

export default TbsWallet;