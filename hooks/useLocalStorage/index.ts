import { useEffect, useState } from "react";

const useLocalStorageWithSync = (key: string, initialValue: any) => {
  const [storedValue, setStoredValue] = useState(initialValue);
  const isClient = typeof window !== "undefined";

  useEffect(() => {
    if (!isClient) return;
    const syncStorage = () => {
      const storedData = localStorage.getItem(key);
      setStoredValue(storedData ? JSON.parse(storedData) : initialValue);
    };

    const channel = new BroadcastChannel("localStorageChannel");
    channel.addEventListener("message", syncStorage);
    syncStorage();
    return () => {
      channel.removeEventListener("message", syncStorage);
      channel.close();
    };
  }, [key, isClient]);

  const setValue = (newValue: any) => {
    localStorage.setItem(key, JSON.stringify(newValue));
    setStoredValue(newValue);
    const channel = new BroadcastChannel("localStorageChannel");
    channel.postMessage("update");
    channel.close();
  };

  return [storedValue, setValue];
};

export default useLocalStorageWithSync;
