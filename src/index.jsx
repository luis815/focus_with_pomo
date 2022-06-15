import React, { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

import { PomoContextProvider } from "./components/pomo-context.jsx";
import { RemindersContextProvider } from "./components/reminders-context.jsx";
import { SettingsContextProvider } from "./components/settings-context.jsx";
import { UserContextProvider } from "./components/user-context.jsx";
import DefaultLayout from "./components/default-layout.jsx";

import HomeView from "./views/home.jsx";
import SettingsView from "./views/settings.jsx";
import PageNotFoundView from "./views/page-not-found.jsx";

import "./styles/base.scss";

const firebaseConfig = {
	apiKey: "AIzaSyDtvE0ai_iUbwtC29AN1RU36qxzY1Cf3O4",
	authDomain: "focus-with-pomo.firebaseapp.com",
	projectId: "focus-with-pomo",
	storageBucket: "focus-with-pomo.appspot.com",
	messagingSenderId: "430422384839",
	appId: "1:430422384839:web:2b397135a2272315f75ee2",
	measurementId: "G-2YXKH6XLG6",
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

ReactDOM.createRoot(document.getElementById("root")).render(
	<UserContextProvider>
		<SettingsContextProvider>
			<PomoContextProvider>
				<RemindersContextProvider>
					<BrowserRouter>
						<Routes>
							<Route element={<DefaultLayout />}>
								<Route path="/settings" element={<SettingsView />} />
								<Route path="/" element={<HomeView />} />
							</Route>
							<Route path="*" element={<PageNotFoundView />} />
						</Routes>
					</BrowserRouter>
				</RemindersContextProvider>
			</PomoContextProvider>
		</SettingsContextProvider>
	</UserContextProvider>
);
