import './TodosController.css';

function TodoEmpty() {
    return (
        <div className='condition-message'>
            <p>No hay tareas</p>
            <img src="react-project/./img/empty.png" alt='empty'/>
        </div>
    );
}

export { TodoEmpty };