import { Especialidad } from "./especialidad";
import { User } from "./user";

export class Especialista extends User {
    especialidad: Especialidad[];
    status: boolean;
    schedule: { start: string, end: string }

    constructor(
        id: string,
        name: string,
        surname: string,
        age: number,
        dni: number,
        especialidad: Especialidad[],
        schedule: { start: string, end: string },
        email: string,
        password: string,
        photo: string,
        status: boolean,
        time_created: Date,
    ) {
        super(id, name, surname, age, dni, photo, email, password, 'ESPECIALISTA', time_created);
        this.especialidad = especialidad;
        this.status = status;
        this.schedule = schedule;
    }

    /* 
    toupperEsp(arr: Especialidad[]): Especialidad[] {
        let newArr: Especialidad[] = [];

        arr.forEach(es => {
            es.name = es.name.toUpperCase();
            newArr.push(es);
        });
        return newArr;
    }
    */
}
