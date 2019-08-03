import React, { useState } from 'react'
import WorkoutModel from '../models/WorkoutModel'
import nanoid from 'nanoid';

function WorkoutRecords() {
    const [workouts, setWorkouts] = useState([]);
    const [form, setForm] = useState({date: '', distance: ''});

    const handleChange = event => {
        const {name, value} = event.target;
        setForm(prevForm => ({...prevForm, [name]: value}));
    };

    const handleSubmit = event => {
        event.preventDefault();
        const workout = new WorkoutModel(nanoid(), form.date, form.distance);

        setWorkouts(prevWorkouts => {
            for (let prevWorkout of prevWorkouts) {
                if (prevWorkout.date === workout.date) {
                    prevWorkout.distance = Number(workout.distance) + Number(prevWorkout.distance);
                    return prevWorkouts.sort(sortWorkouts);
                };
            };

            return [...prevWorkouts, workout].sort(sortWorkouts);
        });

        setForm({date: '', distance: ''});
    };

    const handleDelete = id => {
        setWorkouts(prevWorkouts => prevWorkouts.filter(workout => workout.id !== id))
    };

    const handleEdit = id => {
        const workout = workouts.find((el) => el.id === id);
        setForm({date: workout.date, distance: workout.distance});
        handleDelete(id);
    };

    const sortWorkouts = (date1, date2) => {
        if (date1.date > date2.date) return -1;
        if (date1.date < date2.date) return 1;

        return 0;
    };

    return (<React.Fragment>
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="date">Дата</label>
                <input type="date" name="date" value={form.date} onChange={handleChange} required/>
            </div>
            <div>
                <label htmlFor="distance">Пройдено (км)</label>
                <input type="number" step="any" name="distance" value={form.distance} onChange={handleChange} required/>
            </div>
            <button type="submit">OK</button>
        </form>

        <div className="workouts">
            <ul className="workouts-headers">
                <li>Дата</li>
                <li>Пройдено (км)</li>
                <li>Действия</li>
            </ul>
            
            <ul className="workouts-data">
                {workouts.map(workout => <li key={workout.id}>
                    <span>{workout.date}</span>
                    <span>{workout.distance}</span>

                    <div>
                        <button onClick={() => handleEdit(workout.id)}><i className='material-icons'>edit</i></button> 
                        <button onClick={() => handleDelete(workout.id)}><i className='material-icons'>delete_forever</i></button>
                    </div>
                </li>)}
            </ul>
        </div>
    </React.Fragment>)
}

export default WorkoutRecords

