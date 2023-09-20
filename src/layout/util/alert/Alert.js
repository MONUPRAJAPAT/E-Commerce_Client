import React from "react";
import {useSelector} from "react-redux";
import * as alertReducer from "../../../redux/alert/alert.reducer";
let Alert=()=>{
    let alertInfo=useSelector((state)=>{
        return state[alertReducer.alertFeatureKey];
    });
    let {alertMessages}=alertInfo;
    return(
        <React.Fragment>
            {
                alertMessages.length >0 ?
                    <React.Fragment>
                        <div className={`alert alert-${alertMessages[0].color} alert-dismissible m-2 p-4 fixed-top`}>
                            <button type="button" className="close" data-dismiss="alert"><i className="fa fa-times-circle"/></button>
                            {
                                alertMessages.map((alert)=>{
                                    return(
                                        <div key={alert.id}>
                                            <small className="font-weight-bold">{alert.message}</small>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </React.Fragment>
                    : null
            }
        </React.Fragment>
    )
};
export default Alert;