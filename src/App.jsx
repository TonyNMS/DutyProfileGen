import { useState } from 'react'

import './App.css'
import DutyProfilePlot from './components/DutyprofilePlot';
import CSVExported from './components/CSVExported';

function App() {
  const [equipmentCategory, setEquimentCategory] = useState('');
  const [powerRating, setPowerRating] =  useState(0);
  const [quantity, setQuantity] = useState(0);
  const [equipmentCollection, setEquipmentCollection] = useState([]);
  const [euqName, setEuqName] = useState('');
  

  const [journeys, setJourneys] = useState('');
  const [journeyPower, setJourneypower] = useState(0);
  const [journeyPower2, setJourneypower2] = useState(0);
  const [journeypowerVariance, setJourneypowerVariance] = useState(0);
  const [journeysCollection, setJourneysCollection] = useState([]);
  const [journeyTime, setJourneyTime] = useState(0);

  const Categories = ['Auxilliary', 'Hotel', 'Generator', 'PowerLoad', 'ElectricGen'];
  const Journeys = ['Select a Journey', 'Start Up', 'Stationary', 'Idle', 'Shutdown', 'Push On', 'Harbour', 'Sailing Slow Speed', 'Sailing Survey', 'Sailing Transit', 'Sailing Transport', 'DP Good Condition', 'DP Bad Condition', 'DP Medium']
  


  

  const handleAddEqu = () =>{
    if (!euqName || powerRating <= 0 || quantity <= 0 || !equipmentCategory) {
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
      "avg_pwr2" : journeyPower2,
      "avg_combi" : journeyPower + journeyPower2,
      "var" : journeypowerVariance,
      "time_span" : journeyTime
    }
    console.log(journeyObject.avg_combi);
    setJourneysCollection([...journeysCollection, journeyObject]);
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
            <input type="text" placeholder="Enter Equipment Name" onChange={e=>setEuqName(e.target.value)}/>   
        </div>
        <div>
            <label>Rated Power:</label>
            <input type="number" placeholder="Enter Equipment Rated Power" onChange={e=>setPowerRating(e.target.value)}/>   
        </div>
        <div>
            <label>Quantity:</label>
            <input type="number" placeholder="Enter Equipement Quantity" onChange={e=>setQuantity(e.target.value)}/>   
        </div>
        <div>
            <label>Category:</label>
            <select onChange={e=>setEquimentCategory(e.target.value)}>{displayEquipmentOptions()}</select>  
        </div>
        <div>
            <button onClick={handleAddEqu}>Add Equipment</button>
            <button onClick={handleRestList}>Reset Equipment List</button>
        </div>
        
      </div>
    )
  }
  const handleRestList = () =>{
    setEquipmentCollection([]);
  }
  const returnEquList = () =>{
    return(
      <div className='equipList'>
          <h3>Equipment List</h3>
          {equipmentCollection.length > 0 ? (
            <table>
              <thead>
                  <tr>
                    <td>Equipment Name</td><td>Category</td><td>Equipment Rated Power</td><td>Equipment Quantity</td>
                  </tr>
              </thead>
              <tbody>
                  {equipmentCollection.map((item, index)=>
                    <tr key={`equp-${index}`}>
                      <td>{item.equName}</td>
                      <td>{item.equipment}</td>
                      <td>{item.powerRating}</td>
                      <td>{item.quantity}</td>
                    </tr>
                  ) }
              </tbody>
            </table>
          ):(<p>No Equipemnt List Added Yets</p>)
          }
      </div>
    )
  }

  return (
    <>
      <div className='added-equiment-list'>
        
      </div>
      {
        /**
          <div className = 'add-equp'>
            <h3>Add Equipment</h3>
            {returnEquipmentSection()}
            {returnEquList()}

          </div>
         */
      }
      
      <div className='adding-journey'> 
        <h3>Add a Journery</h3>
       
        <table className='select-table'>
          <tbody>
            <tr><td>Select a Journery:</td><td><select onChange= {e=>setJourneys(e.target.value )}>{displayJourneyOptions()}</select></td></tr>
            <tr><td>Input an Average Power Demand 1 :</td><td><input type="number" onChange ={(e)=>setJourneypower(Number(e.target.value))} placeholder='Average Power: in kWatt'></input></td></tr>
            <tr><td>Input an Averge Power Demand 2 :</td><td><input type = "number" onChange={(e)=>setJourneypower2(Number(e.target.value))} placeholder='Average Power: in kWatt'></input></td></tr>
            <tr><td>Input Journey Time Span in Minutes:</td><td><input type ='number'onChange = {(e)=>setJourneyTime(e.target.value)} placeholder='Time Span: in Minutes'></input></td></tr>
            <tr><td>Input a Power Demand Variance %:</td><td><input type='number' onChange = {(e)=>setJourneypowerVariance(e.target.value)}placeholder = 'Variance: '></input></td></tr>
          </tbody>
        </table>
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
                <th>Average Power 2 (kw)</th>
                <th>Average Power Combined (kw)</th>
                <th>Variance (%)</th>
                <th>Time Span (Minutes)</th>
              </tr>
            </thead>
            <tbody>
              {journeysCollection.map((journey, index) => (
                <tr key={index}>
                  <td>{journey.type}</td>
                  <td>{journey.avg_pwr}</td>
                  <td>{journey.avg_pwr2}</td>
                  <td>{journey.avg_combi}</td>
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
