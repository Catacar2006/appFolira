import React, { useState } from 'react';
import { useRouter } from 'expo-router';
import {
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  Alert,
  KeyboardAvoidingView,
  Platform
} from 'react-native';
import { FontAwesome, MaterialCommunityIcons } from '@expo/vector-icons';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { signIn } from '../../lib/appwrite'; // Asegúrate de que la ruta y el nombre sean correctos

const LoginScreen = () => {
  const router = useRouter();
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const togglePasswordVisibility = () => setPasswordVisible(!passwordVisible);

  async function handleLogin() {
    if (!email || !password) {
      Alert.alert('Error', 'Por favor, completa todos los campos.');
      return;
    }

    try {
      const response = await signIn(email, password);
      console.log('Session created:', response);
      router.push('/main');
    } catch (error) {
      console.error('Error creating session:', error);

      let errorMessage = 'No se pudo iniciar sesión. Verifica tus credenciales e intenta nuevamente.';

      if (error.message.includes('Invalid email') || error.message.includes('invalid email')) {
        errorMessage = 'El correo electrónico ingresado es incorrecto. Verifica e intenta nuevamente.';
      } else if (error.message.includes('Invalid password') || error.message.includes('invalid password')) {
        errorMessage = 'La contraseña ingresada es incorrecta. Verifica e intenta nuevamente.';
      }

      Alert.alert('Error', errorMessage);
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={styles.keyboardAvoidingView}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 0} // Ajusta el offset para el comportamiento en iOS y Android
      >
        <ScrollView contentContainerStyle={styles.scrollViewContent}>
          <Header />
          <View style={styles.innerContainer}>
            <View style={styles.formBox}>
              <Text style={styles.title}>Iniciar Sesión</Text>
              <View style={styles.inputBox}>
                <Text style={styles.label}>Correo</Text>
                <View style={styles.inputWrapper}>
                  <TextInput
                    style={styles.input}
                    placeholder="Ingrese su correo aquí"
                    value={email}
                    onChangeText={setEmail}
                    autoCapitalize="none"
                    keyboardType="email-address"
                  />
                </View>
              </View>
              <View style={styles.inputBox}>
                <Text style={styles.label}>Contraseña</Text>
                <View style={styles.passwordContainer}>
                  <View style={styles.inputWrapper}>
                    <TextInput
                      style={styles.input}
                      placeholder="Ingrese su contraseña aquí"
                      value={password}
                      onChangeText={setPassword}
                      secureTextEntry={!passwordVisible}
                    />
                    
                  </View>
                  <Pressable
                    style={styles.passwordToggle}
                    onPress={togglePasswordVisibility}
                    accessibilityLabel="Mostrar u ocultar contraseña"
                  >
                    <FontAwesome name={passwordVisible ? 'eye-slash' : 'eye'} size={24} color="#503b31" />
                  </Pressable>
                </View>
              </View>
              <View style={styles.rememberForgot}>
                <Pressable style={styles.rememberMe}>
                  <Text style={styles.rememberMeText}>Recordar contraseña</Text>
                </Pressable>
                <Pressable>
                  <Text style={styles.forgotPassword}>¿Olvidó su contraseña?</Text>
                </Pressable>
              </View>
              <Pressable
                style={styles.loginButton}
                onPress={handleLogin}
                accessibilityLabel="Iniciar sesión"
              >
                <Text style={styles.loginButtonText}>Iniciar sesión</Text>
              </Pressable>
              <View style={styles.registerLink}>
                <Text style={styles.registerPrompt}>¿No tiene una cuenta?</Text>
                <Pressable onPress={() => router.push('/sign-up')}>
                  <Text style={styles.registerText}>Registrarse</Text>
                </Pressable>
              </View>
            </View>
          </View>
          <View style={styles.footer}>
            <Footer/>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  scrollViewContent: {
    flexGrow: 1,
  },
  innerContainer: {
    flex: 1,
    alignItems: 'center',
    padding: 20,
  },
  formBox: {
    width: '100%',
    padding: 15,
    backgroundColor: 'white',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color:"#503b31"
  },
  inputBox: {
    marginBottom: 20,
  },
  label: {
    marginBottom: 5,
    fontSize: 15,
    fontWeight: 'bold',
    color:"#503b31"
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 4,
    height: 50,
    paddingHorizontal: 15,
    paddingVertical: 5,
  },
  input: {
    flex: 1,
    padding: 10,
    fontSize: 16,
  },
  icon: {
    marginLeft: 10,
  },
  passwordContainer: {
    position: 'relative',
  },
  passwordToggle: {
    position: 'absolute',
    right: 12,
    top: '50%',
    transform: [{ translateY: -12 }],
    
  },
  rememberForgot: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  rememberMeText: {
    fontWeight: 'bold',
    color:"#503b31"
  },
  forgotPassword: {
    color: '#503b31',
  },
  loginButton: {
    backgroundColor: '#503b31',
    paddingVertical: 15,
    borderRadius: 5,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
  },
  loginButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  registerLink: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10,
  },
  registerPrompt: {
    fontSize: 16,
    marginRight: 5,color:"#503b31",
  },
  registerText: {
    color: '#503b31',
    fontWeight: 'bold',
    fontSize: 16,
  },
  footer: {
    width: '100%',
    backgroundColor: '#f8f8f8',
    padding: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default LoginScreen;
