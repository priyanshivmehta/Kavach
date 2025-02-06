
import React from "react";
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity, 
  Linking 
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

const HelplinesPage = () => {
  const helplines = [
    { category: "Emergency Services", numbers: [
        { name: "Police", number: "100" },
        { name: "Ambulance", number: "102" },
        { name: "Fire Department", number: "101" },
      ]
    },
    { category: "Women's Safety", numbers: [
        { name: "Women’s Helpline", number: "181" },
        { name: "National Commission for Women", number: "011-26942369" },
        { name: "Domestic Violence Helpline", number: "1091" },
      ]
    },
    { category: "Mental Health Support", numbers: [
        { name: "AASRA Suicide Prevention", number: "9820466726" },
        { name: "Mental Health Helpline", number: "1800-599-0019" },
      ]
    },
    { category: "Child Protection", numbers: [
        { name: "Childline", number: "1098" },
      ]
    },
    { category: "Senior Citizens", numbers: [
        { name: "Elder Helpline", number: "14567" },
      ]
    },
  ];

  const makeCall = (number) => {
    Linking.openURL(`tel:${number}`);
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.pageTitle}>Helplines</Text>
      {helplines.map((section, index) => (
        <View key={index} style={styles.section}>
          <Text style={styles.sectionTitle}>{section.category}</Text>
          {section.numbers.map((helpline, idx) => (
            <TouchableOpacity 
              key={idx} 
              style={styles.helplineItem}
              onPress={() => makeCall(helpline.number)}
            >
              <View style={styles.helplineTextContainer}>
                <Text style={styles.helplineName}>{helpline.name}</Text>
                <Text style={styles.helplineNumber}>{helpline.number}</Text>
              </View>
              <MaterialIcons 
                name="phone" 
                size={24} 
                color="#8B183F" 
                style={styles.phoneIcon} 
              />
            </TouchableOpacity>
          ))}
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
    paddingHorizontal: 15,
  },
  pageTitle: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#8B183F",
    marginVertical: 20,
    textAlign: "center",
  },
  section: {
    marginBottom: 20,
    backgroundColor: "#FFF",
    borderRadius: 10,
    padding: 15,
    elevation: 3, // For Android shadow
    shadowColor: "#000", // For iOS shadow
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: "600",
    color: "#373F51",
    borderBottomWidth: 1,
    borderBottomColor: "#EEE",
    paddingBottom: 5,
    marginBottom: 10,
  },
  helplineItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#EEE",
  },
  helplineTextContainer: {
    flex: 1,
    marginRight: 10,
  },
  helplineName: {
    fontSize: 18,
    fontWeight: "500",
    color: "#373F51",
  },
  helplineNumber: {
    fontSize: 16,
    color: "#555",
    marginTop: 2,
  },
  phoneIcon: {
    marginLeft: 10,
  },
});

export default HelplinesPage;
