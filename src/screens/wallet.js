import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { Card } from "react-native-elements";

export default function WalletPage() {
  return (
    <View style={styles.container}>
      <Card containerStyle={styles.card}>
        <View style={styles.text}>
          <Text style={styles.text}>FOOD COINS</Text>
        </View>
        <View style={styles.text1}>
          <Text style={styles.text1}>15,00€</Text>
        </View>
      </Card>
      <View style={styles.main}>
        <Text style={styles.text2}>Food Coins</Text>
      </View>
      <View style={styles.main1}>
        <Text style={styles.text3}>Recharger vos Food Coins</Text>
      </View>
      <View>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Recharger</Text>
        </TouchableOpacity>
      </View>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  card: {
    width: "90%",
    height: "30%",
    marginTop: -290,
    borderRadius: 10,
    borderColor: "#fff",
    borderWidth: 1,
    backgroundColor: "#FF3C6E",
    elevation: 0,
  },
  text: {
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 18,
    color: "#fff",
  },
  text1: {
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 38,
    color: "#fff",
    marginTop: 10,
  },
  text2: {
    textAlign: "left",
    fontWeight: "bold",
    fontSize: 18,
    color: "black",
    marginTop: 10,
    marginLeft: 25,
  },
  text3: {
    opacity: 0.5,
  },
  main: {
    marginTop: 20,
    alignSelf: "flex-start",
  },
  main1: {
    marginTop: 20,
  },
  button: {
    height: 40,
    backgroundColor: "#FF3C6E",
    padding: 10,
    marginTop: "2%",
    borderRadius: 10,
    marginHorizontal: 5,
    width: "95%",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 16,
  },
});
