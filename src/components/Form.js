import React from 'react';
import './Form.css';

const Form = ({title, fields, onSubmit, onCancel, submitLabel, cancelLabel}) =>{
    return(
        <div className="form-container">
            <h1>{title}</h1>
            <form className="form" onSubmit={onSubmit}>
                {fields.map((field, index) => (
                    <div key={index} className="form-group">
                        <label htmlFor={field.id}>{field.label}</label>
                        <input
                            type={field.type || 'text'}
                            id={field.id}
                            value={field.value}
                            onChange={field.onChange}
                            required={field.required || false}
                        />
                    </div>
                ))}
                <div className="button-group">
                        <button type="submit" className="form-button">
                            {submitLabel || 'Submit'}
                        </button>
                    {onCancel && (
                        <button type="button" className="form-button" onClick={onCancel}>
                            {cancelLabel || 'Cancel'}
                        </button>
                    )}
                </div>
            </form>
        </div>
    );
};

export default Form;
