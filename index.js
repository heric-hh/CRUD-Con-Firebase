// Importar funciones
import {
    saveTask,
    getTasks,
    onGetTask,
    deleteTask,
    getTask,
    updateTask,
    saveImage
} from './firebase.js';

// Seleccionar task container
const taskContainer = document.getElementById('tasks-container');

// Seleccionar Formulario
const taskForm = document.getElementById ( 'task-form' );

let editStatus = false;

let id = '';



const uploadFileAction = ( e ) => {
    const file = e.target.files[0];

    if ( file.type.includes( 'image' ) ) {
        console.log( 'Sí es una imagen' );
        saveImage( file );
    }
}

/*const saveSubmit = ( e ) => {
    e.preventDefault();
    const title = formTask
}*/


// Evento para ejecutar algo cuando la app cargue
window.addEventListener( 'DOMContentLoaded', async () => {
    
    // Traer tareas de forma asincrona
    onGetTask ((querySnapshot) =>  {
        taskContainer.innerHTML = '';

        querySnapshot.forEach( doc => {
            const task = doc.data();
            taskContainer.innerHTML += `
                <div class="card card-body mt-2 border-primary">
                    <h3> ${ task.title } </h3>
                    <p> ${ task.description } </p>

                    <button class="btn-delete" data-id="${ doc.id }"> Borrar </button>
                    <button class="btn-edit" data-id="${ doc.id }"> Editar </button>

                </div>
        `;                
    } );
    

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
        });
    });

    document.querySelector( '#file-task' ).addEventListener( 'change', uploadFileAction );
} );


taskForm.addEventListener ( 'submit', ( e ) => {
    e.preventDefault();

    // Seleccionar inputs
    const title = taskForm['task-title'].value;
    const description = taskForm['task-description'].value;
    const imageUrl = document.querySelector( '#image' ).src;

    if ( title.length > 3 && description.length > 3 ) {
        if ( !editStatus ) {
            saveTask(title, description, imageUrl);
        } else {
            updateTask ( id, {
                title: title,
                description: description,
            } );
            editStatus = false;
            taskForm['btn-task-save'].innerHTML = "Save";
        }
        taskForm.reset();
    } else {
        alert ( 'Debes escribir algo' );
    }
} )