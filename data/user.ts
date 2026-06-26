export type User = {
	id: number;
	name: string;
	email: string;
};

export const users: User[] = [
	{ id: 1, name: 'Jack', email: 'jack@example.com' },
	{ id: 2, name: 'Alice', email: 'alice@example.com' },
];
