import React from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Image,
  KeyboardAvoidingView,
  Platform,
  ImageBackground, // Importar ImageBackground
} from "react-native";
import Header from "../components/Header";
import Footer from "../components/Footer";

const App = () => {
  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={styles.keyboardAvoidingView}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <Header />
        <ScrollView contentContainerStyle={styles.contentWrapper}>
          <View style={styles.mainContent}>
            {/* Sección con imagen de fondo */}
            <ImageBackground
              source={require("../assets/images/libro.jpg")} // Cambia esta ruta por la ruta de tu imagen de fondo
              style={styles.backgroundImage}
            >
              <View style={styles.MultiContainerprincipal}>
                <Text style={styles.welcomeText}>Entra a un mundo nuevo!</Text>
                <Text style={styles.textPrincipal}>
                  ¿No tienes con quien compartir tu lectura? Folira será tu
                  próximo lugar favorito!
                </Text>
              </View>
            </ImageBackground>

            <View style={styles.MultiContainer}>
              <Image
                source={require("../assets/images/Después De Diciembre.jpeg")}
                style={styles.bookImage}
              />
              <Text style={styles.textP}>
              Descubre títulos, lee reseñas y recibe recomendaciones personalizadas. ¡Encuentra tu próxima lectura aquí!
              </Text>
            </View>

            <View style={[styles.MultiContainer, styles.reverse]}>
              <Image
                source={require("../assets/images/Joana Marcús.jpg")}
                style={styles.AutorImage}
              />
              <Text style={styles.AutorText}>
              Descubre biografías y obras de autores. Conoce a los creadores de tus libros favoritos.
              </Text>
            </View>

            <View style={styles.MultiContainer}>
              <Image
                source={require("../assets/images/c8.jpg")}
                style={styles.comuniImage}
              />
              <Text style={styles.textP}>
              Únete a grupos de discusión, comparte tus lecturas y conecta con otros entusiastas de los libros.
              </Text>
            </View>
          </View>
          <View style={styles.footer}>
            <Footer />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  contentWrapper: {
    paddingBottom: 10,
  },
  mainContent: {
    paddingHorizontal: 0,
    paddingBottom: 20,
  },
  textPrincipal: {
    fontSize: 16,
    color: "#fff",
    flex: 1,
    textAlign: "center",
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
    marginTop: 10,
    marginBottom: 15,
    textAlign: "center",
  },
  MultiContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    marginBottom: 20,
  },
  MultiContainerprincipal: {
    padding: 20,
    marginBottom: 20,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "transparent", // Asegura que el fondo no sea visible aquí
  },
  reverse: {
    flexDirection: "row-reverse",
  },
  backgroundImage: {
    width: "100%", // Asegura que la imagen de fondo ocupe todo el ancho disponible
    height: 200, // Ajusta la altura según tus necesidades
    justifyContent: "center", // Centra el contenido verticalmente
    alignItems: "center", // Centra el contenido horizontalmente
    overflow: "hidden", // Asegura que la imagen de fondo no se desborde
  },
  bookImage: {
    width: 120,
    height: 120,
    marginTop: 10,
    borderRadius: 60,
    marginRight: 15,
    borderWidth: 1, // Añade el borde
    borderColor:  "#503b31",
  },
  textP: {
    fontSize: 16,
    color: "#333",
    flex: 1,
    textAlign: "center",
  },
  AutorImage: {
    width: 120,
    height: 120,
    marginTop: -20,
    borderRadius: 60,
    marginLeft: 15,
    borderWidth: 1, // Añade el borde
    borderColor:  "#503b31",
  },
  AutorText: {
    fontSize: 16,
    color: "#333",
    flex: 1,
    textAlign: "center",
  },
  comuniImage: {
    width: 120,
    height: 120,
    marginTop: -20,
    borderRadius: 60,
    marginRight: 15,
    borderWidth: 1, // Añade el borde
    borderColor:  "#503b31",
  },
  footer: {
    backgroundColor: "#f8f8f8",
    padding: 14,
  },
});

export default App;
