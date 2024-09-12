import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  Modal,
  Alert,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import * as ImagePicker from 'expo-image-picker';
import { useRouter } from "expo-router";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { createUser } from "../../lib/appwrite";

const Register = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [phone, setPhone] = useState("");
  const [image, setImage] = useState(null);
  const [documentType, setDocumentType] = useState("");
  const [documentNumber, setDocumentNumber] = useState("");

  const router = useRouter();

  const validateFields = () => {
    if (!documentType) return "Tipo de documento es obligatorio";
    if (!documentNumber) return "Número de documento es obligatorio";
    if (!name) return "Nombre es obligatorio";
    if (!email) return "Correo electrónico es obligatorio";
    if (!password) return "Contraseña es obligatoria";
    if (password.length < 6)
      return "La contraseña debe tener al menos 6 caracteres";
    if (!validateBirthDate(birthDate)) return "Fecha de nacimiento inválida";
    if (!validateEmail(email)) return "El correo electrónico no es válido";
    if (!/^\d+$/.test(documentNumber))
      return "El número de documento debe contener solo números";
    return null;
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleRegister = async () => {
    const errorMessage = validateFields();
    if (errorMessage) {
      Alert.alert("Error", errorMessage);
      return;
    }

    try {
      await createUser(email, password);
      Alert.alert("Éxito", "Usuario registrado correctamente");
      router.push("/sign-in");
    } catch (error) {
      Alert.alert("Error", "No se pudo registrar el usuario");
      console.error("Error:", error);
    }
  };

 
  const handleBirthDateChange = (text) => {
    // Expresión regular para permitir solo números y "/"
    const regex = /^[0-9/]*$/;

    if (regex.test(text)) {
      setBirthDate(text); // Actualiza el valor solo si cumple con la validación
    }
  };

  const pickImage = async () => {
    // Solicita permiso para acceder a las imágenes del dispositivo
    let permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      Alert.alert(
        "Permiso denegado",
        "Se necesita permiso para acceder a la galería"
      );
      return;
    }

    // Abre la galería para seleccionar una imagen
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri); // Almacena la URI de la imagen seleccionada
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={styles.keyboardAvoidingView}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 100 : 0}
      >
        <ScrollView contentContainerStyle={styles.scrollViewContent}>
          <Header />
          <View style={styles.innerContainer}>
            <View style={styles.formBox}>
              <Text style={styles.title}>Crear Cuenta</Text>

              {/* Name */}
              <Text style={styles.label}>Nombre</Text>
              <View style={styles.inputBox}>
                <TextInput
                  style={styles.input}
                  placeholder="Ingrese su nombre aquí"
                  value={name}
                  onChangeText={setName}
                />
                <FontAwesome name="user" size={20} style={styles.icon} />
              </View>

              {/* Email */}
              <Text style={styles.label}>Correo Electrónico</Text>
              <View style={styles.inputBox}>
                <TextInput
                  style={styles.input}
                  placeholder="Ingrese su correo electrónico aquí"
                  value={email}
                  onChangeText={setEmail}
                  keyboardType="email-address"
                  autoCapitalize="none"
                />
                <FontAwesome name="envelope" size={20} style={styles.icon} />
              </View>

              {/* Password */}
              <Text style={styles.label}>Contraseña</Text>
              <View style={styles.passwordContainer}>
                <TextInput
                  style={styles.passwordInput}
                  placeholder="Ingrese su contraseña aquí"
                  secureTextEntry={!passwordVisible}
                  value={password}
                  onChangeText={setPassword}
                />
                <TouchableOpacity
                  style={styles.eyeIcon}
                  onPress={() => setPasswordVisible(!passwordVisible)}
                >
                  <FontAwesome
                    name={passwordVisible ? "eye-slash" : "eye"}
                    size={20}
                  />
                </TouchableOpacity>
                <FontAwesome
                  name="lock"
                  size={20}
                  style={styles.iconAfterEye}
                />
              </View>

              {/* Birth Date */}
              <Text style={styles.label}>Fecha de Nacimiento</Text>
              <View style={styles.inputBox}>
                <TextInput
                  style={styles.input}
                  placeholder="YYYY-MM-DD"
                  value={birthDate}
                  onChangeText={setBirthDate} // Asegúrate de que esta línea esté correctamente escrita
                  keyboardType="numeric"
                />
                <FontAwesome name="calendar" size={20} style={styles.icon} />
              </View>

              {/* Phone */}
              <Text style={styles.label}>Teléfono</Text>
              <View style={styles.inputBox}>
                <TextInput
                  style={styles.input}
                  placeholder="Ingrese su número de teléfono"
                  value={phone}
                  onChangeText={setPhone}
                  keyboardType="phone-pad"
                  maxLength={10}
                />
                <FontAwesome name="phone" size={20} style={styles.icon} />
              </View>

              {/* Upload Image */}
              <Text style={styles.label}>Subir Imagen (Opcional)</Text>
              <TouchableOpacity onPress={pickImage} style={styles.uploadButton}>
                <Text style={styles.uploadButtonText}>Seleccionar Imagen</Text>
              </TouchableOpacity>
              {image && <Text>Imagen seleccionada</Text>}

              <TouchableOpacity
                style={styles.registerButton}
                onPress={handleRegister}
              >
                <Text style={styles.registerButtonText}>Registrarse</Text>
              </TouchableOpacity>

              <View style={styles.loginLink}>
                <Text style={styles.loginPrompt}>¿Ya tienes una cuenta?</Text>
                <TouchableOpacity onPress={() => router.push("/sign-in")}>
                  <Text style={styles.loginText}>Iniciar sesión</Text>
                </TouchableOpacity>
              </View>
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
  scrollViewContent: {
    flexGrow: 1,
  },
  innerContainer: {
    flex: 1,
    alignItems: "center",
    padding: 20,
  },
  formBox: {
    width: "100%",
    padding: 15,
    backgroundColor: "white",
    borderRadius: 8,
    boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.3)",
    elevation: 5,
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#503b31",
    marginBottom: 20,
    textAlign: "center",
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#503b31",
    marginBottom: 5,
    marginTop: 10,
  },
  inputBox: {
    marginBottom: 15,
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  icon: {
    color: "#503b31",
  },
  iconAfterEye: {
    color: "#000",
    marginLeft: 10,
  },
  input: {
    flex: 1,
    padding: 10,
  },
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginBottom: 15,
  },
  passwordInput: {
    flex: 1,
    padding: 10,
    paddingRight: 40, // To ensure space for the eye icon
  },
  eyeIcon: {
    position: "absolute",
    right: 17,
    top: "50%",
    transform: [{ translateY: -10 }],
    color: "#503b31",
  },
  registerButton: {
    backgroundColor: "#503b31",
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
    marginVertical: 20,
  },
  registerButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  loginLink: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 10,
  },
  loginPrompt: {
    fontSize: 16,
    color: "#503b31",
  },
  loginText: {
    fontSize: 16,
    color: "#503b31",
    fontWeight: "bold",
    marginLeft: 5,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContent: {
    backgroundColor: "#fff",
    borderRadius: 10,
    width: "80%",
    padding: 20,
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  modalButton: {
    padding: 10,
    width: "100%",
    alignItems: "center",
  },
  modalButtonText: {
    fontSize: 15.5,
    color: "#000",
  },
  modalCloseButton: {
    marginTop: 15,
    padding: 10,
    backgroundColor: "#ddd",
    borderRadius: 5,
  },
  modalCloseButtonText: {
    fontSize: 15.5,
    color: "#000",
  },
  footer: {
    width: "100%",
    backgroundColor: "#f8f8f8",
    padding: 30,
    alignItems: "center",
    justifyContent: "center",
  },
  imageUploadButton: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    backgroundColor: "#ddd",
    borderRadius: 5,
    marginBottom: 15,
  },
  imageUploadText: {
    fontSize: 16,
    color: "#503b31",
  },
  imagePreview: {
    width: 100,
    height: 100,
    borderRadius: 8,
    marginTop: 10,
    marginBottom: 20,
  },
  // ... (Mantén tus estilos existentes)
  uploadButton: {
    backgroundColor: "#ddd",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    marginBottom: 20,
  },
  uploadButtonText: {
    color: "#000",
    fontSize: 16,
  },
});

export default Register;
