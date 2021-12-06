import React from "react";
import { useState } from "react";
import '../css/form.css';
import Loading from "./Loading";
import NavComponent from "./NavComponent";
import data from '../states_data';

const CropForm = () => {
    const [cropInfo, setCropInfo] = useState({
        state: '',
        district: '',
        soilType: '',
        season: ''
    });
    const [errors, setErrors] = useState({});
    const [result, setResult] = useState('');
    const [loading, setLoading] = useState(false);

    const availableCities = data.states.find((s) => s.name === cropInfo.state);

    const set = (key, val) => {
        setResult('');
        setCropInfo({
            ...cropInfo,
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
        const {state, district, soilType, season} = cropInfo;
        const newErrors = {}
        if (!state || state === '') {
            newErrors.state = 'State is required';
        } 
        if (!district || district === '') {
            newErrors.district = 'District is required';
        } 
        if (!soilType || soilType === '') {
            newErrors.soilType = 'Select a soil type';
        }
        if (!season || season === '') {
            newErrors.season = 'Select a season';
        }
        return newErrors;
    }
    
    const handleSubmit = async (event) => {
        event.preventDefault();
        const newErrors = findErrors();
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors)
        } else {
            setLoading(true);
            const config = {
                method: 'POST',
                headers: {
                    'accept': 'application/json',
                    'content-type': 'application/json'
                },
                body: JSON.stringify(cropInfo)
            }
            const res = await fetch('/crop-predict', config);
            const data = await res.json();
            setLoading(false);
            if(data.crop) {
                setResult(data.crop);
            } else {
                setResult(data.error);
            }
        }
    }
    
    return (
        <div className="wrapper-crop">
            <div className="container">
                <NavComponent />
                <div className="content">
                    <h1 className="header">Find Out The Ideal Crop For Your Farm</h1>
                </div>
                <div className="row">
                    <div className="col-md-6">
                        <form onSubmit={handleSubmit} className="crop-form">
                            <div className="form-group">
                                <label htmlFor="state">Select state name:</label>
                                <select id="state" className="form-control" value={cropInfo.state} onChange={e => set('state', e.target.value)}>
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
                                <label htmlFor="district">Select city name:</label>
                                <select id="district" className="form-control" value={cropInfo.district} onChange={e => set('district', e.target.value)}>
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
                                <select className={errors.soilType ? "form-control invalid" : "form-control"} id="soil-type" onChange={e => set('soilType', e.target.value)} value={cropInfo.soilType}>
                                    <option value="" disabled>Click here to select</option>
                                    <option value="Coarse loamy and fine loamy associations">Coarse and fine loamy association</option>
                                    <option value="Sandy loam soil">Sandy loamy soil</option>
                                    <option value="deep Sandy loam soil">Deep sandy loamy soil</option>
                                    <option value="clay loam soil">Clay loamy soil</option>
                                    <option value="sandy soils">Sandy soil</option>
                                    <option value="Alluvial plains">Alluvial soil</option>
                                    <option value="Light and Sandy loam">Light and sandy loamy soil</option>
                                </select>
                                {errors.soilType && <div className="alert alert-danger" role="alert">{errors.soilType}</div>}
                            </div>
                            <div className="form-group">
                                <label htmlFor="season">Select crop season:</label>
                                <select name="season" id="season" className={errors.season ? "form-control invalid" : "form-control"} onChange={e => set('season', e.target.value)} value={cropInfo.season}>
                                    <option value="" disabled>Click here to select</option>
                                    <option value="kharif">Kharif</option>
                                    <option value="rabi">Rabi</option>
                                </select>
                                {errors.season && <div className="alert alert-danger" role="alert">{errors.season}</div>}
                            </div>
                            <button type="submit" className="btn btn-dark">Submit</button>
                        </form>
                    </div>
                    <div className="col-md-6 display">
                        {loading && <Loading />}
                        {result && <div className="display-crop">
                            <h2>Your suggested crop is:</h2>
                            <h1>{result}</h1>
                        </div>}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CropForm;