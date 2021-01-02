import {CONSTANTS} from 'core_app/common';
export class User {
  id: number = 0;
  token: string = CONSTANTS.STR_EMPTY;
  isadmin: string = CONSTANTS.STR_EMPTY;
  infoapp: string = CONSTANTS.STR_EMPTY;
  linklogo: string = CONSTANTS.STR_EMPTY;

  constructor() {}
}

Object.defineProperty(User.prototype, 'isAdmin', {
  get: function () {
    return this.isadmin === CONSTANTS.ADMIN;
  },
});
