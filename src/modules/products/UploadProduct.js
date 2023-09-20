import React, {useState} from "react";
import * as productActions from '../../redux/products/products.actions';
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from 'react-router-dom';
import * as userReducer from '../../redux/users/users.reducer';
import NotAuthorised from '../../assets/img/not aurthorised.jpg';
import {notInitialized} from "react-redux/es/utils/useSyncExternalStore";


let UploadProduct=()=>{
    let dispatch=useDispatch();
    let navigate=useNavigate();
    let userInfo=useSelector((state)=>{
       return state[userReducer.userFeatureKey];
    });
    let {user} = userInfo;
    let isAuthenticated=user.isAuthenticated;
    let [product,setProduct]=useState({
        name:'',
        brand:'',
        price:'',
        image:'',
        qty:'',
        category:'',
        description:'',
        usage:''
    });
    let updateInput=(event)=>{
        setProduct({
            ...product,
            [event.target.name]:event.target.value
        });
    }
    let updateImage= async (event)=>{
        let imageFile= event.target.files[0];
        let base64ImageFormat= await base64Image(imageFile);
        setProduct({
            ...product,
            [event.target.name] : base64ImageFormat
        });
    }


    let base64Image=(imageFile)=>{
        return new Promise((resolve,reject)=>{
            let fileReader = new FileReader();
            fileReader.readAsDataURL(imageFile);
            fileReader.addEventListener('load',()=>{
                if (fileReader.result)
                    resolve(fileReader.result);
                else
                    reject('Error Occured');
            })
        })
    }
    let submitUploadProduct=(event)=>{
        event.preventDefault();
        dispatch(productActions.uploadProduct(product,navigate));
    }
    return(
        isAuthenticated ?  <React.Fragment>
            <section className="bg-brown-single p-2">
                <div className="container">
                    <div className="row">
                        <div className="col">
                            <h5 className="font-weight-bold"><i className="fa fa-file-upload"/> Upload Product</h5>
                        </div>
                    </div>
                </div>
            </section>
            <section>
                <div className="container my-5">
                    {/*<pre>{JSON.stringify(product)}</pre>*/}
                    <div className="row">
                        <div className="col-md-8 bg-light p-4">
                            <form action="" onSubmit={submitUploadProduct}>
                                <div className="form-group">
                                    <input
                                        name="name"
                                        value={product.name}
                                        onChange={updateInput}
                                        required
                                        type="text" className="form-control" placeholder="Name"/>
                                </div>
                                <div className="form-group">
                                    <input
                                        name="brand"
                                        required
                                        value={product.brand}
                                        onChange={updateInput}
                                        type="text" className="form-control" placeholder="Brand"/>
                                </div>
                                <div className="form-group">
                                    <input
                                        name="price"
                                        required
                                        value={product.price}
                                        onChange={updateInput}
                                        type="number" className="form-control" placeholder="Price"/>
                                </div>
                                <div className="form-group">
                                    <div className="custom-file">
                                        <input
                                            required
                                            name="image"
                                            onChange={updateImage}
                                            type="file" className="custom-file-input" id="customFile"/>
                                        <label className="custom-file-label" htmlFor="customFile">{
                                            product.image.length >0 ? <img src={product.image} width="20" height="30" alt=""/>: 'Product Image'
                                        }</label>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <input
                                        required
                                        name="qty"
                                        value={product.qty}
                                        onChange={updateInput}
                                        type="number" className="form-control" placeholder="Qty"/>
                                </div>
                                <div className="form-group">
                                    <select
                                        required
                                        name="category"
                                        value={product.category}
                                        onChange={updateInput}
                                        className="form-control">
                                        <option value="">Select Category</option>
                                        <option value="WOMEN">WOMEN</option>
                                        <option value="MEN">MEN</option>
                                        <option value="KIDS">KIDS</option>
                                    </select>
                                </div>
                                <div className="form-group">
                                   <textarea
                                       required
                                       name="description"
                                       value={product.description}
                                       onChange={updateInput}
                                       cols="30" rows="3" className="form-control" placeholder="Description"/>
                                </div>
                                <div className="form-group">
                                   <textarea
                                       required
                                       name="usage"
                                       value={product.usage}
                                       onChange={updateInput}
                                       cols="30" rows="3" className="form-control" placeholder="Usage"/>
                                </div>
                                <div>
                                    <input type="submit" className="btn btn-primary" value="Upload"/>
                                </div>

                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </React.Fragment> : <React.Fragment>
        <div className="text-center mt-5">
            <img src={NotAuthorised} width="650" height="500" alt=""/>
            {/*<h2 className="text-danger">Sorry, You are not Authorised to Access this page :(</h2>*/}
        </div>
    </React.Fragment>
    )
};
export default UploadProduct;