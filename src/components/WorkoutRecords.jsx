import React, { useState } from 'react'
import AddRecord from './AddRecord';
import RecordsListing from './RecordsListing';

function WorkoutRecords() {
    const [workouts, setWorkouts] = useState([]);
    const [form, setForm] = useState({date: '', distance: ''});

    return (<React.Fragment>
        <AddRecord form={form} setForm={setForm} setWorkouts={setWorkouts}/>
        <RecordsListing workouts={workouts} setForm={setForm} setWorkouts={setWorkouts}/>
    </React.Fragment>)
}

export default WorkoutRecords