import { useState, useEffect } from 'react';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, tap } from 'rxjs/operators';
/**
 * Es importante notar que se saca el atributo name 
 * del evento para así poder ser mapeado al objeto fields
 * que es el que contiene los campos del formulario
 */

export const useForm = ({ initialValues }) => {

    const [fields, setFields] = useState(initialValues);


    const handleFormStateChange = (event) => {
        /** */
        const { value, name } = event.target;
        setFields({ ...fields, [name]: value });
    }


    return {
        fields,
        getInput: (name) => ({
            name,
            value: fields[name],
            handleFormStateChange
        }),
        getCheckBox: (name) => ({
            name,
            value: fields[name],
            handleFormStateChange,
        }),
        /*
       getRadio,
       getSelect, */
    }
}

export const useFormRxjs = ({ initialValues }) => {
    const DEBOUNCE = 1000;
    const [fields, setFields] = useState(initialValues);

    const sub$ = new Subject();

    /**podemos suscribirnos y pasar cualquier tipo de Pipe line
     * en el observable antes de hacer el set del estado
     * que finalmente es retornado al final del Hook
     */
    sub$.pipe().subscribe(setFields)

    const handleFormStateChange = (event) => {
        /**  Este metodo Se conecta con el disparador de eventos de React
         * y emite los acambios a traves del observable(sub$)
        */
        const { value, name } = event.target;
        sub$.next({ ...fields, [name]: value })
    }

    return {
        fields,
        getInput: (name) => ({
            name,
            value: fields[name],
            handleFormStateChange
        }),
        getCheckBox: (name) => ({
            name,
            value: fields[name],
            handleFormStateChange,
        }),
        /*
       getRadio,
       getSelect, */
    }
}

//export default useForm;