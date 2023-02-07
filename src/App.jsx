import React from "react"
import "./App.css"

export default class App extends React.Component{
  render(){
    return (
      <>
        <Form />
        <Resume />
      </>
    );
  }
}

class PersonalInfoInput extends React.Component{
  render(){
    return (
      <>
        <label htmlFor="">
          Name
          <input type="text" />
        </label>

        <label htmlFor="">
          Email
          <input type="text" />
        </label>

        <label htmlFor="">
          Phone
          <input type="text" />
        </label>
      </>

    );
  }
}

class PeriodInput extends React.Component{
  render(){
    return(
      <fieldset className="work-period-input">
      <legend>Period</legend>
      
      <label htmlFor="">
        Start date
        <input type="text" />
      </label>

      <label htmlFor="">
        End date
        <input type="text" />
      </label>

    </fieldset>
    );
  }
}

class ExperienceInfoInput extends React.Component{
 render(){
  return(
    <div className="work-input">
    <label htmlFor="">
      Company
      <input type="text" />
    </label>

    <label htmlFor="">
      Role
      <input type="text" />
    </label>

    <PeriodInput />
   

    <label htmlFor="">
      Description
      <input type="text" />
    </label>

  </div>
  );
 }
}

class Form extends React.Component{

  render(){
    return (
      <form action="">

        <h2>Personal Info</h2>
        <div className="personal-info-form">
          <PersonalInfoInput />
        </div>

        <h2>Work experience</h2>
        <div className="work-experience-form">
          <ExperienceInfoInput/>    
          <button type="button">Add work input</button>
        </div>

        <h2>Education</h2>
        <div className="education-form">
         <ExperienceInfoInput/>
          <button type="button">Add education input</button>
        </div>

      </form>
    );
  }
}

class Resume extends React.Component{

  render(){
    return <h1>Hello</h1>
    // return(
    //   <>
    //     <PersonalInfoBanner 
    //     name="Dev Aryan Dogra" email="devdogra1@gmail.com" 
    //     mobile={9811061693}
    //     />

    //     <Section 
    //     title="Work experience"
    //     startDate={new Date()}
    //     />

    //     <Section title="" />
      
    //   </>
    // )


  }
}

