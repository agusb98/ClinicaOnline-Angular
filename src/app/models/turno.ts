import { Especialista } from "./especialista";
import { Paciente } from "./paciente";

export class Turno {
    id: string;
    paciente: Paciente;
    especialista: Especialista;
    date: string;
    status: 'Pendiente' | 'Finalizado' | 'Cancelado';
    especialidad: string;
    commentPaciente: string;
    commentEspecialista: string;
    encuesta: number;
}
