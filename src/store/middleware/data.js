import networkFetch from "../network";
import { FETCH_DATA } from "../action/types";
import { fullPageLoader } from "../action"
import { getProp } from "../../Utility";

export function fetchData(store) {
    return function (next) {
        return function (action) {
            switch (action.type) {
                case FETCH_DATA: {
                    const {ownLoading,append,responseDataId} = action.payload;
                    if(ownLoading || append){
                        const extraProps = {};
                        if(append){
                            extraProps.showFooterLoading = true;
                        } else {
                            extraProps.showLoading = true;
                        }
                        next({
                            ...action,
                            payload: {...action.payload,...extraProps}
                        });
                    } else {
                        // show global loading
                        store.dispatch(fullPageLoader({showFullPageLoading: true, opacity: 0}));
                    }
                    return networkFetch({
                        ...action.payload

                    }).then(response => {
                        if(ownLoading){
                            /* will be handled with setting data in reducer */
                        } else {
                            // hide global loading
                            store.dispatch(fullPageLoader({showFullPageLoading: false}));
                        }
                        
                        let _data = JSON.parse(response);
                        return next({
                            ...action,
                            payload: {...action.payload, data: responseDataId ? getProp(_data,responseDataId)  : _data,showLoading:false,showFooterLoading:false}
                        });

                    }).catch(e => {
                        console.log("Middleware catch -->>",e)
                    })
                }

                default :
                    return next(action)
            }
        }
    }
};