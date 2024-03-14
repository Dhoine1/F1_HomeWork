import React from "react";
import parse from "html-react-parser";

function City(props){
    let html = "";
    for (let i in props.obj) { 
        html += "<option>"+i+"</option>"
    }

    return (
        <>
        {parse(html)}
        </>
    )
}

export default City;