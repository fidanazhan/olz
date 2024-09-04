import React, { useState, useEffect } from 'react';
import '../../App.css'; // External CSS for styling


const productTypes = {
  1: { type: "Leaded Oil", color: "linear-gradient(to top, #ff0000 0%, #ff6666 80%)" },
  2: { type: "Diesel", color: "linear-gradient(to top, #f4d03f 0%, #ffeb3b 80%)" },
  3: { type: "Unleaded Oil", color: "linear-gradient(to top, #00b300 0%, #66ff66 80%)" },
};

const OilTank = ({tankNumber, capacity, productId, initialLevel }) => {
  const [level, setLevel] = useState(initialLevel);

  useEffect(() => {
    setLevel(initialLevel); // Set the initial level when the component mounts
  }, [initialLevel]);

  const product = productTypes[productId];

  return (
    // <div className="oil-tank-container">
    //   <div className="oil-tank" style={{ background: product.color }}>
    //     <div className="water-level" style={{ height: `${level}%`, background: product.color }}>
    //       <div className="bubble"></div>
    //       <div className="bubble"></div>
    //       <div className="bubble"></div>
    //       <div className="bubble"></div>
    //     </div>
    //     <div className="tank-cap"></div>
    //   </div>
    //   <p>Tank Number: {tankNumber} </p>
    //   <p>Product: {product.type}</p> 
    //   <p>Capacity: ({capacity}L)</p>
    // </div>
    // <div className="fuel-tank">
    //     <div className="cap"></div>
    //     <div className="level-lines">
    //         <div className="level-line"></div>
    //         <div className="level-line"></div>
    //         <div className="level-line"></div>
    //         <div className="level-line"></div>
    //     </div>
    //     <div className="fuel-level"></div>
    // </div>
    <div className="septic-tank">
        <div className="tank-cap left"></div>
        <div className="tank-cap right"></div>
        
        <div className="water-level" style={{ background: product.color , height: "85%"}}>
            <div className="water-line" style={{ background: product.color }}></div>
        </div>


         {/* <!-- Description section below the tank --> */}
        <div className="description">
          <p>Tank Number: {tankNumber} </p>
          <p>Product: {product.type}</p> 
          <p>Capacity: ({capacity}L)</p>
        </div>
    </div>
  );
};
export default OilTank;