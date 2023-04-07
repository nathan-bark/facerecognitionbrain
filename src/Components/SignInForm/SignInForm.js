import React from "react";
import { useForm } from 'react-hook-form';

const SignInForm = ({ onRouteChange, loadUser }) => {
  

  const { register, handleSubmit, watch, setValue, formState: { errors } } = useForm()

  const userEmail = watch('userEmail')
  const userPassword = watch('userPassword');

  const onEmailChange = (e) => {
    const { value } = e.target; 
    setValue('userEmail', value);
    
  }

  const onPasswordChange = (e) => {
    const { value } = e.target;
    setValue('userPassword', value);
    
  }
  const onSignIn = () => {
    fetch('http://localhost:3000/signin', {
      method: 'post',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        email: userEmail,
        password: userPassword
      })
    })
    .then(res => res.json())
    .then(data => {
      if (data.id){
        loadUser(data);
        onRouteChange("home");
      } else {
        const wrongPassword = document.getElementById('error-message');
        wrongPassword.classList.remove('dn');
      }
    })
    
  };

  return (
    <article className="br4 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 center shadow-2 tc">
      <main className="pa4 black-80">
        <form className="measure" >
          <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
            <legend className="f2 fw6 ph0 mh0">Sign In</legend>
            <div className="mt3">
              <label className="db fw6 lh-copy f5" htmlFor="userEmail">
                Email
              </label>
              <input
                className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                type="email"
                
                id="email-address"
                onChange={onEmailChange}
                {...register('userEmail', {
                  required: 'Please enter your email!',
                  minLength: 4,
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: 'Please enter a valid email address!'
                  }
                })}
              />
              <p className="f4 white">{errors.userEmail?.message}</p>
            </div>
            <div className="mv3">
              <label className="db fw6 lh-copy f5" htmlFor="userPassword">
                Password
              </label>
              <input
                className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                type="password"
    
                id="password"
                onChange={onPasswordChange}
                {...register('userPassword', {
                  required: 'Please enter your password!',
                  minLength: {
                    value: 4,
                    message: 'Please enter your password!'
                  }
                })}
              />
              <p className="f4 white">{errors.userPassword?.message}</p>
            </div>
          </fieldset>
          <div>
            <p id="error-message" className="dn white underline f4 mt0">Wrong email or password!</p>
          </div>
          <div className="">
            <input
              className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
              type="submit"
              value="Sign in"
              onClick={handleSubmit(onSignIn)}
              
            />
          </div>
          <div className="lh-copy mt3">
            <p
              href="#0"
              className="f5 link dim black db pointer"
              onClick={() => onRouteChange("register")}
            >
              Register
            </p>
          </div>
        </form>
      </main>
    </article>
  );
};

export default SignInForm;
