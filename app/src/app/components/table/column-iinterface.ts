export interface LinkColumn {
    titulo: string;
    resolveLink: (row) => string;
}
export interface TableColumn {
    id: string;
    label: string;
    tipo?: 'valor' | 'link';
    resolve?: (row) => string;
    links?: LinkColumn[];
}