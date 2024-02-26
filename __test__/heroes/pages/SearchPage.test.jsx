import { fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { SearchPage } from '../../../src/heroes/pages/SearchPage';


const mockedUseNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
   ...jest.requireActual('react-router-dom'),
   useNavigate: () => mockedUseNavigate,
}))

describe('Pruebas en SearchPage', () => {

   beforeEach(() => jest.clearAllMocks());

	it('debe demostrarse correctamente con valores por defecto', () => {
		const { container } = render(
			<MemoryRouter>
				<SearchPage />
			</MemoryRouter>
		);

		expect(container).toMatchSnapshot();
	});

	it('debe demostrar a Batman', () => {
		render(
			<MemoryRouter initialEntries={['/search?q=batman']}>
				<SearchPage />
			</MemoryRouter>
		);

		const img = screen.getByRole('img');
		expect(img.src).toContain('/heroes/dc-batman.jpg');
	});

	it('debe de mostrar un error sino se encuentra el hero', () => {
		render(
			<MemoryRouter initialEntries={['/search?q=batman123']}>
				<SearchPage />
			</MemoryRouter>
		);

		expect(screen.getByText('No hero with')).toBeTruthy();
	});

	it('debe de llamar al navigate a la pantalla nueva', () => {
		render(
			<MemoryRouter initialEntries={['/search']}>
				<SearchPage />
			</MemoryRouter>
		);

		const input = screen.getByRole('textbox');
      fireEvent.change(input,{target:{name:'searchText', value:'superman'}})

      const form = screen.getByRole('form');
      fireEvent.submit(form);

      expect(mockedUseNavigate).toHaveBeenCalledWith('?q=superman');

	});
});
