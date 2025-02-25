import { StyleSheet, Dimensions } from "react-native";


const { width, height } = Dimensions.get("window");

export default StyleSheet.create({
  container: {
    flex: 1,
    width
  },
  backgroundImage: {
    flex: 1,
    width,
    height,
    justifyContent: "center",
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(33, 32, 32, 0.94)",
    width: width,
    height: height,
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width,
    
  },
  heading: {
    fontSize: 26,
    fontWeight: "bold",
    color: "white",
    marginBottom: 15,
  },
  subHeading: {
    fontSize: 20,
    color: "rgba(255,255,255,0.8)",
    marginBottom: 40,
    fontFamily: "sans-serif",
  },
  card:{
    elevation: 5, // Android shadow
    alignItems: "center",
    justifyContent:"center",
    width: "85%",
    alignSelf: "center",

  }
});
