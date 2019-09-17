const indicator = (state={durum:'false'},action)=>{
    switch(action.type){
        case 'LOAD_HOME':
              return {...state, durum:'true'};

    }
    return state
}

export default indicator