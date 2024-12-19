import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { Device } from '../types/devices';

interface SmartHomeState {
  devices: Device[];
  notifications: string[];
}

type Action =
  | { type: 'ADD_DEVICE'; device: Device }
  | { type: 'REMOVE_DEVICE'; id: string }
  | { type: 'UPDATE_DEVICE'; device: Device }
  | { type: 'ADD_NOTIFICATION'; message: string };

const initialState: SmartHomeState = {
  devices: [],
  notifications: [],
};

const SmartHomeContext = createContext<{
  state: SmartHomeState;
  dispatch: React.Dispatch<Action>;
} | null>(null);

export function SmartHomeProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer((state: SmartHomeState, action: Action): SmartHomeState => {
    switch (action.type) {
      case 'ADD_DEVICE':
        return { ...state, devices: [...state.devices, action.device] };
      case 'REMOVE_DEVICE':
        return { ...state, devices: state.devices.filter(d => d.id !== action.id) };
      case 'UPDATE_DEVICE':
        return {
          ...state,
          devices: state.devices.map(d => (d.id === action.device.id ? action.device : d)),
        };
      case 'ADD_NOTIFICATION':
        return { ...state, notifications: [action.message, ...state.notifications] };
      default:
        return state;
    }
  }, initialState);

  // Simulate device battery drain
  useEffect(() => {
    const interval = setInterval(() => {
      state.devices.forEach(device => {
        if (device.isOn && device.batteryLevel > 0) {
          const updatedDevice = {
            ...device,
            batteryLevel: Math.max(0, device.batteryLevel - 1),
          };
          dispatch({ type: 'UPDATE_DEVICE', device: updatedDevice });

          if (updatedDevice.batteryLevel < 20) {
            dispatch({
              type: 'ADD_NOTIFICATION',
              message: `Low battery warning: ${device.name} (${device.batteryLevel}%)`,
            });
          }
        }
      });
    }, 10000);

    return () => clearInterval(interval);
  }, [state.devices]);

  return (
    <SmartHomeContext.Provider value={{ state, dispatch }}>
      {children}
    </SmartHomeContext.Provider>
  );
}

export function useSmartHome() {
  const context = useContext(SmartHomeContext);
  if (!context) {
    throw new Error('useSmartHome must be used within a SmartHomeProvider');
  }
  return context;
}