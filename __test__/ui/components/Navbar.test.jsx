import { fireEvent, render, screen } from '@testing-library/react';
import { AuthContext } from '../../../src/auth/context';
import { Navbar } from '../../../src/ui/components/Navbar';
import { MemoryRouter, useNavigate } from 'react-router-dom';

const mockedUseNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
   ...jest.requireActual('react-router-dom'),
   useNavigate: () => mockedUseNavigate,
}))

describe('Pruebas en Navbar', () => {

   const contextValue = {
      logged: true,
      user: 'Juan',
      logout: jest.fn(),
   };

   beforeEach(() => jest.clearAllMocks());
	it('debe de mostrar el nombre del usuario', () => {
		

		render(
			<MemoryRouter>
				<AuthContext.Provider value={contextValue}>
					<Navbar />
				</AuthContext.Provider>
			</MemoryRouter>
		);
      expect(screen.getByText(contextValue.user)).toBeTruthy();
	});

	it('debe de llamar el logout y navigate cuando se hace click en el boton', () => {

		render(
			<MemoryRouter>
				<AuthContext.Provider value={contextValue}>
					<Navbar />
				</AuthContext.Provider>
			</MemoryRouter>
		);

      const logoutBtn = screen.getByRole('button');
      fireEvent.click(logoutBtn);

      expect(contextValue.logout).toHaveBeenCalled();
      expect(mockedUseNavigate).toHaveBeenCalledWith("/login", {"replace": true});

   });
});
