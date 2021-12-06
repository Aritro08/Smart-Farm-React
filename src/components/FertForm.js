import React from "react";
import { Markup } from "interweave";
import { useState } from "react";
import '../css/form.css';
import '../css/scroll-arrow.css';
import Loading from "./Loading";
import NavComponent from "./NavComponent";
import data from '../states_data';

const FertForm = () => {
    const [info, setInfo] = useState({
        state: '',
        district: '',
        soilType: '',
        cropType: ''
    });
    const [errors, setErrors] = useState({});
    const [fert, setFert] = useState('');
    const [loading, setLoading] = useState(false);

    const availableCities = data.states.find((s) => s.name === info.state);

    const set = (key, val) => {
        setFert('');
        setInfo({
            ...info,
            [key]: val
        });
        if(errors[key]) {
            setErrors({
                ...errors,
                [key]: null
            });
        }
    }

    const findErrors = () => {
        const {state, district, soilType, cropType} = info;
        const newErrors = {}
        if (!state || state === '') {
            newErrors.state = 'State is required';
        } 
        if (!district || district === '') {
            newErrors.district = 'District is required.';
        } 
        if (!soilType || soilType === '') {
            newErrors.soilType = 'Select a soil type.';
        }
        if (!cropType || cropType === '') {
            newErrors.cropType = 'Select a crop type.';
        }
        return newErrors;
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        const newErrors = findErrors();
        if(Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
        } else {
            setLoading(true);
            const config = {
                method: 'POST',
                headers: {
                    'accept': 'application/json',
                    'content-type': 'application/json'
                },
                body: JSON.stringify(info)
            }
            const resp = await fetch('https://whispering-wildwood-45465.herokuapp.com/fertilizer-predict', config);
            const data = await resp.json();
            setLoading(false);
            if (data.fert) {
                setFert(data.fert);
            } else {
                setFert(data.error);
            }
        }
    }

    return (
        <div className="wrapper-fert">
            <div className="container">
                <NavComponent />
                <div className="content">
                    <h1 className="header">Find Out The Ideal Fertilizer For Your Farm</h1>
                </div>
                <div className="row">
                    <div className="col-lg-6">
                        <form className="crop-form" onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label htmlFor="state">Select state name:</label>
                                <select id="state" className="form-control" value={info.state} onChange={e => set('state', e.target.value)}>
                                    <option value="">Choose State</option>
                                    {data.states.map((val, key) => {
                                        return (
                                            <option value={val.name} key={key}>{val.name}</option>
                                        );
                                    })}
                                </select>
                                {errors.state && <div className="alert alert-danger" role="alert">{errors.state}</div>}
                            </div>
                            <div className="form-group">
                                <label htmlFor="district">Select district name:</label>
                                <select id="district" className="form-control" value={info.district} onChange={e => set('district', e.target.value)}>
                                    <option value="">Choose City</option>
                                    {availableCities?.cities.split("|").map((val, key) => {
                                        return (
                                            <option value={val} key={key}>{val}</option>
                                        )
                                    })}
                                </select>
                                {errors.district && <div className="alert alert-danger" role="alert">{errors.district}</div>}
                            </div>
                            <div className="form-group">
                                <label htmlFor="soil-type">Select soil type:</label>
                                <select className={errors.soilType ? "form-control invalid" : "form-control"} id="soil-type" onChange={e => set('soilType', e.target.value)} value={info.soilType}>
                                    <option value="" disabled>Click here to select</option>
                                    <option value="sandy">Sandy</option>
                                    <option value="loamy">Loamy</option>
                                    <option value="black">Black</option>
                                    <option value="red">Red</option>
                                    <option value="clayey">Clay</option>
                                </select>
                                {errors.soilType && <div className="alert alert-danger" role="alert">{errors.soilType}</div>}
                            </div>
                            <div className="form-group">
                                <label htmlFor="crop-type">Select crop type:</label>
                                <select className={errors.cropType ? "form-control invalid" : "form-control"} id="crop-type" onChange={e => set('cropType', e.target.value)} value={info.cropType}>
                                    <option value="" disabled>Click here to select</option>
                                    <option value="maize">Maize</option>
                                    <option value="sugarcane">Sugarcane</option>
                                    <option value="cotton">Cotton</option>
                                    <option value="tobacco">Tobacco</option>
                                    <option value="paddy">Paddy</option>
                                    <option value="wheat">Wheat</option>
                                    <option value="millets">Millets</option>
                                    <option value="oil seeds">Oils Seeds</option>
                                    <option value="pulses">Pulses</option>
                                    <option value="ground nuts">Ground Nuts</option>
                                </select>
                                {errors.cropType && <div className="alert alert-danger" role="alert">{errors.cropType}</div>}
                            </div>
                            <button type="submit" className="btn btn-dark">Submit</button>
                        </form>
                        {fert && <div className="scroll-down">
                            {loading && <Loading />}
                            <div className="arrow">
                                <span></span>
                                <span></span>
                                <span></span>
                            </div>
                        </div>}
                    </div>
                    <div className={fert.length>100 ? "col-lg-6" : "col-lg-6 vcentre"}>
                        <div className="result">
                            {loading && <Loading />}
                            <Markup content={fert}/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default FertForm; 