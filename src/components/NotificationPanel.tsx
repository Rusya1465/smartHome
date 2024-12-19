import React from 'react';
import { Bell } from 'lucide-react';
import { useSmartHome } from '../context/SmartHomeContext';

export function NotificationPanel() {
  const { state } = useSmartHome();

  return (
    <div className="bg-white rounded-lg shadow-lg p-4">
      <div className="flex items-center gap-2 mb-4">
        <Bell className="w-6 h-6" />
        <h2 className="text-xl font-semibold">Notifications</h2>
      </div>
      <div className="space-y-2">
        {state.notifications.map((notification, index) => (
          <div
            key={index}
            className="p-3 bg-gray-50 rounded border border-gray-200 text-sm"
          >
            {notification}
          </div>
        ))}
        {state.notifications.length === 0 && (
          <div className="text-gray-500 text-center">No notifications</div>
        )}
      </div>
    </div>
  );
}