import { Especialista } from "./especialista";
import { Paciente } from "./paciente";
import { Survey } from "./survey";

export class Turno {

    // FIELDS
    id: string;
    paciente: Paciente;
    especialista: Especialista;
    schedule: Date;
    status: 'Pendiente' | 'Finalizado' | 'Cancelado' | 'Aceptado' | 'Rechazado';
    time_created: Date;
    time_updated?: Date;
    survey?: any[];
    qualify?: any[];
    commentPaciente?: string;
    commentEspecialista?: string;
    atention?: number;
    history?: {
        height: number,
        weight: number,
        temperature: number,
        pressure: number,
        others: { clave: string, valor: string | number }[],
    };

    // CONSTRUCTOR
    constructor(
        id: string,
        paciente: Paciente,
        especialista: Especialista,
        schedule: Date,
        status: 'Pendiente' | 'Finalizado' | 'Cancelado' | 'Aceptado' | 'Rechazado',
        time_created: Date,
        survey?: any[],
        qualify?: any[],
        commentPaciente?: string,
        commentEspecialista?: string,
        history?: {
            height: number,
            weight: number,
            temperature: number,
            pressure: number,
            others: { clave: string, valor: string | number }[],
        }
    ) {
        this.id = id;
        this.paciente = paciente;
        this.especialista = especialista;
        this.schedule = schedule;
        this.status = status;
        (survey) ? this.survey = survey : this.survey = null;
        (qualify) ? this.qualify = qualify : this.qualify = null;
        (commentPaciente) ? this.commentPaciente = commentPaciente : this.commentPaciente = null;
        (commentEspecialista) ? this.commentEspecialista = commentEspecialista : this.commentEspecialista = null;
        (history) ? this.history = history : this.history = null;
        this.time_updated = new Date();
        this.time_created = time_created;
    }
}
