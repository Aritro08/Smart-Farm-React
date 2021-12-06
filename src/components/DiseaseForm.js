import React, { useState } from "react";
import { Markup } from "interweave";
import Loading from "./Loading";
import NavComponent from "./NavComponent";
import '../css/scroll-arrow.css';

const DiseaseForm = () => {
    const [file, setFile] = useState('');
    const [filename, setFilename] = useState('Upload an image of your crop');
    const [remedy, setRemedy] = useState('')
    const [loading, setLoading] = useState(false);

    const set = event => {
        setFile(event.target.files[0]);
        setFilename(event.target.files[0].name);
        setRemedy('');
        const reader = new FileReader();
        reader.onload = () => {
            const img = document.getElementById('preview-img');
            img.src = reader.result;
        }
        reader.readAsDataURL(event.target.files[0]);
    } 

    const handleSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append('file', file);
        const config = {
            method: 'POST',
            body: formData
        }
        try {
            setLoading(true);
            const res = await fetch('/disease-predict', config);
            const data = await res.json();
            setLoading(false);
            if(data.remedy) {
                setRemedy(data.remedy);
            } else {
                setRemedy(data.error);
            }
        } catch (error) {
            setRemedy(error);
        }
    }

    return (
        <div className="wrapper-disease">
            <div className="container">
                <NavComponent />
                <div className="content">
                    <h1 className="header">Check Whether Your Crop Is Healthy</h1>
                </div>
                <div className="row file-row">
                    <div className="col-lg-6">
                        <form className="file-upload" onSubmit={handleSubmit}>
                            <div className="custom-file">
                                <input type="file" className="custom-file-input" id="customFile" onChange={set} />
                                <label className="custom-file-label" htmlFor="customFile">{filename}</label>
                            </div>
                            {file && <img id="preview-img" className="img-fluid prev-img" alt={filename} />}
                            <button className="btn btn-dark file-submit" disabled={!file} type="submit">Upload</button>
                        </form>
                        {remedy && <div className="scroll-down">
                            {loading && <Loading />}
                            <div className="arrow">
                                <span></span>
                                <span></span>
                                <span></span>
                            </div>
                        </div>}
                    </div>
                    <div className={remedy.length>100 ? "col-lg-6" : "col-lg-6 vcentre"}>
                        <div className="remedy">
                            {loading && <Loading />}
                            <Markup content={remedy} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DiseaseForm;