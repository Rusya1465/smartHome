export interface SmartDevice {
  id: string;
  name: string;
  isOn: boolean;
  batteryLevel: number;
  type: 'light' | 'thermostat' | 'camera';
}

export interface Light extends SmartDevice {
  type: 'light';
  brightness: number;
  color: string;
}

export interface Thermostat extends SmartDevice {
  type: 'thermostat';
  temperature: number;
  mode: 'heat' | 'cool' | 'auto';
  targetTemperature: number;
}

export interface Camera extends SmartDevice {
  type: 'camera';
  isRecording: boolean;
  motionDetected: boolean;
}

export type Device = Light | Thermostat | Camera;