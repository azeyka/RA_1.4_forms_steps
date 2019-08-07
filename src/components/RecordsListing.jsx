import React from 'react'
import PropTypes from 'prop-types'

function RecordsListing(props) {
    const {workouts, setForm, setWorkouts} = props

    const handleDelete = id => {
        setWorkouts(prevWorkouts => prevWorkouts.filter(workout => workout.id !== id))
    };

    const handleEdit = id => {
        const workout = workouts.find((el) => el.id === id);
        setForm({date: workout.date, distance: workout.distance});
        handleDelete(id);
    };

    return (
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
    )
}

RecordsListing.propTypes = {
    workouts: PropTypes.array.isRequired, 
    setForm: PropTypes.func.isRequired, 
    setWorkouts: PropTypes.func.isRequired
}

export default RecordsListing