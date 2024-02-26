import { authReducer } from '../../../src/auth/context/authReducer';
import { types } from '../../../src/auth/types/types';

describe('Pruebas en authReducer', () => {
	it('debe de retornar el estado por defecto', () => {
		const state = authReducer({logged: false}, {});
      expect(state.logged).toBeFalsy();
	});

   it('debe de (login) llamar el login autenticar y establacer el usuario', () => {
      const action = {
         type: types.login,
         payload: {
            name: 'Juan'
         }
      }
      const state = authReducer({logged: false}, action);
      expect(state.logged).toBeTruthy();
      expect(action.payload.name).toBe('Juan');
   });

   it('debe de (logout) borrar el name del usuario y logged en false', () => {
      
      const state = {
         logged: true,
         user: 'Juan',
      }

      const action = {
         type: types.logout,
      }

      const newState = authReducer (state, action)
      expect(newState.logged).toBeFalsy();
   });
});
