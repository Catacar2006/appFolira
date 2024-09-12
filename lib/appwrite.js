import { Account, Client } from "react-native-appwrite";

const config = {
  endpoint: "https://cloud.appwrite.io/v1",
  platform: "com.jms.folira",
  projectId: "66e25653001d566e0145",
};

const client = new Client()
  .setEndpoint(config.endpoint)
  .setProject(config.projectId)
  .setPlatform(config.platform);

const account = new Account(client);

// Función para crear un usuario
export async function createUser(email, password) {
    if (!email || !password) {
        throw new Error('El correo electrónico y la contraseña son obligatorios.');
    }

    if (password.length < 8 || password.length > 265) {
        throw new Error('La contraseña debe tener entre 8 y 265 caracteres.');
    }

    try {
        // Usamos 'unique()' como ID y el método correcto para crear un usuario en Appwrite
        const user = await account.create('unique()', email, password);
        console.log('Usuario creado:', user);
        return user;
    } catch (error) {
        console.error('Error creando usuario:', error.message);
        throw error;
    }
}

// Función para iniciar sesión
export async function signIn(email, password) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        throw new Error('El correo electrónico tiene un formato inválido.');
    }

    try {
        // Crear la sesión de correo electrónico
        const session = await account.createEmailPasswordSession(email, password);
        console.log('Sesión creada:', session);
        return session;
    } catch (error) {
        console.error('Error al crear sesión:', error.message);
        throw error;
    }
}

// Función para reintentar iniciar sesión con retraso exponencial
const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

export async function signInWithRetry(email, password, retries = 3) {
    for (let attempt = 1; attempt <= retries; attempt++) {
        try {
            return await signIn(email, password);
        } catch (error) {
            if (error.message.includes('Rate limit')) {
                if (attempt < retries) {
                    const waitTime = Math.pow(2, attempt) * 1000;
                    console.warn(`Límite de tasa excedido. Reintentando en ${waitTime / 1000} segundos...`);
                    await delay(waitTime);
                } else {
                    throw new Error('Límite de tasa excedido. Por favor, inténtelo más tarde.');
                }
            } else {
                throw error;
            }
        }
    }
}

// Función para cerrar sesión
export async function signOut(sessionId = null) {
    try {
        if (sessionId) {
            await account.deleteSession(sessionId); // Elimina una sesión específica
            console.log('Sesión cerrada.');
        } else {
            await account.deleteSessions(); // Elimina todas las sesiones
            console.log('Todas las sesiones cerradas.');
        }
    } catch (error) {
        console.error('Error cerrando sesión:', error.message);
        throw error;
    }
}

