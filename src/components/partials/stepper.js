import React from 'react';


const Stepper = (props) => {
  const { step } = props;

  return (
    <div className="stepbox">
      <ul className="stepbar">
        <li className={`${step === 0 ? "step_active step_highlight" : ""} ${step > 0 ? "step_done" : ""}`}>Customer Informations</li>
        <li className={`${step === 1 ? "step_active step_highlight" : ""} ${step > 1 ? "step_done" : ""}`}>Billing Details</li>
        <li className={`${step === 2 ? "step_active step_highlight" : ""} ${step}`}>Pay</li>
      </ul>
    </div>
  )
}

export default Stepper;