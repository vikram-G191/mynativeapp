import React, { useState } from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";

const SeatSelector = () => {
  const [seatFilter, setSeatFilter] = useState("sleeper");

  return (
    <View style={styles.container}>
      {/* Sleeper */}
      <TouchableOpacity
        style={[
          styles.sleeper,
          seatFilter === "sleeper" ? styles.sleeperSelected : styles.sleeperDefault
        ]}
        onPress={() => setSeatFilter("sleeper")}
      >
        <View
          style={[
            styles.sleeperInner,
            seatFilter === "sleeper" ? styles.sleeperInnerSelected : styles.sleeperInnerDefault
          ]}
        />
      </TouchableOpacity>

      {/* Seater */}
      <TouchableOpacity
        style={[
          styles.seater,
          seatFilter === "seater" ? styles.seaterSelected : styles.seaterDefault
        ]}
        onPress={() => setSeatFilter("seater")}
      >
        <View style={styles.seaterStructure}>
          <View
            style={[
              styles.seaterHead,
              seatFilter === "seater" ? styles.seaterHeadSelected : styles.seaterHeadDefault
            ]}
          />
          <View
            style={[
              styles.seaterBody,
              seatFilter === "seater" ? styles.seaterBodySelected : styles.seaterBodyDefault
            ]}
          />
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  /* Sleeper styles */
  sleeper: {
    width: 40,
    height: 80,
    borderRadius: 5,
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
    margin: 10,
  },
  sleeperSelected: {
    borderColor: "#1F487C",
    backgroundColor: "#FFFFFF",
  },
  sleeperDefault: {
    borderColor: "#FFFFFF",
    backgroundColor: "#1F487C",
  },
  sleeperInner: {
    width: 20,
    height: 10,
    position: "absolute",
    bottom: 10,
    borderRadius: 2,
    borderWidth: 1,
  },
  sleeperInnerSelected: {
    borderColor: "#1F487C",
    backgroundColor: "#1F487C",
  },
  sleeperInnerDefault: {
    borderColor: "#FFFFFF",
    backgroundColor: "#FFFFFF",
  },

  /* Seater styles */
  seater: {
    width: 50,
    height: 100,
    justifyContent: "center",
    alignItems: "center",
    margin: 10,
  },
  seaterSelected: {
    borderColor: "#1F487C",
  },
  seaterDefault: {
    borderColor: "#FFFFFF",
  },
  seaterStructure: {
    justifyContent: "center",
    alignItems: "center",
  },
  seaterHead: {
    width: 50,
    height: 30, // Headrest part
    borderTopLeftRadius: 25, // Rounded top left corner
    borderTopRightRadius: 25, // Rounded top right corner
    borderBottomWidth: 0,
    borderWidth: 2,
    borderColor: "#1F487C", // Same color for both states
    backgroundColor: "#FFFFFF", // Set consistent background
    alignItems: 'center', // Center the content if any
    justifyContent: 'center', // Center the content if any
  },
  seaterBody: {
    width: 50,
    height: 35, // 70% of height (seat body part)
    borderBottomWidth: 5,
    borderLeftWidth: 5,
    borderRightWidth: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  seaterBodySelected: {
    backgroundColor: "#FFFFFF",
    borderColor: "#1F487C",
  },
  seaterBodyDefault: {
    backgroundColor: "#FFFFFF", // White fill
    borderColor: "#1F487C", // Red outer border
    borderBottomWidth: 5, // Bottom border width 5
    borderLeftWidth: 5,    // Left border width 5
    borderRightWidth: 5,   // Right border width 5
    borderTopWidth: 0,     // No top border
    position: 'relative',
  },
});

export default SeatSelector;
