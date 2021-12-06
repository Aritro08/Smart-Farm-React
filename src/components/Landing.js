import React from 'react';
import { Link } from 'react-router-dom';
import '../css/landing.css';
import NavComponent from './NavComponent';

const Landing = () => {
    return (
        <main>
            <div className="landing">
                <div className="container">
                    <NavComponent />
                    <div className="landing-content">
                        <h1 className="landing-head">Smart Farms</h1>
                        <p className="landing-text">Innovative solutions to help you grow healthier, higher quality crops and optimize the farming process.</p>
                        <div className="landing-ques">
                            <p className="landing-text">Some questions which we'll answer: </p>
                            <p className="landing-q">1. Which crop to plant?</p>
                            <p className="landing-q">2. Which fertilizer to use?</p>
                            <p className="landing-q">3. Which disease does your crop have?</p>
                            <p className="landing-q">4. How to cure the disease?</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="container">
                <div className="row about-us-section">
                    <h1 className="landing-head">About Us</h1>
                    <div className="col-lg-6">
                        <div className="about-us-img">
                            <img src="https://images.unsplash.com/photo-1511735643442-503bb3bd348a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OXx8Y3JvcHN8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60" alt="crop" className="img-fluid" />
                        </div>
                    </div>
                    <div className="col-lg-6">
                        <div className="about-us">
                            <h3 className="mt-4">Improving Agriculture, Improving Lives, Cultivating Crops To Make Farmers Increase
                                Profit.</h3>
                            <p className="mt-3 about-us-text">We use machine learning and deep learning technologies to help you
                                guide through
                                the entire farming process. Make informed decisions to understand the demographics of your area,
                                understand the
                                factors that affect your crop and keep them healthy for a successful yield.</p>
                        </div>
                    </div>
                </div>
                <hr />
                <div className="row services-section">
                    <h1 className="landing-head">Our Services</h1>
                    <div className="card">
                        <div className="card-body">
                            <h4 className="card-title">Crop Recommendation</h4>
                            <p className="card-text">Suggesting the optimum crops to be cultivated, based on geographical/environmental parameters.</p>
                            <Link to="/predict-crop" className="btn btn-dark">Get Started</Link>
                        </div>
                    </div>
                    <div className="card">
                        <div className="card-body">
                            <h4 className="card-title">Fertiliser Recommendation</h4>
                            <p className="card-text">Get the best fertilizer which meets the nutrient requirements of your crop, as well as builds the nutrient level of the soil.</p>
                            <Link to="/predict-fertilizer" className="btn btn-dark">Get Started</Link>
                        </div>
                    </div>
                    <div className="card">
                        <div className="card-body">
                            <h4 className="card-title">Crop Disease Detection</h4>
                            <p className="card-text">Upload an image of your crop to predict the name and causes of the disease and get suggestions to cure it.</p>
                            <Link to="/detect-disease" className="btn btn-dark">Get Started</Link>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
}

export default Landing