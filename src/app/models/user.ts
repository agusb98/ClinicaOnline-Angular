export abstract class User {

    // FIELDS
    id: string;
    name: string;
    surname: string;
    age: number;
    dni: number;
    photo: string;
    email: string;
    password: string;
    user: 'ADMINISTRADOR' | 'ESPECIALISTA' | 'PACIENTE';
    time_created: Date;
    last_log: Date;

    //CONSTRUCTOR
    constructor(
        id: string,
        name: string,
        surname: string,
        age: number,
        dni: number,
        photo: string,
        email: string,
        password: string,
        user: 'ADMINISTRADOR' | 'ESPECIALISTA' | 'PACIENTE',
        time_created: Date,
    ) {
        this.id = id;
        this.name = this.capitalizeFLetter(name);
        this.surname = this.capitalizeFLetter(surname);
        this.age = age;
        this.dni = dni;
        this.photo = photo;
        this.email = email;
        this.password = password;
        this.user = user;
        this.time_created = time_created;
        this.last_log = new Date();
    }

    capitalizeFLetter(str: string): string {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }
}
