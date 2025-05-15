import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
  Modal,
  StyleSheet,
  SectionList,
  Image,
  Alert,
} from 'react-native';
import { Svg } from 'react-native-svg';
import backgroundImage from '../assets/home_bg.png';
import { FlatList } from 'react-native-gesture-handler';
// import RadioGroup from 'react-native-radio-buttons-group';
import { useDispatch, useSelector } from 'react-redux';
import { GET_BUS_FILTERS } from '../Redux/Store/Type';
import moment from 'moment';

const SortInsightsScreen = ({ visible, onClose, ticketList,selectedOptions, setSelectedOptions ,selectedIndex, setSelectedIndex }) => {
  // console.log(ticketList, 'TicketList');

  // const [selectCurrentSortName, setSelectCurrentSortName] = useState('Price');
  const [selectCurrentSortName, setSelectCurrentSortName] = useState('Price');
  // const [selectedOptions, setSelectedOptions] = useState({});
  // const [selectedIndex, setSelectedIndex] = useState(0);
  const dispatch = useDispatch();
  const unsortedList = useSelector(
    state => state?.productReducer?.get_bus_list,
  );
  const busNumber = useSelector(
    state => state?.productReducer?.get_buslist_filter,
  );


  console.log(selectCurrentSortName,selectedIndex,selectedOptions,"dorteorjhdfiusdhfsd");
  
  // const handleApply = () => {
  //   if (!selectCurrentSortName) {
  //     Alert.alert('Please sort things');
  //     return;
  //   }

  //   // If a sort is selected, close the modal or do whatever's needed
  //   onClose();
  // };
  const handleApply = () => {
    if (!Object?.values(selectedOptions)[0]) {
      Alert.alert('Please sort things');
      return;
    }

    onClose();
  };


  // console.log(selectedOptions, 'selectedIndex_seleccted');
  // const [radioButtons, setRadioButtons] = useState([
  //   { id: '1', label: 'Option 1', value: 'option1' },
  //   { id: '1', label: 'Option 1', value: 'option1' },
  // ]);
  // // const radioButtons = [
  // //   {id: '1', label: 'Option 1', value: 'option1'},
  // //   {id: '2', label: 'Option 2', value: 'option2'},
  // //   {id: '3', label: 'Option 3', value: 'option3'},
  // // ];

  // const sortListAry = [
  //   {
  //     id: '1',
  //     title: 'Price',
  //     isSelect: false,
  //     data: [
  //       {id: '1', title: 'High to Low', value: '1', Selected: false},
  //       {id: '2', title: 'Low to High', value: '2', Selected: false},
  //     ],
  //   },
  //   {
  //     id: '2',
  //     title: 'Seats',
  //     isSelect: false,
  //     data: [
  //       {id: '1', title: 'High to Low', value: '1', Selected: false},
  //       {id: '2', title: 'Low to High', value: '2', Selected: false},
  //     ],
  //   },
  //   {
  //     id: '3',
  //     title: 'Start Ratings',
  //     isSelect: false,
  //     data: [
  //       {id: '1', title: 'High to Low', value: '1', Selected: false},
  //       {id: '2', title: 'Low to High', value: '2', Selected: false},
  //     ],
  //   },
  //   {
  //     id: '4',
  //     title: 'Arrival Time',
  //     isSelect: false,
  //     data: [
  //       {id: '1', title: 'Earliest to Latest', value: '1', Selected: false},
  //       {id: '2', title: 'Latest to Earliest', value: '2', Selected: false},
  //     ],
  //   },
  //   {
  //     id: '5',
  //     title: 'Departure Time',
  //     isSelect: false,
  //     data: [
  //       {id: '1', title: 'Earliest to Latest', value: '1', Selected: false},
  //       {id: '2', title: 'Latest to Earliest', value: '2', Selected: false},
  //     ],
  //   },
  // ];

  // useEffect(() => {
  //   let SortedList = ticketList || [];

  //   if (Object.keys(selectedOptions)[0] === "Price") {

  //   }
  // }, []);
  // console.log(Object.keys(selectedOptions)[0],"i am innn");

  const sortListAry = [
    {
      id: '1',
      title: 'Price',
      isSelect: false,
      data: [
        { id: '1', title: 'High to Low', value: '1', Selected: false },
        { id: '2', title: 'Low to High', value: '2', Selected: false },
      ],
    },
    {
      id: '2',
      title: 'Seats',
      isSelect: false,
      data: [
        { id: '1', title: 'High to Low', value: '1', Selected: false },
        { id: '2', title: 'Low to High', value: '2', Selected: false },
      ],
    },
    // {
    //   id: '3',
    //   title: 'Start Ratings',
    //   isSelect: false,
    //   data: [
    //     {id: '1', title: 'High to Low', value: '1', Selected: false},
    //     {id: '2', title: 'Low to High', value: '2', Selected: false},
    //   ],
    // },
    {
      id: '4',
      title: 'Arrival Time',
      isSelect: false,
      data: [
        { id: '1', title: 'Earliest to Latest', value: '1', Selected: false },
        { id: '2', title: 'Latest to Earliest', value: '2', Selected: false },
      ],
    },
    {
      id: '5',
      title: 'Departure Time',
      isSelect: false,
      data: [
        { id: '1', title: 'Earliest to Latest', value: '1', Selected: false },
        { id: '2', title: 'Latest to Earliest', value: '2', Selected: false },
      ],
    },
  ];

  const handleSelectOption = (category_title, option_title) => {
    setSelectedOptions(prev => ({
      // ...prev,
      [category_title]:
        prev[category_title] === option_title ? null : option_title, // Toggle selection
    }));
  };

  const Separator = () => <View style={styles.separator} />;

  function SortMainRowView({ item, index, LastCount }) {
    return (
      <TouchableOpacity
        onPress={() => {
          setSelectedIndex(index);
          setSelectCurrentSortName(item.title);
        }}>
        <View
          style={[
            {
              flex: 1,
              flexDirection: 'row',
              borderBottomWidth: 0.9,
              borderColor: '#1F487C',
              borderBottomEndRadius:
                LastCount === index && selectCurrentSortName !== item?.keyValue
                  ? 20
                  : 0,

              height: 50,
            },
            selectCurrentSortName === item?.title
              ? {
                borderRightWidth: 0.0,
                backgroundColor: 'rgba(52, 52, 52, 0.0)',
              }
              : {
                borderRightWidth: 0.9,
                backgroundColor: 'rgba(255, 255, 255, 0.5)',
              },
          ]}>
          {selectCurrentSortName === item?.title && (
            <View
              style={{
                backgroundColor: '#1F487C',
                height: '100%',
                width: 8,
              }}></View>
          )}
          <Text
            style={[
              {
                alignSelf: 'center',
                fontFamily: 'Inter',
                textAlign: 'justify',
              },
              selectCurrentSortName === item?.title
                ? {
                  color: '#1F487C',
                  fontWeight: '600',
                  fontSize: 14,
                  lineHeight: 18,
                  paddingHorizontal: 10,
                }
                : {
                  color: '#393939',
                  fontWeight: '400',
                  fontSize: 13,
                  lineHeight: 16,
                  paddingHorizontal: 15,
                },
            ]}>
            {item.title}
          </Text>
        </View>
      </TouchableOpacity>
    );
  }
  function SortingSubRowView({
    item,
    section,
    selectedOptions,
    handleSelectOption,
  }) {
    return (
      <TouchableOpacity
        onPress={() => handleSelectOption(section?.title, item?.title)}
        style={{ padding: 10 }}>
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <Text
            style={{
              fontWeight: '400',
              fontSize: 16,
              fontFamily: 'Inter',
              color: '#1F487C',
              lineHeight: 20,
            }}>
            {item.title}
          </Text>

          {/* Custom Radio Button */}
          <View style={styles.radioButtonContainer}>
            <View style={styles.outerCircle}>
              <View
                style={[
                  styles.innerCircle,
                  selectedOptions[section?.title] === item?.title
                    ? styles.innerCircleSelected
                    : styles.innerCircleUnselected,
                ]}
              />
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  }

  // useEffect(() => {
  //   const getSortedList = () => {
  //     console.log(selectedOptions, 'is_selectedOptions')
  //     if (!selectedOptions || Object.keys(selectedOptions).length === 0) {
  //       // If selectedOptions is empty, return early or set some default behavior
  //       console.log('selectedOptions is empty');
  //       return; // Prevent further execution if selectedOptions is empty
  //     }
  //     const category = Object.keys(selectedOptions)[0]; // Get the selected category
  //     console.log(category, 'category');

  //     const option = selectedOptions[category]; // Get the selected sorting option
  //     let newList = [...ticketList];
  //     if (category?.toLowerCase() === 'price') {
  //       if (option === 'High to Low') {
  //         newList.sort((a, b) => b?.Fare - a?.Fare);
  //       } else if (option === 'Low to High') {
  //         newList.sort((a, b) => a?.Fare - b?.Fare);
  //       }
  //     }
  //     if (category?.toLowerCase() === 'seats') {
  //       if (option === 'High to Low') {
  //         newList.sort(
  //           (a, b) => Number(b?.available_seats) - Number(a?.available_seats),
  //         );
  //       } else if (option === 'Low to High') {
  //         newList.sort(
  //           (a, b) => Number(a?.available_seats) - Number(b?.available_seats),
  //         );
  //       }
  //     }
  //     if (category?.toLowerCase() === 'arrival time') {
  //       if (option === 'Earliest to Latest') {
  //         newList.sort((a, b) => {
  //           const timeA = moment(a?.Arr_Time, 'hh:mm A')?.valueOf(); // Convert to timestamp
  //           const timeB = moment(b?.Arr_Time, 'hh:mm A')?.valueOf();
  //           return timeA - timeB; // Sort in ascending order (Earliest first)
  //         });
  //       } else if (option === 'Latest to Earliest') {
  //         newList.sort((a, b) => {
  //           const timeA = moment(a?.Arr_Time, 'hh:mm A')?.valueOf();
  //           const timeB = moment(b?.Arr_Time, 'hh:mm A')?.valueOf();
  //           return timeB - timeA; // Sort in descending order (Latest first)
  //         });
  //       }
  //     }

  //     if (category?.toLowerCase() === 'departure time') {
  //       if (option === 'Earliest to Latest') {
  //         newList.sort((a, b) => {
  //           const timeA = moment(a?.Start_time, 'hh:mm A')?.valueOf();
  //           const timeB = moment(b?.Start_time, 'hh:mm A')?.valueOf();
  //           return timeA - timeB;
  //         });
  //       } else if (option === 'Latest to Earliest') {
  //         newList.sort((a, b) => {
  //           const timeA = moment(a?.Start_time, 'hh:mm A')?.valueOf();
  //           const timeB = moment(b?.Start_time, 'hh:mm A')?.valueOf();
  //           return timeB - timeA; // Sort in descending order (Latest first)
  //         });
  //       }
  //     }
  //     dispatch({ type: GET_BUS_FILTERS, payload: newList });
  //   };

  //   getSortedList();
  // }, [selectedOptions]);





  
  // Runs when selectedOptions or sortListAry changes
  // console.log(unsortedList,"unsorted");

  // const clearFilter = () => {
  //   dispatch({type: GET_BUS_FILTERS, payload: unsortedList});
  // };
  const clearFilter = () => {
    setSelectCurrentSortName('Price'); // Reset sort to default
    setSelectedOptions({}); // Clear all filters
    setSelectedIndex(0); // Reset index (if needed)
    // dispatch({ type: GET_BUS_FILTERS, payload: unsortedList }); // Dispatch unsorted list
  };

  //   const clearFilter = () => {
  //   setSelectCurrentSortName(''); // or set to default like 'Price'
  //   // Do NOT dispatch the unsortedList again if the list should stay as-is
  // };

  const renderViewSectionHeader = ({ section }) => {
    return (
      <View
        style={{
          padding: 10,
        }}>
        <Text
          style={{
            fontWeight: '600',
            fontSize: 16,
            fontFamily: 'Inter',
            color: '#1F487C',
            lineHeight: 18,
          }}>
          {section.title}
        </Text>
      </View>
    );
  };
  const renderViewSectionFooter = ({ section }) => {
    return (
      <View
        style={{
          paddingHorizontal: 15,
          paddingVertical: 5,
          justifyContent: 'center',
          alignItems: 'flex-start',
        }}>
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            borderRadius: 15,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#1F487C',
            paddingHorizontal: 10,
            height: 33,
          }}>
          {/* <Text
            style={{
              fontWeight: '400',
              fontSize: 15,
              fontFamily: 'Inter',
              color: '#FFFFFF',
              lineHeight: 17,
            }}>
            {'20 Buses'}
          </Text> */}
          <Text style={{ color: 'white', fontWeight: '800' }}>
            {busNumber?.length === 1 ? '1 BUS' : `${busNumber?.length} BUSES`}
          </Text>

          <Image
            source={require('../assets/ArrowRight.gif')}
            style={{
              width: 18,
              height: 24,
              marginLeft: 2,
              transform: [{ rotate: '-90deg' }],
            }}
          />
        </View>
      </View>
    );
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}>
      <View
        style={{
          flex: 1,
          backgroundColor: 'rgba(0, 0, 0, 0.2)',
          justifyContent: 'flex-end',
          alignItems: 'center',
        }}>
        <TouchableOpacity
          style={{ flex: 1, width: '100%' }}
          onPress={onClose}></TouchableOpacity>
        <View
          style={{
            width: '100%',
            maxHeight: '70%',
            backgroundColor: '#E5FFF1',
            borderTopRightRadius: 20,
            borderTopLeftRadius: 20,
            position: 'absolute', //Here is the trick
            bottom: 0, //Here is the trick
          }}>
          <ImageBackground
            source={backgroundImage}
            style={{ flex: 1, resizeMode: 'cover', height: '100%' }}>
            <View style={{ alignItems: 'center', margin: 10 }}>
              <Text
                style={{
                  color: '#1F487C',
                  textAlign: 'center',
                  fontSize: 22,
                  fontFamily: 'Montserrat',
                  fontWeight: '600',
                }}>
                {'Sort Insights'}
              </Text>
            </View>
            <Separator />
            <View style={{ flexDirection: 'row', flex: 1 }}>
              <View style={{ width: '40%', height: '100%' }}>
                <FlatList
                  data={sortListAry}
                  renderItem={({ item, index }) => {
                    return (
                      <SortMainRowView
                        item={item}
                        index={index}
                        LastCount={sortListAry?.length - 1}
                      />
                    );
                  }}
                  keyExtractor={(item, index) => item + index}
                />
              </View>
              <View
                style={{
                  width: '60%',
                  height: '100%',
                  paddingHorizontal: 10,
                  paddingVertical: 8,
                }}>
                <SectionList
                  sections={[sortListAry[selectedIndex]]}
                  keyExtractor={(item, index) => item?.id + index} // Fix keyExtractor
                  renderItem={({ item, index, section }) => (
                    <SortingSubRowView
                      item={item}
                      index={index}
                      section={section}
                      selectedOptions={selectedOptions} // Pass selectedOptions
                      handleSelectOption={handleSelectOption} // Pass function to update selection
                    />
                  )}
                  renderSectionHeader={renderViewSectionHeader}
                  renderSectionFooter={renderViewSectionFooter}
                  stickySectionHeadersEnabled
                  stickyHeaderHiddenOnScroll
                />
              </View>
            </View>
            <View style={styles.buttonView}>
              <TouchableOpacity onPress={clearFilter} style={styles.clearBtn}>
                <Text style={styles.clearTxt}>CLEAR</Text>
              </TouchableOpacity>
              {/* <TouchableOpacity
                onPress={handleApply}
                disabled={!selectCurrentSortName} // disables interaction when empty
                style={[
                  styles.applyBtn,
                  {
                    backgroundColor: selectCurrentSortName
                      ? '#1F487C'
                      : '#cccccc',
                  },
                ]}>
                <Text style={styles.apply}>APPLY</Text>
              </TouchableOpacity> */}
              {/* <TouchableOpacity
                onPress={handleApply}
                disabled={!selectCurrentSortName} // disables the button if nothing selected
                style={[
                  styles.applyBtn,
                  {
                    backgroundColor: selectCurrentSortName
                      ? '#1F487C'
                      : '#cccccc',
                  },
                ]}>
                <Text style={styles.applyText}>APPLY</Text>
              </TouchableOpacity> */}
              {/* <TouchableOpacity
                onPress={handleApply}
                disabled={!selectCurrentSortName}
                style={[
                  styles.applyBtn,
                  {
                    backgroundColor: selectCurrentSortName
                      ? '#1F487C'
                      : '#cccccc',
                    borderColor: selectCurrentSortName
                      ? 'rgba(31, 72, 124, 0.5)'
                      : '#999',
                  },
                ]}>
                <Text
                  style={[
                    styles.apply,
                    {
                      color: selectCurrentSortName ? '#FFFFFF' : '#EEEEEE', // slightly dim when disabled
                    },
                  ]}>
                  APPLY
                </Text>
              </TouchableOpacity> */}
              <TouchableOpacity
                onPress={handleApply}
                disabled={!Object?.values(selectedOptions)[0]}
                style={[
                  styles.applyBtn,
                  {
                    backgroundColor: Object?.values(selectedOptions)[0]
                      ? '#1F487C'
                      : '#cccccc',
                    borderColor: Object?.values(selectedOptions)[0]
                      ? 'rgba(31, 72, 124, 0.5)'
                      : '#999',
                  },
                ]}>
                <Text
                  style={[
                    styles.apply,
                    {
                      color: Object.values(selectedOptions)[0]
                        ? '#FFFFFF'
                        : '#EEEEEE',
                    },
                  ]}>
                  APPLY
                </Text>
              </TouchableOpacity>
            </View>
          </ImageBackground>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  separator: {
    marginVertical: 1,
    borderBottomColor: '#1F487C',
    borderBottomWidth: 1,
  },
  applyBtn: {
    backgroundColor: '#1F487C',
    width: '40%',
    borderRadius: 24,
    borderWidth: 1,
    borderColor: 'rgba(31, 72, 124, 0.5)',
  },
  clearBtn: {
    backgroundColor: '#FFFFFF',
    width: '40%',
    borderRadius: 24,
    borderWidth: 1,
    borderColor: 'rgba(31, 72, 124, 0.5)',
  },
  buttonView: {
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20,
    marginTop: 10,
  },
  clearTxt: {
    color: '#1F487C',
    fontSize: 16,
    fontFamily: 'Inter',
    textAlign: 'center',
    fontWeight: '600',
    padding: 10,
  },
  apply: {
    color: '#FFFFFF',
    fontSize: 16,
    fontFamily: 'Inter',
    textAlign: 'center',
    fontWeight: '600',
    padding: 10,
  },
  radioButtonContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  outerCircle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#1F487C',
    alignItems: 'center',
    justifyContent: 'center',
  },
  innerCircle: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  innerCircleSelected: {
    backgroundColor: '#1F487C',
  },
  innerCircleUnselected: {
    backgroundColor: 'transparent',
  },
});
export default SortInsightsScreen;
