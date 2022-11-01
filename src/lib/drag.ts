interface DragOptions {
    onDrag: (value: boolean) => void;
    onProgress: (x: number) => void;
}

export class Drag {
    private container: HTMLElement;
    private containerRect: DOMRect;
    private options: DragOptions;

    private dragging: boolean = false;
    private x: number = 0;

    constructor(container: HTMLElement, options: DragOptions) {
        this.container = container;
        this.containerRect = container.getBoundingClientRect();
        this.options = options;
        this.init();
    }

    private init(): void {
        this.addListeners();
    }

    private startDrag(): void {
        this.dragging = true;
        this.options.onDrag(true);
    }

    private cancelDrag(): void {
        if (this.dragging) {
            this.options.onProgress(this.x);
        }

        this.dragging = false;
        this.options.onDrag(false);
    }

    private handleProgress(e: MouseEvent, force?: boolean): void {
        if (!this.dragging && !force) {
            return;
        }

        e.preventDefault();

        const { left, width } = this.containerRect;

        this.x = (e.clientX - left) / width;

        if (force) {
            this.options.onProgress(this.x);
        }
    }

    private onClick(e: MouseEvent): void {
        this.handleProgress(e, true);
    }

    private addListeners(): void {
        this.container.addEventListener("click", this.onClick.bind(this));
        this.container.addEventListener("mousedown", this.startDrag.bind(this));
        document.addEventListener("mouseup", this.cancelDrag.bind(this));
        document.addEventListener("mouseleave", this.cancelDrag.bind(this));
        document.addEventListener("mousemove", this.handleProgress.bind(this));
    }

    private removeListeners(): void {
        this.container.removeEventListener("click", this.onClick.bind(this));
        this.container.removeEventListener("mousedown", this.startDrag.bind(this));
        document.removeEventListener("mouseup", this.cancelDrag.bind(this));
        document.removeEventListener("mouseleave", this.cancelDrag.bind(this));
        document.removeEventListener("mousemove", this.handleProgress.bind(this));
    }

    public destroy(): void {
        this.removeListeners();
    }
}
