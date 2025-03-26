import React, { useEffect, useState } from "react";
import { View, Text, FlatList, ActivityIndicator } from "react-native";
import axios from "axios";
import { parseString } from "react-native-xml2js"; // ✅ Correct import
import {useRoute} from '@react-navigation/native';

const FakeListScreen = () => {
  const [busData, setBusData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); // ✅ Define error state
  const [filterData, setFilterData] = useState([]); // ✅ Define filter data state
  const route = useRoute();
  const From_Station = route.params?.Source_Ids;

  useEffect(() => {
    fetchBusData();
  }, []);

  const fetchBusData = async () => {
    console.log("Fetching bus data...");
    setLoading(true);
    setError(null);

    const url = "https://staging.abhibus.com/abhiWebServer";

    const soapRequest = `<?xml version="1.0" encoding="utf-8"?>
    <soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
      <soap:Body>
        <tns:GetAvailableServicesV5 xmlns:tns="http://www.abhibus.com/">
          <tns:operatorId>115008</tns:operatorId>
          <tns:serviceId>string</tns:serviceId>
          <tns:sourceStationId>22</tns:sourceStationId>
          <tns:destinationStationId>5</tns:destinationStationId>
          <tns:journeyDate>2025-03-13</tns:journeyDate>
        </tns:GetAvailableServicesV5>
      </soap:Body>
    </soap:Envelope>`;

    try {
      const response = await axios.post(url, soapRequest, {
        headers: {
          "Content-Type": "text/xml; charset=utf-8",
          SOAPAction: "https://affapi.abhibus.com/GetAvailableServicesV5",
        },
      });

      // ✅ Parse XML Response
      parseString(response.data, { explicitArray: false }, (err, result) => {
        if (err) {
          console.error("XML Parsing Error:", err);
          setError("Failed to parse response.");
          setLoading(false);
          return;
        }

        // ✅ Extract Data from SOAP Response
        const envelope = result["soap:Envelope"] || result["SOAP-ENV:Envelope"];
        const body = envelope["soap:Body"] || envelope["SOAP-ENV:Body"];
        const responseData =
          body["ns1:GetAvailableServicesResponse"]?.["ns1:GetAvailableServicesResult"];

        if (responseData) {
          try {
            const jsonData = JSON.parse(responseData);
            console.log("Parsed Bus Data:", jsonData);
            setBusData(jsonData);
            setFilterData(jsonData);
          } catch (jsonError) {
            console.error("JSON Parsing Error:", jsonError);
            setError("Invalid data format received.");
          }
        } else {
          setError("No bus services found.");
        }

        setLoading(false);
      });
    } catch (error) {
      console.error("Network Error:", error);
      setError("Network error. Please try again.");
      setLoading(false);
    }
  };

  return (
    <View style={{ flex: 1, padding: 20 }}>
      {loading ? (
        <ActivityIndicator size="large" color="blue" />
      ) : error ? (
        <Text style={{ textAlign: "center", marginTop: 20, color: "red" }}>{error}</Text>
      ) : busData.length > 0 ? (
        <FlatList
          data={busData}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <View style={{ padding: 15, borderBottomWidth: 1, borderColor: "#ccc" }}>
              <Text style={{ fontSize: 16, fontWeight: "bold" }}>{item.Start_time}</Text>
              <Text>Service Number: {item.Service_Number}</Text>
              <Text>Operator: {item.TravelTime}</Text>
              <Text></Text>
            </View>
          )}
        />
      ) : (
        <Text style={{ textAlign: "center", marginTop: 20 }}>No buses available.</Text>
      )}
    </View>
  );
};

export default FakeListScreen;
