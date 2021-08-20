export type MtProtoConfig = {
  api_id: number | string;
  api_hash: string;
};

export type SignWithPhone = {
  phone_code: number | string;
  phone_number: number | string;
  phone_code_hash: string;
};

export type TgUser = {
  _: 'user';
  flags: number;
  self: boolean;
  contact: boolean;
  mutual_contact: boolean;
  deleted: boolean;
  bot: boolean;
  bot_chat_history: boolean;
  bot_nochats: boolean;
  verified: boolean;
  restricted: boolean;
  min: boolean;
  bot_inline_geo: boolean;
  support: boolean;
  scam: boolean;
  apply_min_photo: boolean;
  id: number;
  access_hash: string;
  first_name: string;
  last_name: string;
  username?: string;
  phone: string;
  photo: {
    _: 'userProfilePhoto';
    flags: number;
    has_video: boolean;
    photo_id: string;
    photo_small: PhotoSmall
    photo_big: PhotoBig
    dc_id: number;
  };
  status: Status
};


  export interface PhotoSmall {
    _: string;
    volume_id: string;
    local_id: number;
  }

  export interface PhotoBig {
    _: string;
    volume_id: string;
    local_id: number;
  }

  export interface Photo {
    _: string;
    flags: number;
    has_video: boolean;
    photo_small: PhotoSmall;
    photo_big: PhotoBig;
    dc_id: number;
  }

  export interface AdminRights {
    _: string;
    flags: number;
    change_info: boolean;
    post_messages: boolean;
    edit_messages: boolean;
    delete_messages: boolean;
    ban_users: boolean;
    invite_users: boolean;
    pin_messages: boolean;
    add_admins: boolean;
    anonymous: boolean;
    manage_call: boolean;
  }

  export interface IChat {
    _: string;
    flags: number;
    creator: boolean;
    left: boolean;
    broadcast: boolean;
    verified: boolean;
    megagroup: boolean;
    restricted: boolean;
    signatures: boolean;
    min: boolean;
    scam: boolean;
    has_link: boolean;
    has_geo: boolean;
    slowmode_enabled: boolean;
    call_active: boolean;
    id: number;
    access_hash: string;
    title: string;
    photo: Photo;
    date: number;
    version: number;
    admin_rights: AdminRights;
  }






    export interface Status {
        _: string;
        was_online: number;
    }

    export interface IUserContacts {
        _: string;
        flags: number;
        self: boolean;
        contact: boolean;
        mutual_contact: boolean;
        deleted: boolean;
        bot: boolean;
        bot_chat_history: boolean;
        bot_nochats: boolean;
        verified: boolean;
        restricted: boolean;
        min: boolean;
        bot_inline_geo: boolean;
        support: boolean;
        scam: boolean;
        apply_min_photo: boolean;
        id: number;
        access_hash: string;
        first_name: string;
        last_name: string;
        username: string;
        phone: string;
        photo: Photo;
        status: Status;
    }

