import logger from '../helpers/logger';
import {
  IChat,
  IUserContacts,
  MtProtoConfig,
  SignWithPhone,
  TgUser,
} from '../types';

const MTProto = require('@mtproto/core/envs/browser');

const NAMESPACE = 'api/telegram';

const config = {
  api_id: process.env.REACT_APP_API_ID!,
  api_hash: process.env.REACT_APP_API_HASH!,
  // test: true,
};

class Api {
  api;
  constructor(config: MtProtoConfig) {
    this.api = new MTProto(config);
  }

  private async call(
    method: string,
    params: { [key: string]: any } = {},
    options = {},
  ): Promise<any> {
    const sleep = (milliseconds: number) => {
      return new Promise((resolve) => setTimeout(resolve, milliseconds));
    };

    try {
      const result = await this.api.call(method, params, options);

      return result;
    } catch (error) {
      console.log(`${method} error:`, error);

      const { error_code, error_message } = error;

      if (error_code === 420) {
        const seconds = Number(error_message.split('FLOOD_WAIT_')[1]);
        const ms = seconds * 1000;

        await sleep(ms);

        return this.call(method, params, options);
      }

      if (error_code === 303) {
        const [type, dcIdAsString] = error_message.split('_MIGRATE_');

        const dcId = Number(dcIdAsString);

        // If auth.sendCode call on incorrect DC need change default DC, because
        // call auth.signIn on incorrect DC return PHONE_CODE_EXPIRED error
        if (type === 'PHONE') {
          await this.api.setDefaultDc(dcId);
        } else {
          Object.assign(options, { dcId });
        }

        return this.call(method, params, options);
      }

      return Promise.reject(error);
    }
  }

  async sendCode(phone_number: string) {
    try {
      const data = await this.call('auth.sendCode', {
        phone_number,
        settings: {
          _: 'codeSettings',
        },
      });
      return data;
    } catch (error) {
      logger.error(NAMESPACE, error.message, error);
    }
  }

  async signIn(signData: SignWithPhone) {
    try {
      const data = await this.call('auth.signIn', { ...signData });
      console.log(data);
      return data;
    } catch (error) {
      logger.error(NAMESPACE, error.message, error);
    }
  }

  async signUp(phone_number: string, phone_code_hash: string) {
    try {
      const data = await this.call('auth.signUp', {
        phone_number,
        phone_code_hash,
        first_name: 'X-gram',
        last_name: 'react',
      });
      console.log(data);
      return data;
    } catch (error) {
      logger.error(NAMESPACE, error.message, error);
    }
  }

  async getContacts() {
    try {
      const data = await this.call('contacts.getContacts');

      return data.users as IUserContacts[];
    } catch (error) {
      logger.error(NAMESPACE, error.message, error);
    }
  }

  async logOut() {
    return await this.call('auth.logOut');
  }

  async getUser() {
    try {
      const user = await this.api.call('users.getFullUser', {
        id: {
          _: 'inputUserSelf',
        },
      });
      console.log('invoke telegram.getUser', user);
      return user.user as TgUser;
    } catch (error) {
      logger.error(NAMESPACE, error.error_message, error);
      return null;
    }
  }

  async getAllChats() {
    try {
      const data = await this.call('messages.getAllChats', {
        except_ids: [],
      });
      return data as IChat[];
    } catch (error) {
      logger.error(NAMESPACE, error.error_message, error);
    }
  }
}

const tgApi = new Api(config);

export default tgApi;
