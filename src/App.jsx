import { useState } from 'react'

import './App.css'
import DutyProfilePlot from './components/DutyprofilePlot';
import CSVExported from './components/CSVExported';

function App() {
  const [equipmentCategory, setEquimentCategory] = useState('Enter Category');
  const [equipmentCollection, setEquipmentCollection] = useState([]);
  const [euqName, setEuqName] = useState('');
  const [powerRating, setPowerRating] =  useState(0);
  const [quantity, setQuantity] = useState(0);


  const [journeys, setJourneys] = useState('');
  const [journeyPower, setJourneypower] = useState(0);
  const [journeypowerVariance, setJourneypowerVariance] = useState(0);
  const [journeysCollection, setJourneysCollection] = useState([]);
  const [journeyTime, setJourneyTime] = useState(0);

  const Categories = ['Auxilliary', 'Hotel', 'Generator', 'PowerLoad', 'ElectricGen'];
  const Journeys = ['Select a Journey', 'Start Up', 'Stationary', 'Idle', 'Shutdown', 'Push On', 'Harbour', 'Sailing Slow Speed', 'Sailing Survey', 'Sailing Transit', 'Sailing Transport', 'DP Good Condition', 'DP Bad Condition', 'DP Medium']
  



  const handleAddEqu = () =>{
    if (!journeys || journeyPower <= 0 || journeyTime <= 0 || journeypowerVariance < 0) {
      alert("Please fill all fields with valid values.");
      return;
    }
    const equimentObject = {
      "equipment" : equipmentCategory,
      "equName" : euqName,
      "powerRating" : powerRating,
      "quantity" : quantity,
    }
    setEquipmentCollection([...equipmentCollection, equimentObject]);
  }
  const addJourney = () =>{
    if(journeys === '' || journeyPower === 0 || journeyTime === 0 || journeypowerVariance === 0){
      alert("Make sure to input all field");
      return;
    }
    const journeyObject = {
      "type" : journeys,
      "avg_pwr" : journeyPower,
      "var" : journeypowerVariance,
      "time_span" : journeyTime
    }
    setJourneysCollection([...journeysCollection, journeyObject]);
    setJourneys('');
    setJourneypower(0);
    setJourneypowerVariance(0);
    setJourneyTime(0);
  }
  const displayEquipmentOptions = () =>{
    return Categories.map((stat, index)=>{
        return <option value = {stat} index = {index}>{stat}</option>
    })
  }
  const displayJourneyOptions = () => {
    return Journeys.map((stat, index)=>{
      return <option value = {stat} index = {index}>{stat}</option>
    })
  }
  const returnEquipmentSection = () =>{
    return(
      <div className = "adding_equiment">
        <h3>Add a Power Consumption Device</h3>
        <div>
            <label>Equipment Name:</label>
            <input type="text" placeholder="Enter Equipment Name" />   
        </div>
        <div>
            <label>Rated Power:</label>
            <input type="number" placeholder="Enter Ship Name" />   
        </div>
        <div>
            <label>Quantity:</label>
            <input type="number" placeholder="Enter Ship Name" />   
        </div>
        <div>
            <label>Category:</label>
            <select onChange={e=>setEquimentCategory(e.target.value)}>{displayEquipmentOptions()}</select>  
        </div>
        <div>
            <button onClick={handleAddEqu}>Add Equipment</button>
        </div>
      </div>
    )
  }

  return (
    <>
      <div className='added-equiment-list'>
        
      </div>
      <div className='adding-journey'> 
        <h3>Add a Journery</h3>
        <div>
            <label>Select a Journery: </label>
            <select onChange= {e=>setJourneys(e.target.value )}>{displayJourneyOptions()}</select>
        </div>
        <div>
            <label>Input a Average Power Demand: </label>
            <input type="number" onChange ={(e)=>setJourneypower(e.target.value)} placeholder='Aveage Power: in kWatt'></input>
        </div>
        <div>
            <label>Input Journey Time Span in Minutes: </label>
            <input type ='number'onChange = {(e)=>setJourneyTime(e.target.value)} placeholder='Time Span: in Minutes'></input>
        </div>
        <div>
            <lable>input a Power Demand Variance %: </lable>
            <input type='number' onChange = {(e)=>setJourneypowerVariance(e.target.value)}placeholder = 'Variance: '></input>
        </div>
        <div>
          <button onClick={addJourney}>Add Journey!</button>
          <button onClick={()=>{setJourneysCollection([])}}>Reset</button>
        </div>
      </div>
      <div className= 'added-Journey-Display'>
        <h3>Journey Collection</h3>
        {journeysCollection.length > 0 ? (
          <table>
            <thead>
              <tr>
                <th>Type</th>
                <th>Average Power (kW)</th>
                <th>Variance (%)</th>
                <th>Time Span (Minutes)</th>
              </tr>
            </thead>
            <tbody>
              {journeysCollection.map((journey, index) => (
                <tr key={index}>
                  <td>{journey.type}</td>
                  <td>{journey.avg_pwr}</td>
                  <td>{journey.var}</td>
                  <td>{journey.time_span}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No journeys added yet.</p>
        )}
      </div>
      <div className='dutyProfilePlot'>
        <DutyProfilePlot journeysCollection= {journeysCollection}></DutyProfilePlot>
      </div>
      <div className='exportSection'>
      {journeysCollection.length === 0 ? (
        <p>Empty Journey Array</p>
      ) : (
        <CSVExported journeysCollection={journeysCollection} />
      )}
      </div>
    </>
  )
}

export default App
