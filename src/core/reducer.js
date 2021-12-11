export const ACTIONS = {
  SET_TEMPLATES: "SET_TEMPLATES",
  SET_STEP: "SET_STEP",
  SET_NAME_DIRECTORY: "SET_NAME_DIRECTORY",
};

export function reducer(state, action) {
  switch (action.type) {
    case ACTIONS.SET_TEMPLATES:
      return {
        ...state,
        templates: action.payload,
      };
    case ACTIONS.SET_STEP:
      return {
        ...state,
        step: action.payload,
      };
    case ACTIONS.SET_NAME_DIRECTORY: 
    return {
        ...state,
        directory: action.payload
    }
    default:
      return state;
  }
}
