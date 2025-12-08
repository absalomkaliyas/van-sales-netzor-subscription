import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

export default function RootLayout() {
  return (
    <>
      <StatusBar style="auto" />
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="login" options={{ title: 'Login' }} />
        <Stack.Screen name="stock-assignment" options={{ title: 'Stock Assignment' }} />
        <Stack.Screen name="collect-stock" options={{ title: 'Collect Stock' }} />
        <Stack.Screen name="delivery" options={{ title: 'Delivery' }} />
      </Stack>
    </>
  );
}

