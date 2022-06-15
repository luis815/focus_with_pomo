import React, { createContext, useState } from "react";

const SettingsContext = createContext(null);

export default SettingsContext;

export const SettingsContextProvider = ({ children }) => {
	const [settings, setSettings] = useState({
		workDuration: 1500,
		breakDuration: 300,
		totalReps: 4,
		sound: true,
	});

	return (
		<SettingsContext.Provider
			value={{
				settings,
				updateSettings(updatedSettings) {
					setSettings({ ...settings, ...updatedSettings });
				},
			}}
		>
			{children}
		</SettingsContext.Provider>
	);
};
