import React from 'react'
import PropTypes from 'prop-types'
import WorkoutModel from '../models/WorkoutModel'
import nanoid from 'nanoid';

function AddRecord(props) {
    const {form, setForm, setWorkouts} = props

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

    const sortWorkouts = (date1, date2) => {
        if (date1.date > date2.date) return -1;
        if (date1.date < date2.date) return 1;

        return 0;
    };

    return (
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
    )
}

AddRecord.propTypes = {
    form: PropTypes.object.isRequired,
    setForm: PropTypes.func.isRequired,
    setWorkouts: PropTypes.func.isRequired,
}

export default AddRecord