import { useState, useEffect } from "react";

export function useStorageState<T>(
  key: string,
  defaultValue: T
): [T, (value: T | ((prev: T) => T)) => void] {
  const [value, setValue] = useState<T>(defaultValue);

  useEffect(() => {
    if (typeof chrome !== "undefined" && chrome.storage?.sync) {
      chrome.storage.sync.get([key], (result) => {
        if (result[key] !== undefined) {
          setValue(result[key]);
        }
      });
    }
  }, [key]);

  const setStorageValue = (newValue: T | ((prev: T) => T)) => {
    setValue((prev) => {
      const valueToStore =
        typeof newValue === "function"
          ? (newValue as (prev: T) => T)(prev)
          : newValue;

      if (typeof chrome !== "undefined" && chrome.storage?.sync) {
        chrome.storage.sync.set({ [key]: valueToStore });
      }

      return valueToStore;
    });
  };

  return [value, setStorageValue];
}

export function useMultipleStorageState<T extends Record<string, any>>(
  keys: string[],
  defaults: T
): [T, (key: string, value: any) => void] {
  const [values, setValues] = useState<T>(defaults);

  useEffect(() => {
    if (typeof chrome !== "undefined" && chrome.storage?.sync) {
      chrome.storage.sync.get(keys, (result) => {
        setValues((prev) => ({
          ...prev,
          ...result,
        }));
      });
    }
  }, []);

  const updateValue = (key: string, value: any) => {
    setValues((prev) => ({
      ...prev,
      [key]: value,
    }));

    if (typeof chrome !== "undefined" && chrome.storage?.sync) {
      chrome.storage.sync.set({ [key]: value });
    }
  };

  return [values, updateValue];
}
