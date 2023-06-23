import InputSharedState from '../../shared/helpers/data/InputSharedState';
import { AUserBuilder, User } from '../../entities/User';
import IUserService from '../IUserService';

const URL = import.meta.env.VITE_BACKEND_URL_PREFIX;

class UserServiceImpl implements IUserService {

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

  async latestReadings(serviceData: any) : Promise<any> {
    let result : any;
    try {
      const response = await fetch(`${URL}${serviceData.resource}`, {
        ...serviceData.params,
      });
      result = await response.json()
      if (result) {
        console.log(result);
      } else {
        console.log(serviceData.messages.failure);
      }
    } catch (error) {
      console.error(serviceData.messages.error, error);
    }
    return result;
  }

}

export default UserServiceImpl;
