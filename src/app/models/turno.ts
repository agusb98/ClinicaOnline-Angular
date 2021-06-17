import { Especialista } from "./especialista";
import { Paciente } from "./paciente";

export class Turno {
    id: string;
    paciente: Paciente;
    especialista: Especialista;
    date: string;
    status: 'Pendiente' | 'Finalizado' | 'Cancelado' | 'Aceptado' | 'Rechazado';
    especialidad: string;
    encuesta: number;
}
