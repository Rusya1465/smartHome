import React from 'react';
import { Plus } from 'lucide-react';
import { SmartHomeProvider } from './context/SmartHomeContext';
import { DeviceCard } from './components/DeviceCard';
import { NotificationPanel } from './components/NotificationPanel';
import { useSmartHome } from './context/SmartHomeContext';

function Dashboard() {
  const { state, dispatch } = useSmartHome();

  const addDevice = (type: 'light' | 'thermostat' | 'camera') => {
    const baseDevice = {
      id: Math.random().toString(36).substr(2, 9),
      name: `${type.charAt(0).toUpperCase() + type.slice(1)} ${state.devices.length + 1}`,
      isOn: false,
      batteryLevel: 100,
      type,
    };

    let device;
    switch (type) {
      case 'light':
        device = {
          ...baseDevice,
          brightness: 100,
          color: '#ffffff',
        };
        break;
      case 'thermostat':
        device = {
          ...baseDevice,
          temperature: 21,
          mode: 'auto' as const,
          targetTemperature: 21,
        };
        break;
      case 'camera':
        device = {
          ...baseDevice,
          isRecording: false,
          motionDetected: false,
        };
        break;
    }

    dispatch({ type: 'ADD_DEVICE', device });
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Smart Home Dashboard</h1>
          <div className="flex gap-2">
            <button
              onClick={() => addDevice('light')}
              className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 flex items-center gap-2"
            >
              <Plus className="w-5 h-5" /> Add Light
            </button>
            <button
              onClick={() => addDevice('thermostat')}
              className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 flex items-center gap-2"
            >
              <Plus className="w-5 h-5" /> Add Thermostat
            </button>
            <button
              onClick={() => addDevice('camera')}
              className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 flex items-center gap-2"
            >
              <Plus className="w-5 h-5" /> Add Camera
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {state.devices.map((device) => (
            <DeviceCard key={device.id} device={device} />
          ))}
        </div>

        <div className="mt-8">
          <NotificationPanel />
        </div>
      </div>
    </div>
  );
}

function App() {
  return (
    <SmartHomeProvider>
      <Dashboard />
    </SmartHomeProvider>
  );
}

export default App;