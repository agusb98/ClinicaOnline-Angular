import { Especialista } from "./especialista";
import { Paciente } from "./paciente";

export class Comment {
    id: string;
    paciente: Paciente;
    especialista: Especialista;
    comment: string;
}
