import React, { createContext, useState, Fragment, useEffect } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";

export const UserContext = createContext(null);
export const SettingsContext = createContext(null);

export const ContextProvider = ({ children }) => {
	const [user, setUser] = useState(null);
	const [settings, setSettings] = useState({
		workDuration: 25,
		breakDuration: 5,
		reps: 4,
		sound: true,
	});

	useEffect(() => {
		const auth = getAuth();
		onAuthStateChanged(auth, (user) => {
			if (user) {
				setUser(user);
			} else {
				setUser(false);
			}
		});
	}, []);

	return (
		<Fragment>
			<UserContext.Provider value={[user, setUser]}>
				<SettingsContext.Provider value={[settings, setSettings]}>
					{children}
				</SettingsContext.Provider>
			</UserContext.Provider>
		</Fragment>
	);
};
