import { useReducer } from 'react';
import { AuthContext } from './AuthContext';
import { authReducer } from './authReducer';
import { types } from '../types/types';

const init = () => {
	const user = JSON.parse(localStorage.getItem('user'));

	return {
		logged: !!user,
		user,
	};
};

export const AuthProvider = ({ children }) => {
	const [authState, dispatch] = useReducer(authReducer, {}, init);

	const login = (name = '') => {
		const action = {
			type: types.login,
			payload: name,
		};

		localStorage.setItem('user', JSON.stringify(name));
		dispatch(action);
	};

   const logout = () => {
      localStorage.removeItem('user');
      const action = {
			type: types.logout,
		};
      dispatch(action)
   };

	return (
		<AuthContext.Provider value={{ ...authState, login, logout }}>{children}</AuthContext.Provider>
	);
};
