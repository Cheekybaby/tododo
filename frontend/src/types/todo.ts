export interface Todo {
    _id: string;
    userId: string;
    title: string;
    description: string;
    isCompleted: boolean;
    priority: "low" | "medium" | "high";
    tags: string[];
    createdAt: string;
    updatedAt: string;
}