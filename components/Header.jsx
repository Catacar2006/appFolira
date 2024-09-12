import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Modal, Pressable, ScrollView, Dimensions } from 'react-native';
import { useRouter } from 'expo-router';
import { FontAwesome } from '@expo/vector-icons';
import { Link } from 'expo-router';

const { width } = Dimensions.get('window');

const Header = () => {
  const [menuVisible, setMenuVisible] = useState(false);
  const [accountMenuVisible, setAccountMenuVisible] = useState(false);
  const router = useRouter();

  // Función para manejar la navegación y cerrar el modal
  const handleNavigation = (route) => {
    router.push(route);
    setAccountMenuVisible(false);
  };

  return (
    <View style={styles.header}>
      <Link href="/">
        <View style={styles.logoContainer}>
          <Image
            source={require('../assets/images/folira-logo.png')}
            style={styles.logo}
          />
          <Text style={styles.logoText}>Folira</Text>
        </View>
      </Link>

      {/* Parte inferior con icono de hamburguesa, carrito y cuenta */}
      <View style={styles.bottomBar}>
        <View style={styles.spacer} /> {/* Espaciador para empujar el botón a la derecha */}
        <View style={styles.accountCart}>
          <TouchableOpacity style={styles.accountButton} onPress={() => setAccountMenuVisible(true)}>
            <FontAwesome name="user" size={20} color="#503b31" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Modal del menú de cuenta */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={accountMenuVisible}
        onRequestClose={() => setAccountMenuVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.accountModalContent}>
            <Pressable onPress={() => setAccountMenuVisible(false)} style={styles.closeButton}>
              <Text style={styles.closeButtonText}>X</Text>
            </Pressable>
            <View style={styles.accountMenu}>
              <TouchableOpacity style={styles.accountMenuItem} onPress={() => handleNavigation('/sign-up')}>
                <Text style={styles.accountMenuText}>Registrarse</Text>
                <FontAwesome name="user-plus" size={20} color="#503b31" />
              </TouchableOpacity>
              <TouchableOpacity style={styles.accountMenuItem} onPress={() => handleNavigation('/sign-in')}>
                <Text style={styles.accountMenuText}>Iniciar sesión</Text>
                <FontAwesome name="sign-in" size={20} color="#503b31" />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#ffffff',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderBottomWidth: 2,
    borderBottomColor: '#ddd',
    width: '100%',
    flexDirection: 'row', // Para alinear logo y botón en la misma línea
    justifyContent: 'space-between', // Distribuye el espacio entre los elementos
    alignItems: 'center', // Alinea los elementos verticalmente en el centro
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logo: {
    height: 30,
    width: 30,
    resizeMode: 'contain',
  },
  logoText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
    marginLeft: 10,
  },
  bottomBar: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1, // Ocupa el espacio disponible
  },
  spacer: {
    flex: 1, // Espaciador que empuja el botón a la derecha
  },
  accountCart: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  accountButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10, // Espaciado horizontal dentro del botón
    paddingVertical: 5, // Espaciado vertical dentro del botón
    maxWidth: 150, // Máximo ancho para evitar desbordamiento
    overflow: 'hidden', // Oculta el contenido que se desborda
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  accountModalContent: {
    width: width * 0.8,
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  closeButton: {
    alignSelf: 'flex-end',
    backgroundColor: 'white', // Fondo blanco
    padding: 5, // Reducido para hacer el botón más pequeño
    borderRadius: 25, // Ajustado para hacer el botón más pequeño y circular
  },
  closeButtonText: {
    color: '#503b31', // Color de la X
    fontSize: 16, // Ajusta el tamaño del texto si es necesario
    fontWeight: 'bold',
  },
  accountMenu: {
    width: '100%',
  },
  accountMenuItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  accountMenuText: {
    fontSize: 18,
    color: '#333',
    flex: 1,
  },
});

export default Header;
