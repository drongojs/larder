export type CallbackType<T> = () => (Promise<T> | T);

export type Deps = [ string, ...any[] ];
