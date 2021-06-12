export type SubscriberArgs<T> = T extends undefined ? [] : [T];
export type CustomEventSubscriber<T> = (...args: SubscriberArgs<T>) => unknown | Promise<unknown>;

export class CustomEvent<T = undefined> {
    private subscribers: CustomEventSubscriber<T>[] = [];

    public on(subscriber: CustomEventSubscriber<T>) {
        if (this.subscribers.includes(subscriber)) {
            return;
        }

        this.subscribers.push(subscriber);
    }

    public off(subscriber: CustomEventSubscriber<T>) {
        const index = this.subscribers.findIndex(q => q === subscriber);

        if (index < 0) {
            return;
        }

        this.subscribers.splice(index, 1);
    }

    public async trigger(...args: SubscriberArgs<T>) {
        const promises = this.subscribers.map(q => q(...args));
        await Promise.all(promises);
    }
}
