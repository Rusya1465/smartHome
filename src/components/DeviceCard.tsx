import React from 'react';
import { Power, Sun, Thermometer, Camera } from 'lucide-react';
import { Device } from '../types/devices';
import { useSmartHome } from '../context/SmartHomeContext';

interface DeviceCardProps {
  device: Device;
}

export function DeviceCard({ device }: DeviceCardProps) {
  const { dispatch } = useSmartHome();

  const togglePower = () => {
    dispatch({
      type: 'UPDATE_DEVICE',
      device: { ...device, isOn: !device.isOn },
    });
  };

  const getIcon = () => {
    switch (device.type) {
      case 'light':
        return <Sun className="w-6 h-6" />;
      case 'thermostat':
        return <Thermometer className="w-6 h-6" />;
      case 'camera':
        return <Camera className="w-6 h-6" />;
    }
  };

  const getDetails = () => {
    switch (device.type) {
      case 'light':
        return (
          <div className="mt-2">
            <div className="flex items-center gap-2">
              <span>Brightness: {device.brightness}%</span>
              <input
                type="range"
                min="0"
                max="100"
                value={device.brightness}
                onChange={(e) =>
                  dispatch({
                    type: 'UPDATE_DEVICE',
                    device: { ...device, brightness: Number(e.target.value) },
                  })
                }
                className="w-full"
              />
            </div>
            <input
              type="color"
              value={device.color}
              onChange={(e) =>
                dispatch({
                  type: 'UPDATE_DEVICE',
                  device: { ...device, color: e.target.value },
                })
              }
              className="mt-2"
            />
          </div>
        );
      case 'thermostat':
        return (
          <div className="mt-2">
            <div>Current: {device.temperature}°C</div>
            <div className="flex items-center gap-2">
              <span>Target: {device.targetTemperature}°C</span>
              <input
                type="range"
                min="16"
                max="30"
                value={device.targetTemperature}
                onChange={(e) =>
                  dispatch({
                    type: 'UPDATE_DEVICE',
                    device: { ...device, targetTemperature: Number(e.target.value) },
                  })
                }
                className="w-full"
              />
            </div>
            <select
              value={device.mode}
              onChange={(e) =>
                dispatch({
                  type: 'UPDATE_DEVICE',
                  device: { ...device, mode: e.target.value as 'heat' | 'cool' | 'auto' },
                })
              }
              className="mt-2 w-full p-2 rounded border"
            >
              <option value="heat">Heat</option>
              <option value="cool">Cool</option>
              <option value="auto">Auto</option>
            </select>
          </div>
        );
      case 'camera':
        return (
          <div className="mt-2">
            <div>Status: {device.isRecording ? 'Recording' : 'Standby'}</div>
            <div>Motion: {device.motionDetected ? 'Detected' : 'None'}</div>
            <button
              onClick={() =>
                dispatch({
                  type: 'UPDATE_DEVICE',
                  device: { ...device, isRecording: !device.isRecording },
                })
              }
              className="mt-2 w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
            >
              {device.isRecording ? 'Stop Recording' : 'Start Recording'}
            </button>
          </div>
        );
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          {getIcon()}
          <h3 className="text-lg font-semibold">{device.name}</h3>
        </div>
        <button
          onClick={togglePower}
          className={`p-2 rounded-full ${
            device.isOn ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-600'
          }`}
        >
          <Power className="w-5 h-5" />
        </button>
      </div>
      <div className="mt-2">
        <div className="h-2 bg-gray-200 rounded">
          <div
            className={`h-full rounded ${
              device.batteryLevel > 20 ? 'bg-green-500' : 'bg-red-500'
            }`}
            style={{ width: `${device.batteryLevel}%` }}
          />
        </div>
        <div className="text-sm text-gray-600 mt-1">Battery: {device.batteryLevel}%</div>
      </div>
      {device.isOn && getDetails()}
    </div>
  );
}