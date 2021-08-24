const VALIDATOR_TYPE_REQUIRE = 'REQUIRE';
const VALIDATOR_TYPE_MINLENGTH = 'MINLENGTH';
const VALIDATOR_TYPE_MAXLENGTH = 'MAXLENGTH';
const VALIDATOR_TYPE_MIN = 'MIN';
const VALIDATOR_TYPE_MAX = 'MAX';
const VALIDATOR_TYPE_EMAIL = 'EMAIL';
const VALIDATOR_TYPE_FILE = 'FILE';
const VALIDATOR_TYPE_PASSWORD_CONFIRM = 'PASSWORD_CONFIRM';

export type Validator = {
  type?: string | number
  val?: string | number 
  validators?: Validator[] 
};

export const VALIDATOR_REQUIRE = (): Validator => ({ type: VALIDATOR_TYPE_REQUIRE });
export const VALIDATOR_FILE = (): Validator => ({ type: VALIDATOR_TYPE_FILE });
export const VALIDATOR_MINLENGTH = (val: number): Validator => ({
  type: VALIDATOR_TYPE_MINLENGTH,
  val: val
});
export const VALIDATOR_MAXLENGTH = (val: number): Validator => ({
  type: VALIDATOR_TYPE_MAXLENGTH,
  val: val
});
export const VALIDATOR_PASSWORD_CONFIRM = (val: string): Validator => ({
  type: VALIDATOR_TYPE_PASSWORD_CONFIRM,
  val: val
});
export const VALIDATOR_MIN = (val: number): Validator => ({ type: VALIDATOR_TYPE_MIN, val: val });
export const VALIDATOR_MAX = (val: number): Validator => ({ type: VALIDATOR_TYPE_MAX, val: val });
export const VALIDATOR_EMAIL = (): Validator => ({ type: VALIDATOR_TYPE_EMAIL });

export const validate = (value: string, validators: Validator[]): boolean => {
  let isValid = true;
  for (const validator of validators) {
    if (validator.type === VALIDATOR_TYPE_REQUIRE) {
      isValid = isValid && value.trim().length > 0;
    }
    if (validator.type === VALIDATOR_TYPE_MINLENGTH) {
      if (validator.val !== undefined) {
        isValid = isValid && value.trim().length >= validator.val;
      }
    }
    if (validator.type === VALIDATOR_TYPE_MAXLENGTH) {
      if (validator.val !== undefined) {
        isValid = isValid && value.trim().length <= validator.val;
      }
    }
    if (validator.type === VALIDATOR_TYPE_MIN) {
      if (validator.val !== undefined) {
        isValid = isValid && +value >= validator.val;
      }
    }
    if (validator.type === VALIDATOR_TYPE_MAX) {
      if (validator.val !== undefined) {
        isValid = isValid && +value <= validator.val;
      }
    }
    if (validator.type === VALIDATOR_TYPE_PASSWORD_CONFIRM) {
      if (validator.val !== undefined) {
        isValid = isValid && value === validator.val;
      }
    }
    if (validator.type === VALIDATOR_TYPE_EMAIL) {
      isValid = isValid && /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
        value);
    }
  }
  return isValid;
};