const Indicator = (state = {isLoading: true}, action) => {
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

export default Indicator;
