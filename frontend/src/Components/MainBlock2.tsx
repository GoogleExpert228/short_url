import React from "react";
import "../components/styles/mainBlock2.css";

function MainBlock2() {
    return (
        <div className="mainBlock2">
            <div className="mainBlock2_title">
                <h2>What is the URL shortener?</h2>
            </div>
            <div className="mainBlock2_description">
                <p>
                    Make your URLs shorter and easier to share with our reliable URL shortening service. <br />
                    Simply paste your long link, and we'll generate a compact, shareable version in just a few <br /> clicks. 
                    Whether you're sharing links on social media, through emails, or any other platform, <br /> our service ensures a clean and professional look. 
                    Additionally, you can track the performance of your shortened links, giving you valuable insights into click-through rates <br /> and user engagement.
                    It's fast, free, and user-friendly!
                </p>
            </div>
        </div>
    );
}

export default MainBlock2;