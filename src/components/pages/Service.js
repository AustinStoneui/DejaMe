
import React, { useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import "../Service.css";

/**
 * @component Form
 * @props - { object } -  config
 */
const Form = (props) => {
  const [mailSent, setmailSent] = useState(false);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({});

  /**
  * @function handleFormSubmit
  * @param e { obj } - form event
  * @return void
  */
  const handleFormSubmit = e => {
    e.preventDefault();
    axios({
      method: "post",
      url: `${process.env.REACT_APP_API}`,
      headers: { "content-type": "application/json" },
      data: formData
    })
      .then(result => {
        if (result.data.sent) {
          setmailSent(result.data.sent)
          setError(false)
        } else {
          setError(true)
        }
      })
      .catch(error => setError(error.message));
  };
  /**
    * @function handleChange
    * @param e { obj } - change event
    * @param field { string } - namve of the field
    * @return void
    */
  const handleChange = (e, field) => {
    let value = e.target.value;
    setFormData({
      ...formData,
      [field]: value,
    });
  };

  const Config = {
    api: `${process.env.REACT_APP_API}`,
    title: 'Contact Me',
    description: 'Write us about your request, We\'ll get back to you within 24 hours.',
    successMessage: 'Thank you for contcting me.',
    errorMessage: 'Please Fill the complete form',
    fields: {
      firstName: '',
      lastName: '',
      email: '',
      msg: ''
    },
    fieldsConfig: [
      { id: 1, label: 'First Name', fieldName: 'firstName', type: 'text', placeholder: 'Your First Name', isRequired: true, klassName: 'first-name-field' },
      { id: 2, label: 'Last Name', fieldName: 'lastName', type: 'text', placeholder: 'Your Last Name', isRequired: true, klassName: 'last-name-field' },
      { id: 3, label: 'Email', fieldName: 'email', type: 'email', placeholder: ' Your Email', isRequired: true, klassName: 'email-field' },
      { id: 4, label: 'Message', fieldName: 'msg', type: 'textarea', placeholder: 'Write something.....', isRequired: true, klassName: 'message-field' }
    ]
  }

  const { title, description, successMessage, errorMessage, fieldsConfig } = Config;

  return (
    <div className="contact-form">
      <div className="contact-form__header">
        <h2>{title}</h2>
        <p>{description}</p>
      </div>
      <div className="contact-form__container">
        <div>
          <form action="#">
            {fieldsConfig &&
              fieldsConfig.map(field => {
                return (
                  <React.Fragment key={field.id}>
                    {field.type !== "textarea" ? (
                      <React.Fragment>
                        <label>{field.label}</label>
                        <input
                          type={field.type}
                          className={field.klassName}
                          placeholder={field.placeholder}
                          value={field.name}
                          onChange={e => handleChange(e, field.fieldName)}
                        />
                      </React.Fragment>
                    ) : (
                        <React.Fragment>
                          <label>{field.label}</label>
                          <textarea className={field.klassName} placeholder={field.placeholder} onChange={e => handleChange(e, field.fieldName)} value={field.name} />
                        </React.Fragment>
                      )}
                  </React.Fragment>
                );
              })}
            <input type="submit" onClick={e => handleFormSubmit(e)} value="Submit" />
            <div>
              {mailSent && <div className="sucsess">{successMessage}</div>}
              {error && <div className="error">{errorMessage}</div>}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Form;
//propTypes for the component
Form.propTypes = {
  config: PropTypes.object.isRequired
};


