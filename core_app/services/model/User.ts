import {CONSTANTS} from 'core_app/common';
export class User {
  id: number = 0;
  token: string = CONSTANTS.STR_EMPTY;
  isadmin: string = CONSTANTS.STR_EMPTY;
  infoapp: string = CONSTANTS.STR_EMPTY; // "{"facebook":"facebook/giamsatdulieu", "zalo":"GSDL","web":"giamsatdulieu.com"}"
  linklogo: string = CONSTANTS.STR_EMPTY;
  name: string = CONSTANTS.STR_EMPTY;
  mail: string = CONSTANTS.STR_EMPTY;
  linkRSSI: string = CONSTANTS.STR_EMPTY;
  linkIMEIDetail: string = CONSTANTS.STR_EMPTY;
  constructor() {}

  isAdmin(): boolean {
    return this.isadmin === CONSTANTS.ADMIN;
  }
}