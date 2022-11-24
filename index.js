// Importar funciones
import {
    saveTask,
    getTasks,
    onGetTask,
    deleteTask,
    getTask,
    updateTask
} from './firebase.js';

// Seleccionar task container
const taskContainer = document.getElementById('tasks-container');

// Seleccionar Formulario
const taskForm = document.getElementById ( 'task-form' );

let editStatus = false;

let id = '';

// Evento para ejecutar algo cuando la app cargue
window.addEventListener( 'DOMContentLoaded', async () => {
    
    // Traer tareas de forma asincrona
    onGetTask ((querySnapshot) =>  {
        let html = '';

        querySnapshot.forEach( doc => {
        const task = doc.data();
        html += `
            <div class="">
                <h3> ${ task.title } </h3>
                <p> ${ task.description } </p>

                <button class="btn-delete" data-id="${ doc.id }"> Borrar </button>
                <button class="btn-edit" data-id="${ doc.id }"> Editar </button>

            </div>
        `;                
    } );
    
        taskContainer.innerHTML = html;

        // Seleccionar botones para borrar
        const btnsDelete = taskContainer.querySelectorAll( '.btn-delete' );

        btnsDelete.forEach ( btn => {
            btn.addEventListener ( 'click', ( {target: { dataset }} ) => {
                deleteTask( dataset.id );
            } );
        } );

        // Seleccionar botones para editar
        const btnsEdit = taskContainer.querySelectorAll ( '.btn-edit' );
        btnsEdit.forEach ( btn => {
            btn.addEventListener ( 'click', async ( e )  => {
                const doc = await getTask ( e.target.dataset.id );
                const task = doc.data();
                
                taskForm['task-title'].value = task.title;
                taskForm['task-description'].value = task.description;

                editStatus = true;
                id = doc.id;

                taskForm['btn-task-save'].innerText = 'Update';
            } );
        })
    });
} );


taskForm.addEventListener ( 'submit', ( e ) => {
    e.preventDefault();

    // Seleccionar inputs
    const title = taskForm['task-title'];
    const description = taskForm['task-description'];

    // Guardar valores de los inputs
    saveTask ( title.value, description.value );

    if ( !editStatus ) {
        saveTask ( title.value, description.value );
    } else {
        updateTask ( id, {
            title: title.value, 
            description: description.value
        } );
        editStatus = false;
    }

    // Limpiar los campos
    taskForm.reset();
} )