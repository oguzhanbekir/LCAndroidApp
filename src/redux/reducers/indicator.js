const indicator = (state = {isLoading: true}, action) => {
  switch (action.type) {
    case 'LOAD_HOME':
      return {...state, isLoading: false};
      break;
    case "HIDE_LOADER":
      return {...state, isLoading: false};
      break;
    default:
      return state;
  }
};

export default indicator;
