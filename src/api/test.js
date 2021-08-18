const MTProto = require('@mtproto/core/envs/browser');
const api_id = '7065938';
const api_hash = 'dd1415ac79b04844036f2f45dc15c254';

// 1. Create instance
const mtproto = new MTProto({
  api_id,
  api_hash,

  // storageOptions: {
  //   path: path.resolve(__dirname, './data/1.json'),
  // },
});

// 2. Print the user country code
mtproto.call('help.getNearestDc').then(result => {
  console.log('country:', result.country);
});




export  default mtproto;