import { render, screen } from '@testing-library/react';
import { AuthContext } from '../../src/auth';
import { MemoryRouter } from 'react-router-dom';
import { AppRouter } from '../../src/router/AppRouter';

describe('Pruebas en AppRouter', () => {
	it('debe de mostrar el login si no esta autenticado', () => {
		const contextValue = {
			logged: false,
		};

		render(
			<MemoryRouter initialEntries={['/marvel']}>
				<AuthContext.Provider value={contextValue}>
					<AppRouter />
				</AuthContext.Provider>
			</MemoryRouter>
		);

      expect(screen.getAllByText('Login').length).toBe(2);
	});

   it('debe de mostrar el componente de Marvel si está autenticado', () => {
      const contextValue = {
			logged: true,
         user: 'Juan',
		};

		render(
			<MemoryRouter initialEntries={['/login']}>
				<AuthContext.Provider value={contextValue}>
					<AppRouter />
				</AuthContext.Provider>
			</MemoryRouter>
		);
      
      expect(screen.getByText('Marvel Comics')).toBeTruthy();
   });
});

