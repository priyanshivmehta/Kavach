import React, { useRef, useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Animated,
  Image,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

const HomeScreen = ({ navigation }) => {
  const pulse1 = useRef(new Animated.Value(1)).current;
  const pulse2 = useRef(new Animated.Value(1)).current;

  const [authState, setAuthState] = useState("signup"); 
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    dob: "",
    gender: "",
    country: "",
    state: "",
    city: "",
    pincode: "",
    termsAccepted: false,
  });

  const isFormValid = () => {
    const {
      name,
      email,
      password,
      confirmPassword,
      dob,
      gender,
      country,
      state,
      city,
      pincode,
      termsAccepted,
    } = userData;

    return (
      name &&
      email &&
      password &&
      confirmPassword &&
      dob &&
      gender &&
      country &&
      state &&
      city &&
      pincode &&
      termsAccepted &&
      password === confirmPassword
    );
  };

  const handleSignup = () => {
    if (!isFormValid()) {
      alert("Please fill in all fields correctly.");
      return;
    }
    console.log("User Data:", userData);
    setAuthState("home"); // Redirect to homepage
  };

  const handleLogin = () => {
    if (userData.email && userData.password) {
      console.log("User logged in:", userData);
      setAuthState("home"); // Redirect to homepage
    } else {
      alert("Please enter valid login credentials.");
    }
  };

  const handleSOS = () => {
    console.log("SOS Alert Sent!");
  };

  const handleReportIncident = () => {
    console.log("Report Incident Button Pressed!");
  };

  useEffect(() => {
    const pulseAnimation = (animatedValue, delay = 0) => {
      Animated.loop(
        Animated.sequence([
          Animated.timing(animatedValue, {
            toValue: 2,
            duration: 1500,
            delay: delay,
            useNativeDriver: true,
          }),
          Animated.timing(animatedValue, {
            toValue: 1,
            duration: 0,
            useNativeDriver: true,
          }),
        ])
      ).start();
    };

    pulseAnimation(pulse1, 0);
    pulseAnimation(pulse2, 750);
  }, []);

  if (authState === "signup") {
    return (
      <View style={styles.container}>
        <Text style={styles.authTitle}>Sign Up</Text>
        <TextInput
          style={styles.input}
          placeholder="Name"
          value={userData.name}
          onChangeText={(text) => setUserData({ ...userData, name: text })}
        />
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={userData.email}
          onChangeText={(text) => setUserData({ ...userData, email: text })}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          secureTextEntry
          value={userData.password}
          onChangeText={(text) => setUserData({ ...userData, password: text })}
        />
        <TextInput
          style={styles.input}
          placeholder="Confirm Password"
          secureTextEntry
          value={userData.confirmPassword}
          onChangeText={(text) =>
            setUserData({ ...userData, confirmPassword: text })
          }
        />
        <TextInput
          style={styles.input}
          placeholder="Date of Birth (YYYY-MM-DD)"
          value={userData.dob}
          onChangeText={(text) => setUserData({ ...userData, dob: text })}
        />
        <TextInput
          style={styles.input}
          placeholder="Gender"
          value={userData.gender}
          onChangeText={(text) => setUserData({ ...userData, gender: text })}
        />
        <TextInput
          style={styles.input}
          placeholder="Country"
          value={userData.country}
          onChangeText={(text) => setUserData({ ...userData, country: text })}
        />
        <TextInput
          style={styles.input}
          placeholder="State"
          value={userData.state}
          onChangeText={(text) => setUserData({ ...userData, state: text })}
        />
        <TextInput
          style={styles.input}
          placeholder="City"
          value={userData.city}
          onChangeText={(text) => setUserData({ ...userData, city: text })}
        />
        <TextInput
          style={styles.input}
          placeholder="Pincode"
          value={userData.pincode}
          keyboardType="numeric"
          onChangeText={(text) => setUserData({ ...userData, pincode: text })}
        />
        <View style={styles.checkboxContainer}>
          <TouchableOpacity
            onPress={() =>
              setUserData({ ...userData, termsAccepted: !userData.termsAccepted })
            }
          >
            <View
              style={[styles.checkbox, userData.termsAccepted && styles.checkboxChecked]}
            />
          </TouchableOpacity>
          <Text style={styles.checkboxText}>I agree to the Terms and Conditions</Text>
        </View>
        <TouchableOpacity
          style={[styles.authButton, !isFormValid() && styles.disabledButton]}
          onPress={handleSignup}
          disabled={!isFormValid()}
        >
          <Text style={styles.authButtonText}>Sign Up</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setAuthState("login")}>
          <Text style={styles.switchText}>Already have an account? Login</Text>
        </TouchableOpacity>
      </View>
    );
  }

  if (authState === "login") {
    return (
      <View style={styles.container}>
        <Text style={styles.authTitle}>Login</Text>
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={userData.email}
          onChangeText={(text) => setUserData({ ...userData, email: text })}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          secureTextEntry
          value={userData.password}
          onChangeText={(text) => setUserData({ ...userData, password: text })}
        />
        <TouchableOpacity style={styles.authButton} onPress={handleLogin}>
          <Text style={styles.authButtonText}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setAuthState("signup")}>
          <Text style={styles.switchText}>Don't have an account? Sign Up</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={[styles.header, styles.shadow]}>
        <View style={styles.headerTextContainer}>
          <Text style={styles.welcomeText}>Welcome!</Text>
          <Text style={styles.userName}>User</Text>
          <Text style={styles.greetingText}>Your Shield in Every Step</Text>
        </View>
      </View>

      <View style={[styles.actionContainer, styles.shadow]}>
        <View style={styles.sosContainer}>
          <View style={styles.radiationContainer}>
            <Animated.View
              style={[
                styles.radiationCircle,
                {
                  transform: [{ scale: pulse1 }],
                  opacity: pulse1.interpolate({
                    inputRange: [1, 2],
                    outputRange: [0.5, 0],
                  }),
                },
              ]}
            />
            <Animated.View
              style={[
                styles.radiationCircle,
                {
                  transform: [{ scale: pulse2 }],
                  opacity: pulse2.interpolate({
                    inputRange: [1, 2],
                    outputRange: [0.5, 0],
                  }),
                },
              ]}
            />
            <TouchableOpacity style={styles.sosButton} onPress={handleSOS}>
              <Text style={styles.sosText}>SOS</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.locationContainer}>
          {/* <Image
            source={require("../../assets/images/location.png")}
            style={styles.locationIcon}
          /> */}
          <View style={styles.locationDetails}>
            <Text style={styles.areaText}>Location: Bandra, Mumbai</Text>
            <Text style={styles.safetyRatingText}>Area Safety Rating: 7/10</Text>
          </View>
        </View>
      </View>

      {/* Buttons with Icons, arranged as per the request */}
      <View style={[styles.reportAndSafeContainer, styles.shadow]}>
        <View style={styles.rowContainer}>
          <TouchableOpacity
            style={styles.reportIncidentButton}
            onPress={() => navigation.navigate("Report")}
          >
            <View style={styles.buttonTextContainer}>
              <Icon name="exclamation-circle" size={20} color="#F2F4F3" />
              <Text style={styles.buttonText}>Report Incident</Text>
            </View>
          </TouchableOpacity>

          {/* Centering Awareness Button */}
          <TouchableOpacity
            style={styles.awarenessButton}
            onPress={() => navigation.navigate("Awareness")}
          >
            <View style={styles.buttonTextContainer}>
              <Icon name="bullhorn" size={20} color="#F2F4F3" /> {/* Updated Icon */}
              <Text style={styles.buttonText}>Awareness</Text>
            </View>
          </TouchableOpacity>
        </View>

        <View style={styles.rowContainer}>
          <TouchableOpacity
            style={styles.helplineButton}
            onPress={() => navigation.navigate("Helpline")}
          >
            <View style={styles.buttonTextContainer}>
              <Icon name="phone" size={20} color="#F2F4F3" />
              <Text style={styles.buttonText}>Helpline</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.safetyInsiderButton}
            onPress={() => navigation.navigate("SafetyInsider")}
          >
            <View style={styles.buttonTextContainer}>
              <Icon name="shield" size={20} color="#F2F4F3" />
              <Text style={styles.buttonText}>Safety Insider</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#F2F4F3" },
  header: {
    padding: 20,
    backgroundColor: "#8B183F",
    borderRadius: 10,
    marginBottom: 20,
  },
  shadow: {
    shadowColor: "#ddd",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 5,
  },
  headerTextContainer: { alignItems: "flex-start" },
  welcomeText: { fontSize: 20, color: "#F2F4F3" },
  userName: { fontSize: 24, fontWeight: "bold", color: "#F2F4F3" },
  greetingText: { fontSize: 16, color: "#F2F4F3", marginTop: 10 },
  actionContainer: { marginTop: 20 },
  sosContainer: { alignItems: "center", marginBottom: 50, marginTop: 20 },
  radiationContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 20,
  },
  radiationCircle: {
    position: "absolute",
    height: 100,
    width: 100,
    borderRadius: 60,
    backgroundColor: "rgba(255, 0, 0, 0.3)",
  },
  sosButton: {
    backgroundColor: "#AB0D0D",
    height: 120,
    width: 120,
    borderRadius: 60,
    alignItems: "center",
    justifyContent: "center",
  },
  sosText: { color: "#F2F4F3", fontSize: 20, fontWeight: "bold" },
  locationContainer: {
    flexDirection: "row",
    justifyContent: "center",  // Centers the items horizontally
    alignItems: "center",  // Centers the items vertically
    marginTop: 10,
    marginBottom: 24,
  },
  locationIcon: { width: 30, height: 30, marginRight: 10 },
  locationDetails: {
    justifyContent: "center",
    alignItems: "center",  // Centers the text inside the container
  },
  areaText: {
    fontSize: 20,  // Increased text size
    fontWeight: "bold",
    color: "black",
    textAlign: "center",  // Ensures the text is centered within the container
  },
  safetyRatingText: {
    fontSize: 18,  // Increased text size
    color: "black",
    textAlign: "center",  // Centers the safety rating text
  },
  reportAndSafeContainer: { marginTop: 20 },
  rowContainer: { flexDirection: "row", justifyContent: "space-between", marginBottom: 15,height:130, },
  reportIncidentButton: { paddingVertical: 15, paddingHorizontal: 30, backgroundColor: "#8B183F", borderRadius: 10, flex: 1, marginRight: 10 },
  awarenessButton: { paddingVertical: 15, paddingHorizontal: 30, backgroundColor: "#8B183F", borderRadius: 10, flex: 1, justifyContent: "center", alignItems: "center" },
  helplineButton: { paddingVertical: 15, paddingHorizontal: 30, backgroundColor: "#8B183F", borderRadius: 10, flex: 1, marginRight: 10 },
  safetyInsiderButton: { paddingVertical: 15, paddingHorizontal: 30, backgroundColor: "#8B183F", borderRadius: 10, flex: 1, marginLeft: 10 },
  buttonTextContainer: { flexDirection: "row", alignItems: "center", justifyContent: "center" },
  buttonText: { fontSize: 16, color: "#F2F4F3", fontWeight: "bold", marginLeft: 10 },
  authTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  authButton: {
    backgroundColor: "#007BFF",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    marginTop: 10,
  },
  authButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  switchText: {
    color: "#007BFF",
    textAlign: "center",
    marginTop: 15,
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 1,
    borderColor: "#ccc",
    marginRight: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  checkboxChecked: {
    backgroundColor: "#007BFF",
  },
  checkboxText: {
    fontSize: 14,
  },
  disabledButton: {
    backgroundColor: "#ccc",
  },

});

export default HomeScreen;
