import React from 'react';

export default ({ input, label, type, meta: { error, touched } }) => {
  return (
    <fieldset className="auth-fieldset">
      <label className="auth-label">{label}</label>
      <br/>
      <input {...input} type={type} className="auth-input" />
      <div className="auth-warning" >
        {touched && error}
      </div>
      <div className="after"></div>
    </fieldset>
  );
};
