import React from "react"
import "./App.css"
import "./Resume.css"
import { nanoid } from "nanoid"
// todo:
// make the add more exp and education btns work

const exp1 = {
  id: "100",
  type: 'work',
  organisation: 'Google',
  role: 'Software Developer',
  startDate: '2019',
  endDate: 'Present', 
  description: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Suscipit, veniam laboriosam nobis magnam ad eveniet quidem dolorum corrupti sed molestias harum dolor tempora impedit pariatur aliquid asperiores qui quasi aliquam cupiditate doloremque quas rerum sint? Accusamus sint porro placeat nobis eaque eos quos iure minima maiores sunt! Eum, minima quam!"
}

const exp2 = {
  id: "200",
  type: 'work',
  organisation: 'Twitter',
  role: 'Software Developer Intern',
  startDate: '2018',
  endDate: '2019',
  description: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Suscipit, veniam laboriosam nobis magnam ad eveniet quidem dolorum corrupti sed molestias harum dolor tempora impedit pariatur aliquid asperiores qui qui"

}

const exp3 = {
  id: "300",
  type: 'study',
  organisation: 'Delhi Technological University',
  role: 'Computer Engineering',
  startDate: '2015',
  endDate: '2019',
  description: "1st sem COEde 8th sem INS"
}

const exp4 = {
  id: "900",
  type: 'work',
  organisation: 'Microsoft',
  role: 'Software Developer Intern',
  startDate: '2017',
  endDate: '2018',
  description: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Suscipit, veniam laboriosam nobis magnam ad eveniet quidem dolorum corrupti sed molestias harum dolor tempora impedit pariatur aliquid asperiores qui qui Lorem, ipsum dolor sit amet consectetur adipisicing elit. Suscipit, veniam laboriosam nobis magnam ad eveniet quidem dolorum corrupti"
}

const avmt1 = {
  id: "1000",
  description: "Achieved gold medal in QWERT Olympiad, YUIP (2018)"
}
const avmt2 = {
  id: "1032",
  description: "Scored 99.8 in the National ABC Examination"
}
const avmt3 = {
  id: "20000",
  description: "Black belt in Brazillian Jiu Jutsu"
}
const avmt4 = {
  id: "94",
  description: "Rated 3000 on Codeforces"
}



export default class App extends React.Component{
  constructor(props){
    super(props);

    this.state = {
      fullname: 'First Middle Last',
      email: 'myemailishere12@gmail.com',
      phone: '98989898989',
      
      experiences: [
        exp1, exp2, exp4, exp3
      ],

      achievments: [
        avmt1, avmt2, avmt3, avmt4
      ]
    }
    this.handleChange = this.handleChange.bind(this);  
    this.addExperienceInfo = this.addExperienceInfo.bind(this);  
    this.addAchievmentInfo = this.addAchievmentInfo.bind(this);
  }
  // e is the event of the change, 
  // inputName is the 'name' attribute of the input
  // that changed

  handleChange(e, inputName, experienceId, achievmentId){
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
      else if (achievmentId){
        const avmts = [...state.achievments];
        const idx = avmts.findIndex(avmt => avmt.id === achievmentId)
        avmts[idx]["description"] = e.target.value;

        newState.achievments = avmts;
        return newState; 
      } 

      newState[inputName] =  e.target.value;
     
      return newState; 
    })
  }
  addAchievmentInfo(){
    const emptyAchievment = {
      id: nanoid(),
      description: '',
    }
    this.setState({
      achievments: [...this.state.achievments, emptyAchievment]
    })
  }
  addExperienceInfo(type){
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
        achievments={this.state.achievments}
        onChange={this.handleChange}
        onAddExperience={this.addExperienceInfo}
        onAddAchievment={this.addAchievmentInfo}
        />
        <Resume 
        fullname={this.state.fullname}
        email={this.state.email}
        phone={this.state.phone}
        experiences={this.state.experiences}
        achievments={this.state.achievments}
        />
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
      <form className="resume-form" action="">

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


        <div className="form-heading">
          <h2>Achievments</h2>
          <button 
          onClick={this.props.onAddAchievment.bind(this)}
          type="button">Add achievment input</button>
        </div>
        <div className="achievments-form">
          {
            this.props.achievments.map(avmt => {
              return (
                <input 
                name="achievment"
                key={avmt.id}
                id={avmt.id}
                value={avmt.description}
                onChange={e => this.props.onChange(e, "achievment", null, avmt.id)}
                />
              );
            })
          }
        </div>

      </form>
    );
  }
}


/* -------------------------------------------------------------------------- */
class ExperienceInfoCard extends React.Component{
  render(){
    const {id, type, organisation, role, startDate, endDate, description} = this.props;
    console.log("PROPS => ");
    console.log(this.props.experienceInfo);


    return(
      <div className="experience-info-card">
        <header>
          <div className="company-info">
            <p className="company-name">{organisation}</p>
            <p className="company-role">{role}</p>
          </div>
          <div className="period-info">
            <p className="period">{ `${startDate} - ${endDate}`}</p>
            <p className="location"></p>
          </div>
        </header>
        {type==="work" &&
          <p className="description">
            {
              description
            }
          </p>
        }
    </div>
    );
  }
}

class Resume extends React.Component{

  render(){
    const {experiences, fullname, email, phone, achievments} = this.props; 
    // console.log("PROPS+")
    console.log(this.props);
    return (
      <div className="resume-container">
        <div className="resume">

          <section className="personal-info-banner">
            <h1>{fullname}</h1>
            <div className="contact-info">
              <p>{email}</p>
              <p>{phone}</p>
              {/* <p>Delhi-110034</p> */}
            </div>
          </section>

          <h2>Work experience</h2>
          <section className="work-experiences">
            {
              experiences.filter(exp => exp.type === "work").map(exp => {
                return (
                  <ExperienceInfoCard
                  key={exp.id}
                  id={exp.id}
                  type={exp.type}
                  organisation={exp.organisation}
                  role={exp.role}
                  startDate={exp.startDate}
                  endDate={exp.endDate}
                  description={exp.description}
                  />
                );
              })
            }
          </section>

          <h2>Education</h2>
          <section className="education">
            {
              experiences.filter(exp => exp.type === "study").map(exp => {
                return (
                  <ExperienceInfoCard
                  key={exp.id}
                  id={exp.id}
                  type={exp.type}
                  organisation={exp.organisation}
                  role={exp.role}
                  startDate={exp.startDate}
                  endDate={exp.endDate}
                  description={exp.description}
                  />
                );
              })
            }
          </section>

          <h2>Achievments</h2>
          <section className="achievments">
            <ul>
            {
              achievments.map((avmt, idx) => {
                return (
                  <li
                  className=""
                  key={avmt.id}
                  id={avmt.id}
                  >
                  {`${idx+1}. ${avmt.description}`}
                  </li>
                );
              })
            }
            </ul>
          </section>

         


        </div>

      </div>
    );

  }
}

