import {
  CANCEL_WARNING_MODAL,
  CHANGE_POST_STATUS,
  DISCARD_STATUS_MODAL,
  SHOW_HIDE_WARNING_MODAL,
  SHOW_SLIDER,
  SHOW_STATUS_MODAL,
  TOGGLE_SHOW_SLIDER
} from '../utils/constants';
import { isEmpty } from '../utils/helpers';

type HomeState = {
  showStatus: boolean;
  showSlider: boolean;
  postBody: string;
  showWarningModal: boolean;
  rows: number;
  minRows: number;
  maxRows: number;
};

type HomeActions =
  | {
    type: 'CHANGE_POST_STATUS'
    value: string
    rows: number
    scrollHeight: number
    scrollTop: number
  }
  | { type: 'TOGGLE_SHOW_SLIDER' }
  | { type: 'SHOW_SLIDER' }
  | { type: 'SHOW_STATUS_MODAL' }
  | { type: 'DISCARD_STATUS_MODAL' }
  | { type: 'SHOW_HIDE_WARNING_MODAL' }
  | { type: 'CANCEL_WARNING_MODAL' };

const homeReducer = (state: HomeState, action: HomeActions): HomeState => {
  switch (action.type) {
  case CHANGE_POST_STATUS: {
    const textareaLineHeight = 24;
    const { minRows, maxRows } = state;
    const previousRows = action.rows;
    action.rows = minRows;

    const currentRows = ~~(action.scrollHeight / textareaLineHeight);

    if (currentRows === previousRows) {
      action.rows = currentRows;
    }

    if (currentRows >= maxRows) {
      action.rows = maxRows;
      action.scrollTop = action.scrollHeight;
    }
    return {
      ...state,
      postBody: action.value,
      rows: currentRows < maxRows ? currentRows : maxRows
    };
  }
  case TOGGLE_SHOW_SLIDER:
    return {
      ...state,
      showSlider: !state.showSlider
    };
  case SHOW_SLIDER:
    return {
      ...state,
      showSlider: true
    };
  case SHOW_STATUS_MODAL:
    return {
      ...state,
      showStatus: true
    };
  case DISCARD_STATUS_MODAL:
    if (state.showWarningModal) {
      return {
        ...state,
        postBody: '',
        showStatus: false,
        showWarningModal: false
      };
    } else {
      return {
        ...state,
        postBody: '',
        showStatus: false
      };
    }
  case SHOW_HIDE_WARNING_MODAL:
    if (isEmpty(state.postBody)) {
      return {
        ...state,
        showStatus: false,
        showWarningModal: false
      };
    } else {
      return {
        ...state,
        showStatus: true,
        showWarningModal: true
      };
    }
  case CANCEL_WARNING_MODAL:
    return {
      ...state,
      showWarningModal: false
    };
  default:
    return state;
  }
};

export default homeReducer;
