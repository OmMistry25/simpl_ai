import React, { useState } from 'react';
import { Settings } from 'lucide-react';

interface Integration {
  name: string;
  enabled: boolean;
  icon: string;
}

const SettingsView: React.FC = () => {
  const [settings, setSettings] = useState({
    darkMode: false,
    notifications: true,
    language: 'en',
  });

  const [integrations, setIntegrations] = useState<Integration[]>([
    { name: 'Discord', enabled: false, icon: 'https://assets-global.website-files.com/6257adef93867e50d84d30e2/636e0a6a49cf127bf92de1e2_icon_clyde_blurple_RGB.png' },
    { name: 'Gmail', enabled: true, icon: 'https://ssl.gstatic.com/ui/v1/icons/mail/rfr/gmail.ico' },
    { name: 'Outlook', enabled: true, icon: 'https://outlook.office365.com/owa/favicon.ico' },
    { name: 'Google Calendar', enabled: true, icon: 'https://calendar.google.com/googlecalendar/images/favicon_v2018_256.png' },
    { name: 'iMessage', enabled: false, icon: 'https://www.apple.com/favicon.ico' },
    { name: 'WhatsApp', enabled: false, icon: 'https://static.whatsapp.net/rsrc.php/v3/yP/r/rYZqPCBaG70.png' },
    { name: 'Instagram', enabled: false, icon: 'https://static.cdninstagram.com/rsrc.php/v3/yR/r/lam-fZmwmvn.png' },
    { name: 'Slack', enabled: true, icon: 'https://a.slack-edge.com/80588/marketing/img/meta/favicon-32.png' },
    { name: 'Microsoft Teams', enabled: true, icon: 'https://statics.teams.cdn.office.net/evergreen-assets/apps/teams_microsoft_32x32.png' },
    { name: 'Figma', enabled: false, icon: 'https://static.figma.com/app/icon/1/favicon.png' },
    { name: 'GitHub', enabled: true, icon: 'https://github.githubassets.com/favicons/favicon.svg' },
    { name: 'Jira', enabled: true, icon: 'https://wac-cdn.atlassian.com/assets/img/favicons/atlassian/favicon.png' },
  ]);

  const [activeTab, setActiveTab] = useState('general');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setSettings({
      ...settings,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
    });
  };

  const toggleIntegration = (index: number) => {
    const updatedIntegrations = [...integrations];
    updatedIntegrations[index].enabled = !updatedIntegrations[index].enabled;
    setIntegrations(updatedIntegrations);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-semibold mb-4">Settings</h2>
      <div className="flex mb-4">
        <button
          className={`mr-4 ${activeTab === 'general' ? 'text-blue-500 font-semibold' : 'text-gray-500'}`}
          onClick={() => setActiveTab('general')}
        >
          General
        </button>
        <button
          className={`${activeTab === 'integrations' ? 'text-blue-500 font-semibold' : 'text-gray-500'}`}
          onClick={() => setActiveTab('integrations')}
        >
          Integrations
        </button>
      </div>
      {activeTab === 'general' && (
        <form className="space-y-4">
          <div>
            <label className="flex items-center">
              <input
                type="checkbox"
                name="darkMode"
                checked={settings.darkMode}
                onChange={handleChange}
                className="mr-2"
              />
              Dark Mode
            </label>
          </div>
          <div>
            <label className="flex items-center">
              <input
                type="checkbox"
                name="notifications"
                checked={settings.notifications}
                onChange={handleChange}
                className="mr-2"
              />
              Enable Notifications
            </label>
          </div>
          <div>
            <label className="block mb-1">Language</label>
            <select
              name="language"
              value={settings.language}
              onChange={handleChange}
              className="w-full border rounded p-2"
            >
              <option value="en">English</option>
              <option value="es">Español</option>
              <option value="fr">Français</option>
            </select>
          </div>
          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
            Save Settings
          </button>
        </form>
      )}
      {activeTab === 'integrations' && (
        <div className="space-y-4">
          {integrations.map((integration, index) => (
            <div key={integration.name} className="flex items-center justify-between">
              <div className="flex items-center">
                <img src={integration.icon} alt={integration.name} className="w-6 h-6 mr-2" />
                <span>{integration.name}</span>
              </div>
              <button
                onClick={() => toggleIntegration(index)}
                className={`w-12 h-6 flex items-center rounded-full p-1 ${
                  integration.enabled ? 'bg-green-400' : 'bg-gray-300'
                } transition-colors duration-200 focus:outline-none`}
              >
                <div
                  className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform duration-200 ${
                    integration.enabled ? 'translate-x-6' : ''
                  }`}
                ></div>
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SettingsView;