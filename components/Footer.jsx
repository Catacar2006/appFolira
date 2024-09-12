import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions, ScrollView } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

const Footer = () => {
  return (
    <View style={styles.footer}>
      <ScrollView
        contentContainerStyle={styles.footerContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Sección Redes Sociales */}
        <View style={styles.footerSection}>
          <Text style={styles.footerTitle}>Nuestras <Text style={styles.highlight}>Redes</Text></Text>
          <View style={styles.socialIcons}>
            <TouchableOpacity style={styles.socialIcon}>
              <FontAwesome name="facebook" size={24} color="#503b31" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.socialIcon}>
              <FontAwesome name="instagram" size={24} color="#503b31" />
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>

      <View style={styles.footerBottom}>
        <Text style={styles.footerBottomText}>
          © 2023-2024 Todos los derechos reservados 
          <TouchableOpacity>
            <Text style={styles.footerLink}> Términos y condiciones</Text>
          </TouchableOpacity>
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  footer: {
    backgroundColor: '#f8f8f8',
    borderTopWidth: 2,
    borderTopColor: '#503b31',
    paddingVertical: 10, // Ajusta el padding vertical si es necesario
  },
  footerContent: {
    paddingHorizontal: 15, // Reduce el padding horizontal
  },
  footerSection: {
    marginBottom: 10, // Espaciado entre secciones
  },
  footerTitle: {
    color: "#503b31",
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10, // Espaciado debajo del título
  },
  highlight: {
    color: '#503b31',
  },
  socialIcons: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  socialIcon: {
    marginHorizontal: 10, // Reduce el espacio entre los íconos
  },
  footerBottom: {
    alignItems: 'center', // Centrado horizontal
    paddingVertical: 10, // Ajusta el padding vertical
    marginBottom: -30,
  },
  footerBottomText: {
    fontSize: 12, // Reduce el tamaño del texto
    color: '#333',
    textAlign: 'center', // Centrado del texto
    marginBottom: 0, // Asegúrate de que no haya margen inferior
    paddingBottom: 0, // Asegúrate de que no haya padding inferior
  },
  footerLink: {
    color: '#503b31',
  },
});

export default Footer;
