import React, { useState } from "react";
import { 
  View, 
  Text, 
  StyleSheet, 
  Switch, 
  Animated, 
  Button, 
  TextInput, 
  Modal, 
  TouchableOpacity, 
  ScrollView,
  Pressable,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

const SettingsPage = () => {

  const [isLocationShared, setIsLocationShared] = useState(false);
  const [isCameraEnabled, setIsCameraEnabled] = useState(false);
  const [isMicrophoneEnabled, setIsMicrophoneEnabled] = useState(false);
  const [isGalleryAccessAllowed, setIsGalleryAccessAllowed] = useState(false);
  const [slideAnim, setSlideAnim] = useState(new Animated.Value(1000)); // Initial position (offscreen)
  const [modalVisible, setModalVisible] = useState(false);
  const [helpModalVisible, setHelpModalVisible] = useState(false);  // For Get Help Modal
  const [feedbackModalVisible, setFeedbackModalVisible] = useState(false);  // For Feedback Modal
  const [feedbackText, setFeedbackText] = useState("");  // Store feedback text

  // For rating safety
  const [area, setArea] = useState(""); // Area input field
  const [safetyRating, setSafetyRating] = useState(""); // Keeps track of the entered rating

  const [isIntervalBasedUpdateEnabled, setIsIntervalBasedUpdateEnabled] = useState(false);
  const [travelDescription, setTravelDescription] = useState("");
  const [customTimeInterval, setCustomTimeInterval] = useState("");
  const [selectedInterval, setSelectedInterval] = useState(null);

  const toggleLocationSharing = () => setIsLocationShared(!isLocationShared);
  const toggleCamera = () => setIsCameraEnabled(!isCameraEnabled);
  const toggleMicrophone = () => setIsMicrophoneEnabled(!isMicrophoneEnabled);
  const toggleGalleryAccess = () => setIsGalleryAccessAllowed(!isGalleryAccessAllowed);
  const toggleIntervalBasedUpdate = () => setIsIntervalBasedUpdateEnabled((prev) => !prev);
  const toggleModal = () => setModalVisible((prev) => !prev);

  const openSlidePanel = () => {
    Animated.timing(slideAnim, {
      toValue: 0, 
      duration: 300,
      useNativeDriver: true,
    }).start();
    setModalVisible(true);
  };

  const closeSlidePanel = () => {
    Animated.timing(slideAnim, {
      toValue: 1000, 
      duration: 300,
      useNativeDriver: true,
    }).start();
    setModalVisible(false);
  };

  const openHelpModal = () => {
    setHelpModalVisible(true);  // Show Get Help Modal
  };

  const closeHelpModal = () => {
    setHelpModalVisible(false);  // Close Get Help Modal
  };

  const openFeedbackModal = () => {
    setFeedbackModalVisible(true);  // Show Feedback Modal
  };

  const closeFeedbackModal = () => {
    setFeedbackModalVisible(false);  // Close Feedback Modal
  };

  const handleSafetyRatingChange = (text) => {
    if (/^[0-9]*$/.test(text) && (parseInt(text) <= 10)) {
      setSafetyRating(text); // Update safety rating as user types
    }
  };

  const handleFeedbackChange = (text) => {
    setFeedbackText(text);  // Update feedback text as user types
  };

  const handleIntervalSelect = (interval) => {
    setSelectedInterval(interval);
    setCustomTimeInterval(""); // Clear custom input when an interval is selected
  };

  const handleSave = () => {
    console.log("Travel Description:", travelDescription);
    console.log(
      "Update Interval:",
      customTimeInterval || selectedInterval || "Disabled"
    );
    setModalVisible(false); // Close modal after saving
  };


  return (
    <ScrollView style={styles.container}>
      <View style={styles.section}>
        <Text style={[styles.sectionTitle]}>Settings</Text>
      </View>

      {/* Permissions */}
      <View style={styles.section}>
        <View style={styles.option}>
          <Text style={[styles.optionText]}>Enable Camera</Text>
          <Switch
            value={isCameraEnabled}
            onValueChange={toggleCamera}
            trackColor={{ false: "#DDD", true: "#373F51" }}
            thumbColor={isCameraEnabled ? "#ddd" : "#373F51"}
          />
        </View>
        <View style={styles.option}>
          <Text style={[styles.optionText]}>Enable Microphone</Text>
          <Switch
            value={isMicrophoneEnabled}
            onValueChange={toggleMicrophone}
            trackColor={{ false: "#DDD", true: "#373F51" }}
            thumbColor={isMicrophoneEnabled ? "#ddd" : "#373F51"}
          />
        </View>
        <View style={styles.option}>
          <Text style={[styles.optionText]}>Allow Gallery Access</Text>
          <Switch
            value={isGalleryAccessAllowed}
            onValueChange={toggleGalleryAccess}
            trackColor={{ false: "#DDD", true: "#373F51" }}
            thumbColor={isGalleryAccessAllowed ? "#ddd" : "#373F51"}
          />
        </View>
        <View style={styles.option}>
          <Text style={[styles.optionText]}>Enable Location</Text>
          <Switch
            value={isLocationShared}
            onValueChange={toggleLocationSharing}
            trackColor={{ false: "#DDD", true: "#373F51" }}
            thumbColor={isLocationShared ? "#ddd" : "#373F51"}
          />
        </View>
      </View>

      {/* Location Update Interval */}
      <TouchableOpacity style={styles.settingItem} onPress={toggleModal}>
        <Text style={styles.optionText1}>Set Location Update Interval</Text>
        <MaterialIcons name="keyboard-arrow-right" size={24} color="#373F51" />
      </TouchableOpacity>

      
      {/* Modal for Location Update Interval */}
      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={toggleModal}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalHeader}>Set Location Update Interval</Text>

            {/* Toggle for Interval-Based Location Update */}
            <View style={styles.modalToggle}>
              <Text style={styles.settingText}>Enable Interval-Based Updates</Text>
              <Switch
                value={isIntervalBasedUpdateEnabled}
                onValueChange={toggleIntervalBasedUpdate}
                trackColor={{ false: "#ddd", true: "#373F51" }}
                thumbColor={isIntervalBasedUpdateEnabled ? "#ddd" : "#373F51"}
              />
            </View>

            {/* Show options only if enabled */}
            {isIntervalBasedUpdateEnabled && (
              <>
                {/* Travel Description Input */}
                <TextInput
                  style={styles.input}
                  placeholder="Enter a small description about your travel"
                  value={travelDescription}
                  onChangeText={setTravelDescription}
                />

                {/* Custom Time Interval Input */}
                <TextInput
                  style={styles.input}
                  placeholder="Enter custom time interval (minutes)"
                  value={customTimeInterval}
                  keyboardType="numeric"
                  onChangeText={setCustomTimeInterval}
                />

                {/* Interval Selection */}
                <Text style={styles.intervalLabel}>Choose the time interval:</Text>
                <View style={styles.intervalOptions}>
                  {["5 mins", "10 mins", "15 mins"].map((interval) => (
                    <TouchableOpacity
                      key={interval}
                      style={[
                        styles.intervalOption,
                        selectedInterval === interval && styles.selectedOption,
                      ]}
                      onPress={() => handleIntervalSelect(interval)}
                    >
                      <Text
                        style={[
                          styles.optionText,
                          selectedInterval === interval && styles.selectedText,
                        ]}
                      >
                        {interval}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </>
            )}

            {/* Save Button */}
            <Pressable style={styles.saveButton} onPress={handleSave}>
              <Text style={styles.saveButtonText}>Save</Text>
            </Pressable>

            {/* Cancel Button */}
            <Pressable style={styles.cancelButton} onPress={toggleModal}>
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
      {/* Get Help Option with Arrow */}
      <TouchableOpacity style={styles.option} onPress={openHelpModal}>
        <Text style={styles.optionText1}>Get Help</Text>
        <MaterialIcons name="keyboard-arrow-right" size={24} color="#373F51" />
      </TouchableOpacity>

      {/* Safety Rating Section */}
      <View style={styles.section}>
        <Text style={[styles.sectionTitle]}>How Safe Do You Feel in Your Area?</Text>
        <View style={styles.ratingContainer}>
          {/* Input for Area */}
          <View style={styles.ratingItem}>
            <Text style={[styles.ratingLabel]}>Enter Area in Mumbai</Text>
            <TextInput
              style={styles.ratingInput}
              value={area}
              onChangeText={setArea}
              placeholder="Enter area in Mumbai"
            />
          </View>

          {/* Input for Safety Rating */}
          <View style={styles.ratingItem}>
            <Text style={[styles.ratingLabel]}>Safety Rating (out of 10)</Text>
            <TextInput
              style={styles.ratingInput}
              value={safetyRating}
              onChangeText={handleSafetyRatingChange}
              keyboardType="numeric"
              placeholder="Enter a number (1-10)"
              maxLength={2}
            />
          </View>
        </View>
      </View>

      {/* Help Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={helpModalVisible}
        onRequestClose={closeHelpModal}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.helpModal}>
            <Text style={styles.helpTitle}>Emergency Contacts</Text>
            <Text style={styles.helpText}>1. Police: 100</Text>
            <Text style={styles.helpText}>2. Fire Department: 101</Text>
            <Text style={styles.helpText}>3. Ambulance: 102</Text>
            <Text style={styles.helpText}>4. Women's Helpline: 181</Text>
            <Button title="Close" onPress={closeHelpModal} color="#8B183F" />
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
  },
  section: {
    marginVertical: 15,
    paddingHorizontal: 15,
  },
  sectionTitle: {
    fontSize: 25,
    fontWeight: "bold",
    color: "#8B183F",
    marginBottom: 1,
  },
  option: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#D3C4B4",
  },
  optionText: {
    fontSize: 20,
    color: "#373F51",
  },
  optionText1: {
    fontSize: 20,
    color: "#373F51",
    marginLeft: 15,
  },
  ratingContainer: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 15,
    elevation: 3,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
  },
  settingItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#D3D3D3",
  },
  settingText: {
    fontSize: 18,
    color: "#4F4F4F",
  },
  ratingItem: {
    marginBottom: 15,
  },
  ratingLabel: {
    fontSize: 18,
    fontWeight: "600",
    color: "#373F51",
    marginBottom: 5,
  },
  ratingInput: {
    height: 40,
    borderWidth: 1,
    borderColor: "#8B183F",
    borderRadius: 5,
    paddingHorizontal: 10,
    backgroundColor: "#FFF",
    fontSize: 16,
  },  
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  helpModal: {
    width: 300,
    padding: 20,
    backgroundColor: "#FFF",
    borderRadius: 10,
    elevation: 10,
  },
  helpTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 15,
    textAlign: "center",
  },
  helpText: {
    fontSize: 16,
    marginBottom: 10,
  },
  intervalLabel: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#4F4F4F",
    marginBottom: 10,
  },
  intervalOptions: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 20,
  },
  intervalOption: {
    padding: 10,
    borderWidth: 1,
    borderColor: "#8B183F",
    borderRadius: 5,
    color: '#8B183F',
  },
  selectedOption: {
    backgroundColor: "#8B4513",
  },
  selectedText: {
    color: "#FFF",
  },
  saveButton: {
    backgroundColor: "#8B183F",
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 10,
  },
  saveButtonText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "bold",
  },
  cancelButton: {
    backgroundColor: "#D3D3D3",
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: "center",
  },
  cancelButtonText: {
    color: "#4F4F4F",
    fontSize: 16,
  },
  modalContainer: {
    backgroundColor: "#FFF",
    margin: 20,
    padding: 20,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 5,
  },
  modalHeader: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
    color: "#8B183F",
  },
  modalToggle: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
    color: '#8B183F',
  },
  input: {
    borderWidth: 1,
    borderColor: "#D3D3D3",
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
    fontSize: 16,
  },
});

export default SettingsPage;
