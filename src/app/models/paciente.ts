import { User } from "./user";

export class Paciente extends User {
    obra_social: string;
    photo2: string;

    constructor(
        id: string,
        name: string,
        surname: string,
        age: number,
        dni: number,
        obra_social: string,
        email: string,
        password: string,
        photo: string,
        photo2: string,
        time_created: Date,
    ) {
        super(id, name, surname, age, dni, photo, email, password, 'PACIENTE', time_created);
        this.obra_social = obra_social.toUpperCase();
        this.photo2 = photo2;
    }
}