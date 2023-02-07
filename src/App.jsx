import React from "react"
import "./App.css"
import { nanoid } from "nanoid"
// todo:
// make the add more exp and education btns work

const exp1 = {
  id: "100",
  type: 'work',
  organisation: 'google',
  role: 'sde',
  startDate: '2019',
  endDate: 'present', 
  description: "haha lying"
}

const exp2 = {
  id: "200",
  type: 'work',
  organisation: 'twitter',
  role: 'hr',
  startDate: '2016',
  endDate: '2018',
  description: "elon musk was me boss"

}

const exp3 = {
  id: "300",
  type: 'study',
  organisation: 'DTU',
  role: 'computer engineering',
  startDate: '2011',
  endDate: '2015',
  description: "worst time of me life, i fail;ed myself"
}



export default class App extends React.Component{
  constructor(props){
    super(props);

    this.state = {
      fullname: 'ddedeede',
      email: 'dedede',
      phone: '',
      
      experiences: [
        exp1, exp2, exp3
      ]
    }
    this.handleChange = this.handleChange.bind(this);  
    this.addExperienceInfo = this.addExperienceInfo.bind(this);  
  }
  // e is the event of the change, 
  // inputName is the 'name' attribute of the input
  // that changed
  handleChange(e, inputName, experienceId){
    this.setState(state => {
      console.log(state);
      const newState = {};

      if (experienceId){
        
        const exps = [...this.state.experiences];
        const idx = exps.findIndex(exp => exp.id === experienceId);
        exps[idx][e.target.name] = e.target.value;

        newState.experiences =  exps;
        return newState;
      }
      // console.log(state);

      newState[inputName] =  e.target.value + "BOOGIE"
     
      // console.log("STATE IS NOW");
      // console.log({...state, ...newState});
      return newState; 
    })
  }

  addExperienceInfo(type, e){
    const emptyExperience = {
      id: nanoid(),
      type: type,
      organisation: '',
      role: '',
      startDate: '',
      endDate: '',
      description: ''
    }

    console.log(emptyExperience);

    this.setState({
      experiences: this.state.experiences.concat(emptyExperience)
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
        onAddExperience={this.addExperienceInfo}
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
    return (
      <div className="personal-info-input">
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
      </div>

    );
  }
}

class PeriodInput extends React.Component{
  render(){
    const {startDate, endDate, expId, onChange} = this.props;
    return(
      <fieldset className="period-input">
      <legend>Period</legend>
      
      <label htmlFor="">
        Start date
        <input 
        name="startDate"
        onChange={e => onChange(e, "startDate", expId)}
        value={startDate}
        type="text" />
      </label>

      <label htmlFor="">
        End date
        <input 
        name="endDate"
        value={endDate}
        onChange={e => onChange(e, "endDate", expId)}
        type="text" />
      </label>

    </fieldset>
    );
  }
}

class ExperienceInfoInput extends React.Component{

 render(){
   const {type, id, organisation, role, startDate, endDate, description, onChange} = this.props.value;
   const study = (type === "study"); 
   
  return(
    <div className="experience-info-input">
      <label htmlFor="">
        {study ? "Institution" : "Company"}
        <input 
        name="organisation"
        value={organisation}
        type="text" 
        onChange={e => this.props.onChange(e, "organisation", id)}/>
      </label>

      <label htmlFor="">
        {study ? "Degree" : "Role"}
        <input type="text" 
        value={role}
        name="role"
        onChange={(e) => this.props.onChange(e, "role", id)}/>
      </label>

      <PeriodInput 
      onChange={this.props.onChange}
      startDate={startDate}
      endDate={endDate}
      expId={id}/>
    
      {!study && (
        <label htmlFor="">
          Description
          <input type="text" 
          name="description"
          value={description}
          onChange={e => this.props.onChange(e, "description", id)}
          />
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
        
        <div className="form-heading">
          <h2>Work experience</h2>
          <button 
          // Eq to: e => onAddExp("work", e)
          onClick={this.props.onAddExperience.bind(this, "work")}
          type="button">Add work input</button>
        </div>
        <div className="work-experience-form">

          {
            this.props.experiences.filter(exp => exp.type === "work").map((exp, idx) => {
              return (
                <ExperienceInfoInput
                key={exp.id}
                idx={idx}
                onChange={this.props.onChange}
                value={exp}
                type="work"
                />

              );
            })
          }
        </div>

        <div className="form-heading">
          <h2>Education</h2>
          <button 
          onClick={this.props.onAddExperience.bind(this, "study")}
          type="button">Add education input</button>
        </div>
        
        <div className="education-form">

          {
            this.props.experiences.filter(exp => exp.type === "study").map((exp, idx) => {
              return (
                <ExperienceInfoInput
                key={exp.id}

                idx={idx}
                onChange={this.props.onChange}
                value={exp}
                type="study"
                />

              );
            })
          }

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

