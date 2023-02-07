import React from "react"
import "./App.css"

const exp1 = {
  type: 'work',
  organisation: 'google',
  role: 'sde',
  startDate: '2019',
  endDate: 'present'
}

const exp2 = {
  type: 'work',
  organisation: 'twitter',
  role: 'hr',
  startDate: '2016',
  endDate: '2018'
}

const exp3 = {
  type: 'study',
  organisation: 'DTU',
  role: 'computer engineering',
  startDate: '2011',
  endDate: '2015'
}


export default class App extends React.Component{
  constructor(props){
    super(props);

    this.state = {
      fullname: 'ddedeede',
      email: 'dedede',
      phone: '',
      
      // experiences: [{
      //   type: '',
      //   organisation: '',
      //   role: '',
      //   startDate: '',
      //   endDate: '',
      // }],
      experiences: [
        exp1, exp2, exp3
      ]

 
    }
    this.handleChange = this.handleChange.bind(this);    
  }
  // e is the event of the change, 
  // inputName is the 'name' attribute of the input
  // that changed
  handleChange(e, inputName){
    this.setState(state => {
      console.log(state);
      const newState = {
        [inputName]: e.target.value + "BOOGIE"
      }
      console.log("STATE IS NOW");
      console.log({...state, ...newState});
      return newState; 
    })
  }
  render(){
    return (
      <>
        <ResumeForm 
        fullname={this.state.fullname}
        email={this.state.email}
        phone={this.state.phone}
        experiences={this.state.experiences}
        onChange={this.handleChange}
        />
        <Resume />
      </>
    );
  }
}

class PersonalInfoInput extends React.Component{
  constructor(props){
    super(props);
  }
  render(){
    console.log(this.props.fullname);
    return (
      <>
        <label  htmlFor="">
          Name
          <input 
          name="fullname"
          value={this.props.fullname}
          onChange={e => this.props.onChange(e, "fullname")}
          type="text" 
          />
        </label>

        <label htmlFor="">
          Email
          <input
          name="email" 
          value={this.props.email}
          onChange={e => this.props.onChange(e, "email")}
          type="text" />
        </label>

        <label  htmlFor="">
          Phone
          <input
          value={this.props.phone}
          onChange={e => this.props.onChange(e, "phone")}
          name="phone"
          type="text" />
        </label>
      </>

    );
  }
}

class PeriodInput extends React.Component{
  render(){
    return(
      <fieldset className="period-input">
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
  const study = (this.props.type === "study"); 
  return(
    <div className="work-input">
      <label htmlFor="">
        {study ? "Institution" : "Company"}
        <input type="text" />
      </label>

      <label htmlFor="">
        {study ? "Degree" : "Role"}
        <input type="text" />
      </label>

      <PeriodInput />
    
      {!study && (
        <label htmlFor="">
          Description
          <input type="text" />
        </label>
      )}

  </div>
  );
 }
}

class ResumeForm extends React.Component{

  render(){
    console.log(this.props);
    return (
      <form action="">

        <h2>Personal Info</h2>
        <div className="personal-info-form">
          <PersonalInfoInput 
          fullname={this.props.fullname}
          email={this.props.email}
          phone={this.props.phone}
          onChange={this.props.onChange}
          />
        </div>

        <h2>Work experience</h2>
        <div className="work-experience-form">
          <ExperienceInfoInput/>    
          <button type="button">Add work input</button>
        </div>

        <h2>Education</h2>
        <div className="education-form">
         <ExperienceInfoInput type="study" />
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

