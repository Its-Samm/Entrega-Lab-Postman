export interface TableFacultiesEvents {
    id: number;
    action: TableFacultiesActions; 
}

export type TableFacultiesActions = 'detail' | 'edit' | 'delete';