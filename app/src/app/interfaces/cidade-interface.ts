import { Estado } from './estado-interface';
export interface Cidade {
    id: string;
    nome: string;
    estado: Estado;
    dataCriacao: Date;
    dataUltimaAtualizacao: Date;
}