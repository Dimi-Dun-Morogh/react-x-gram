import { MtProtoConfig } from "../types";

const MTProto = require('@mtproto/core/envs/browser');

const config = {
api_id : process.env.REACT_APP_API_ID!,
api_hash :process.env.REACT_APP_API_HASH!
}


class Api {
   api;
  constructor(config: MtProtoConfig) {
    console.log('config', config)
    this.api = new MTProto(config);
  }

 private async call(method:string, params:{[key:string]: any}, options = {}):Promise<any> {
    const sleep = (milliseconds:number) => {
      return new Promise(resolve => setTimeout(resolve, milliseconds))
    }

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

  async sendCode(phone_number:string) {
    try {
      const data = await this.call('auth.sendCode', {
        phone_number,
        settings: {
          _: 'codeSettings',
        },
      })
      console.log(data);
      return data;
    } catch (error) {
      console.log(error)
    }
  }

}

const tgApi =  new Api(config);

export default tgApi;