import React, { createContext, useState, useEffect } from "react";

const SettingsContext = createContext(null);

export default SettingsContext;

export const SettingsContextProvider = ({ children }) => {
	const [settings, setSettings] = useState({
		workDuration: 1500,
		breakDuration: 300,
		totalReps: 4,
		sound: true,
	});

	useEffect(() => {
		const localStorageSettings = localStorage.getItem("settings");

		if (localStorageSettings !== null) {
			setSettings(JSON.parse(localStorageSettings));
		}
	}, []);

	return (
		<SettingsContext.Provider
			value={{
				settings,
				updateSettings(updatedSettings) {
					setSettings({ ...settings, ...updatedSettings });
					localStorage.setItem(
						"settings",
						JSON.stringify({ ...settings, ...updatedSettings })
					);
				},
				onToggleSound() {
					setSettings({ ...settings, sound: !settings.sound });
				},
			}}
		>
			{children}
		</SettingsContext.Provider>
	);
};
