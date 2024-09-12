import React, { useState, useEffect } from 'react';
import '../../App.css';

const OilTank = ({tankNumber, capacity, initialLevel, tankProduct, tankProductColor, status }) => {
  const [level, setLevel] = useState(initialLevel);

  useEffect(() => {
    setLevel(initialLevel);
  }, [initialLevel]);

  return (

    <div className="septic-tank" >
        <div className="tank-cap left"></div>
        <div className="tank-cap right"></div>
        
        <div className="water-level" style={{ background: tankProductColor , height: "85%"}}>
            <div className="water-line" style={{ background: tankProductColor }}></div>
        </div>

        

        <div className="description" style={{height: "50px"}}>
          <p>Tank Number: {tankNumber} </p>
          <p>Capacity: ({capacity}L)</p>
          <p>Product: {tankProduct}</p>
          <p>Status: {status}</p>
        </div>
    </div>
  );
};
export default OilTank;