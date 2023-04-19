import React from "react";
import { useForm } from "react-hook-form";

const Register = ({ onRouteChange, loadUser }) => {
  const { register, handleSubmit, watch, setValue, formState: { errors } } = useForm();

  const emailAddress = watch('emailAddress');
  const password = watch('password');
  const name = watch('name');

  const onEmailChange = (e) => {
    const { value } = e.target;
    setValue('emailAddress', value)
  }

  const onPasswordChange = (e) => {
    const { value } = e.target;
    setValue('password', value);
  }

  const onNameChange = (e) => {
    const { value } = e.target;
    setValue('name', value);
  }

  const onRegisterSubmit = () => {
    fetch('https://face-recognition-back-end.onrender.com/register', {
      method: 'post',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        email: emailAddress,
        password: password,
        name: name
      })
    })
    .then(res => res.json())
    .then(data => {
      if(data.id){
        loadUser(data);
        onRouteChange('home')
      }
    })
  }

  return (
    <article className="br4 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 center shadow-2 tc">
      <main className="pa4 black-80">
        <form className="measure">
          <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
            <legend className="f2 fw6 ph0 mh0">Register</legend>
            <div className="mt3">
              <label className="db fw6 lh-copy f5" htmlFor="name">
                Name
              </label>
              <input
                className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                type="text"
                id="name"
                onChange={onNameChange}
                {...register('name', {
                  required: 'Please enter your name!',
                  minLength: {
                    value: 3,
                    message: 'Please enter a valid name!'
                  },
                })}
              />
              <p className="f4 white">{errors.name?.message}</p>
            </div>
            <div className="mt3">
              <label className="db fw6 lh-copy f5" htmlFor="emailAddress">
                Email
              </label>
              <input
                className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                type="email"
                id="email-address"
                onChange={onEmailChange}  
                {...register('emailAddress', {
                  required: 'Please enter your email address!',
                  minLength: {
                    value: 4,
                    message: 'Please enter a valid email address!'
                  },
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: 'Please enter a valid email address!'
                  }
                })}              
              />
              <p className="f4 white">{errors.emailAddress?.message}</p>
            </div>
            <div className="mv3">
              <label className="db fw6 lh-copy f5" htmlFor="password">
                Password
              </label>
              <input
                className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                type="password"
                id="password"
                onChange={onPasswordChange}  
                {...register('password', {
                  required: 'Please create a password!',
                  minLength: {
                    value: 4,
                    message: 'Password must be at least 4 characters'
                  },
                  pattern: {
                  value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]+$/i,
                  message: 'Please enter a password with at least 1 letter and 1 number'
                  }
                })} 
              />
              <p className="f4 white">{errors.password?.message}</p>
            </div>
          </fieldset>
          <div className="">
            <input
              className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
              type="submit"
              value="Register"
              onClick={handleSubmit(onRegisterSubmit)}
            />
          </div>
        </form>
      </main>
    </article>
  );
};

export default Register;
