import React, { createContext, useEffect, useState } from "react";
import {
	getAuth,
	onAuthStateChanged,
	signInWithPopup,
	GoogleAuthProvider,
	signOut,
} from "firebase/auth";

const UserContext = createContext(null);

export default UserContext;

export const UserContextProvider = ({ children }) => {
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
		<UserContext.Provider
			value={{
				user,
				async signIn() {
					if (user === false) {
						const auth = getAuth();
						const provider = new GoogleAuthProvider();

						try {
							await signInWithPopup(auth, provider);
						} catch (err) {
							console.log(err);
						}
					}
				},
				async signOut() {
					if (user) {
						const auth = getAuth();
						try {
							await signOut(auth);
						} catch (err) {
							console.log(err);
						}
					}
				},
			}}
		>
			{children}
		</UserContext.Provider>
	);
};
