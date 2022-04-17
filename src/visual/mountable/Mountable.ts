export class Mountable {
    private parent?: HTMLElement;
    private current?: HTMLElement;

    public mount(parent: HTMLElement, current: HTMLElement) {
        if (this.parent) {
            throw new Error("Already mounted");
        }

        parent.appendChild(current);
        this.parent = parent;
        this.current = current;
    }

    public unmount() {
        if (!this.parent || !this.current) {
            return;
        }

        this.parent.removeChild(this.current);
        this.parent = undefined;
        this.current = undefined;
    }
}
