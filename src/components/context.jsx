import React, { createContext, useState, Fragment, useEffect } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";

export const UserContext = createContext(null);

export const ContextProvider = ({ children }) => {
	const [user, setUser] = useState(null);

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
				{children}
			</UserContext.Provider>
		</Fragment>
	);
};
