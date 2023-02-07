import React from "react"
import "./App.css"
import "./Resume.css"
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
  description: "1st sem COE 8th sem INS"
}

const avmt1 = {
  id: "1000",
  description: "Im blue dabade dee daba da"
}
const avmt2 = {
  id: "1032",
  description: "Hello helo helo"
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
      ],

      achievments: [
        avmt1, avmt2
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
      // console.log(state);

      newState[inputName] =  e.target.value + "BOOGIE"
     
      // console.log("STATE IS NOW");
      // console.log({...state, ...newState});
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
    return(
      <div className="experience-info-card">
        <header>
          <div className="company-info">
            <p className="company-name">Google</p>
            <p className="company-role">SDE</p>
          </div>
          <div className="period-info">
            <p className="period">2019-Present</p>
            <p className="location">Delhi</p>
          </div>
        </header>
        <p className="description">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Repudiandae incidunt fugit ullam repellat dolorum ducimus cum vitae deleniti beatae atque, quas commodi accusantium quos placeat assumenda perspiciatis. Illum, quod! Esse labore dolorem necessitatibus nam deleniti corrupti placeat dolores similique accusamus tempora, quidem assumenda reiciendis voluptatem velit odit, perferendis, porro facere?
        </p>
    </div>
    );
  }
}

class Resume extends React.Component{

  render(){
    return (
      <div className="resume-container">
        <div className="resume">

          <section className="personal-info-banner">
            <h1>Dev Aryan Dogra</h1>
            <div className="contact-info">
              <p>devdogra1@gmail.com</p>
              <p>9811061693</p>
              <p>Delhi-110034</p>
            </div>
          </section>

          <h2>Work experience</h2>
          <section className="work-experiences">
            <ExperienceInfoCard />
            <ExperienceInfoCard />
          </section>

          <h2>Education</h2>
          <section className="education">
            <ExperienceInfoCard />
          </section>

          <h2>Achievments</h2>
          <section className="achievments">
            <ul>
              <li>Scored 99 in XYZ</li>
              <li>ABCD finalist</li>
              <li>Recipient of BLAH</li>
              <li>Recipient of BLAH</li>
            </ul>
          </section>

          <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ratione quis at, dolorem minus in veniam exercitationem quas soluta error totam repellat nesciunt deleniti laborum animi obcaecati tempora voluptas! Labore ullam in, voluptatem dolor eum ipsam, est possimus deleniti eaque eos eligendi et ea, explicabo placeat. Vel nisi accusantium voluptatem soluta.

            Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro libero rerum fugit nesciunt explicabo, aut quisquam non ea corrupti quasi distinctio culpa fuga sunt sint assumenda eligendi aliquid voluptatum atque laborum quae officiis ad! Beatae at earum quam doloribus nihil quaerat voluptatem saepe iste autem. Eius animi dolore sit maiores.

            Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequatur a fugiat vero quos quaerat magni repellendus, iste voluptates. Sint corporis expedita modi! Repudiandae minima perferendis quibusdam cupiditate. Excepturi maxime deleniti laudantium repudiandae explicabo! Repellat non maxime necessitatibus, commodi nihil vel iusto voluptatibus alias tempore veritatis dolores placeat pariatur incidunt maiores facilis atque mollitia harum, consequatur autem officiis. Asperiores amet ullam odit obcaecati nihil laudantium fuga, iusto incidunt fugiat cumque officiis, quaerat voluptas ducimus. Atque, blanditiis tenetur. Aut vero tempore rerum nisi nobis maxime molestias exercitationem aperiam. Labore eum pariatur non ab voluptas, mollitia, sint, possimus nam modi voluptates consectetur neque.
          </p>


        </div>

      </div>
    );
    
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

