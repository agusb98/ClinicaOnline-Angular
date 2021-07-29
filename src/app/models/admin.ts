import { User } from "./user";

export class Admin extends User {
    constructor(
        id: string,
        name: string,
        surname: string,
        age: number,
        dni: number,
        photo: string,
        email: string,
        password: string,
        time_created: Date,
        last_log: Date
    ) {
        super(id, name, surname, age, dni, photo, email, password, 'ADMINISTRADOR', time_created);
    }
}
