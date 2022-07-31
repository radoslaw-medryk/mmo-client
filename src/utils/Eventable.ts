export type EventableFunc<T = void> = (value: T) => Promise<any> | void;

export class Eventable<T> {
    private subscribers = new Set<EventableFunc<T>>();

    public on(func: EventableFunc<T>) {
        this.subscribers.add(func);
    }

    public off(func: EventableFunc<T>) {
        this.subscribers.delete(func);
    }

    public async trigger(value: T extends void ? never : T) {
        const subscribers = Array.from(this.subscribers.values());

        await Promise.all(subscribers.map(func => func(value)));
    }
}
