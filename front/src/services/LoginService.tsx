import InputSharedState from '../shared/helpers/data/InputSharedState';
import { AUserBuilder, User } from '../entities/User';
const URL = import.meta.env.VITE_BACKEND_URL_PREFIX;



class LoginService {
  async login(): Promise<void> {
    const sharedState = InputSharedState.getInstance();
    const state = sharedState.getState();
    const user : User = new AUserBuilder().Username(state['username_input'])
    .Password(state['password_input'])
    .build();

    
    try {
      const response = await fetch(`${URL}/user/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
      });

      if (response.ok) {
        console.log('User logged successfully!');
      } else {
        console.log('Failed to login user :', user.username);
      }
    } catch (error) {
      console.error('Error logging in user:', user.username, error);
    }
  }
}

export default LoginService

