import InputSharedState from '../../shared/helpers/data/InputSharedState';
import { AUserBuilder, User } from '../../entities/User';
import ILoginService from '../ILoginService';

const URL = import.meta.env.VITE_BACKEND_URL_PREFIX;

class LoginServiceImpl implements ILoginService {

  async login(serviceData: any, setCookieAndRedirectFn: (name: string, value: string, options?: any) => void): Promise<boolean> {
    const sharedState = InputSharedState.getInstance();
    const state = sharedState.getState();
    const user: User = new AUserBuilder()
      .Username(state[serviceData.inputIdentifier.username])
      .Password(state[serviceData.inputIdentifier.password])
      .build();

    try {
      const response = await fetch(`${URL}${serviceData.resource}`, {
        ...serviceData.params,
        body: JSON.stringify(user),
      });
      if (response.ok) {
        console.log(serviceData.messages.success);
        setCookieAndRedirectFn.apply(null, ['username', user.username]);

      } else {
        console.log(serviceData.messages.failure, user.username);
      }
    } catch (error) {
      console.error(serviceData.messages.error, user.username, error);
    }
    return true;
  }
}

export default LoginServiceImpl;
