export interface TodoItem {
    id?: number;
    title?: string;
    note?: string;
    important?: boolean;
    starred?: boolean;
    done?: boolean;
    trashed?: boolean,
    completed?: boolean;
    selected?: boolean;
    startDate?: string;
    dueDate?: string;

    tag?: number[];
}

export interface TagItem {
    id?: number;
    name?: string;
}