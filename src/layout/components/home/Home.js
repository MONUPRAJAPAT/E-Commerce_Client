import React from "react";
import Banner from '../../../assets/img/people-run-sale-store-mall-market/2209_w048_n005_340b_p1_339.jpg';
import LandingPageImage from '../../../assets/img/sale 1.png';
import {Link} from "react-router-dom";

let Home=()=>{
    return(
        <React.Fragment>
            <div className="landing-div mt-2">
                <div className="wrapper">
                    <div className="row">
                        <div className="col-md-7">
                            <div className="d-flex h-100 flex-column justify-content-center m-5">
                                <h3 className="display-4 text-white">Welcome to the</h3>
                                <h3 className="display-3 text-info">WardrobeWorld</h3>
                                <p className="lead text-white h6 mt-3">Check New Arrivals Here...</p>
                                <div>
                                    <Link to={'/products/men'} className="btn btn-info m-3">Shop Now</Link>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-5 mt-5">
                            <img src={LandingPageImage} width="450" height="450" alt=""/>
                            <div className="text-white text-center m-4">
                                <h6>A multi-brand Online Shopping Store</h6>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
};
export default Home;