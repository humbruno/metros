import * as SecureStore from 'expo-secure-store'

export enum StoreKeys {
  ACCESS_TOKEN = 'accessToken'
}

export async function saveToStore(key: StoreKeys, value: string) {
  await SecureStore.setItemAsync(key, value)
}

export async function readFromStore(key: StoreKeys) {
  return await SecureStore.getItemAsync(key)
}

export async function deleteFromStore(key: StoreKeys) {
  await SecureStore.deleteItemAsync(key)
}
