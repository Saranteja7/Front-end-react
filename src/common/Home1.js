import React, { Component } from "react";
import pic5 from "../images/pic1.jpg";
import pic6 from "../images/pic4.jpg";
import pic1 from "../images/q1.jpg";
import pic2 from "../images/q2.jpg";
import pic3 from "../images/q3.jpg";
import pic4 from "../images/q4.jpg";


import './Home1.css';

export default class Home extends Component {
    constructor(props) {
        super(props);

    }
    render() {
        return (
            <div class="container">

                < h2 > Vz - Overflow</h2 >
                <div id="myCarousel" class="carousel slide" data-ride="carousel">
                    <ol class="carousel-indicators">
                        <li data-target="#myCarousel" data-slide-to="0" class="active"></li>&nbsp;
                        <li data-target="#myCarousel" data-slide-to="1"></li>&nbsp;
                        <li data-target="#myCarousel" data-slide-to="2"></li>&nbsp;
                        <li data-target="#myCarousel" data-slide-to="3"></li>&nbsp;
                        <li data-target="#myCarousel" data-slide-to="4"></li>&nbsp;
                    </ol>
                    <div class="carousel-inner">
                        <div class="item active">
                            <img src={pic1} alt="Los Angeles" className="image-carousal-edit" />
                        </div>

                        <div class="item">
                            <img src={pic2} alt="Chicago" className="image-carousal-edit" />
                        </div>

                        <div class="item">
                            <img src={pic3} alt="New york" className="image-carousal-edit" />
                        </div>
                        <div class="item">
                            <img src={pic4} alt="Los Angeles" className="image-carousal-edit" />
                        </div>
                        <div class="item">
                            <img src={pic6} alt="New york" className="image-carousal-edit" />
                        </div>
                    </div>

                    <a class="left carousel-control" href="#myCarousel" data-slide="prev">
                        <span class="glyphicon glyphicon-chevron-left"></span>
                        <span class="sr-only">Previous</span>
                    </a>
                    <a class="right carousel-control" href="#myCarousel" data-slide="next">
                        <span class="glyphicon glyphicon-chevron-right"></span>
                        <span class="sr-only">Next</span>
                    </a>
                </div>
            </div >

        );
    }

}