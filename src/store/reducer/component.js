import Types from "../action/types"

export function component(state = {}, action = {}) {
    switch (action.type){
        case Types.FULL_PAGE_LOADER:{
            const {showFullPageLoading,opacity} = action.payload;
            return {
                ...state,showFullPageLoading,opacity
            }
        }
        default:
            return state
    }
}


