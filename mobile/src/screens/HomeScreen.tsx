import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import {useAuth} from '../context/AuthContext';

const HomeScreen = ({navigation}: any) => {
  const {isAuthenticated} = useAuth();

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.hero}>
          <Text style={styles.title}>Welcome to Mini App</Text>
          <Text style={styles.subtitle}>Register now</Text>

          <View style={styles.ctaContainer}>
            {isAuthenticated() ? (
              <TouchableOpacity
                style={styles.primaryButton}
                onPress={() => navigation.navigate('Dashboard')}>
                <Text style={styles.buttonText}>Go to Dashboard</Text>
              </TouchableOpacity>
            ) : (
              <>
                <TouchableOpacity
                  style={styles.primaryButton}
                  onPress={() => navigation.navigate('Register')}>
                  <Text style={styles.buttonText}>Get Started</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.secondaryButton}
                  onPress={() => navigation.navigate('Login')}>
                  <Text style={styles.secondaryButtonText}>Login</Text>
                </TouchableOpacity>
              </>
            )}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 20,
  },
  hero: {
    alignItems: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 16,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 18,
    color: '#7f8c8d',
    marginBottom: 48,
    textAlign: 'center',
  },
  ctaContainer: {
    width: '100%',
    gap: 16,
  },
  primaryButton: {
    backgroundColor: '#3498db',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  secondaryButton: {
    backgroundColor: '#95a5a6',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  secondaryButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default HomeScreen;
