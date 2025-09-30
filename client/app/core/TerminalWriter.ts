export interface TerminalWriterOptions {
	username: string;
	distro: string;
	startWithPath?: boolean;
	cursor?: HTMLElement;
	writeDelay?: number;
}

export interface Position {
	x: number;
	y: number;
}

export class TerminalWriter {
	public get path(): string {
		return `${this.opts.username}@${this.opts.distro}:~$ `;
	}

	private _isEmpty?: boolean;
	public get isEmpty(): boolean {
		if (this._isEmpty === false) {
			return false;
		}

		const isEmpty = this.el.innerText.length === 0;
		return isEmpty ? true : (this._isEmpty = false);
	}

	public get endsWithPath(): boolean {
		const lastLine = this.lines[this.lines.length - 1];
		return lastLine ? lastLine.endsWith(this.path) : false;
	}

	public get cursorIndex(): Position {
		const lineIndex = this.lines.length - 1;
		const line = this.lines[lineIndex];
		if (!line) {
			return { x: 0, y: 0 };
		}

		return {
			y: lineIndex,
			x: line.length ?? 0
		};
	}

	public get cursorPosition(): Position {
		const index = this.cursorIndex;
		const lineToCharHeightDiff = this.lineHeight - this.charHeight;

		return {
			x: index.x * this.charWidth,
			y: index.y * this.lineHeight + lineToCharHeightDiff / 2
		};
	}

	private readonly computedElementStyle: CSSStyleDeclaration;
	private readonly lines: string[] = [];

	private readonly charWidth: number;
	private readonly charHeight: number;
	private readonly lineHeight: number;
	
	constructor(
		public readonly el: HTMLElement, 
		public readonly opts: TerminalWriterOptions
	) { 
		this.computedElementStyle = window.getComputedStyle(this.el);

		const metrics = this.getTextMetrics();
		this.charWidth = metrics.width;
		this.charHeight = metrics.fontBoundingBoxAscent + metrics.fontBoundingBoxDescent;
		this.lineHeight = parseFloat(this.computedElementStyle.lineHeight);

		this.initCursor();

		if (this.opts.startWithPath !== false) {
			this.appendLine(this.path);
			this.render();
		}
	}

	private getTextMetrics(): TextMetrics {
		const canvas = new OffscreenCanvas(1, 1);
		const ctx = canvas.getContext('2d');
		if (!ctx) {
			throw new Error('Failed to get canvas context');
		}

		ctx.font = this.computedElementStyle.font;
		return ctx.measureText('M');
	}

	private initCursor() {
		if (!this.opts.cursor) {
			return;
		}

		this.opts.cursor.style.background = this.computedElementStyle.color;
		this.opts.cursor.style.width = `${this.charWidth}px`;
		this.opts.cursor.style.height = `${this.charHeight}px`;
	}

	public async sleep(ms: number): Promise<void> {
		return new Promise((resolve) => setTimeout(resolve, ms));
	}

	public clear() {
		this.lines.length = 0;
		if (this.opts.startWithPath !== false) {
			this.appendLine(this.path);
		}

		this.render();
	}

	public clearLine(index?: number) {
		index = index ?? this.lines.length - 1;
		this.lines.splice(index, 1);
		this.render();
	}

	public async exec(command: string, isBlocking?: boolean, output?: string | string[]): Promise<void> {
		if (!this.endsWithPath) {
			this.appendLine(this.path);
		}
		if (command.length) {
			await this.write(command);
			if (output) {
				await this.sleep(70);
			}
		}
		if (output) {
			this.appendLine(output);
		}
		if (!isBlocking && !this.endsWithPath) {
			this.appendLine(this.path);
		}

		this.render();
	}

	public async write(text: string): Promise<void> {
		return new Promise((resolve) => {
			let index = 0;
			const intervalId = setInterval(() => {
				if (index < text.length) {
					this.append(text.charAt(index));
					this.render();

					index++;
				} else {
					clearInterval(intervalId);
					resolve();
				}
			}, this.opts.writeDelay ?? 50);
		});
	}

	public append(text: string) {
		this.lines[this.lines.length - 1] += text;
	}

	public appendLine(text: string | string[]) {
		text = Array.isArray(text) ? text : [text];
		this.lines.push(...text);
	}

	public render() {
		this.el.innerHTML = this.lines
			.map(line => {
				let cls = '';
				if (line.startsWith('[Warning]')) {
					cls = 'warning';
				} else if (line.startsWith('[Info]')) {
					cls = 'info';
				}

				return `<span class="line ${cls}">${line}</span>`;
			})
			.join('\n');


		if (!this.opts.cursor) {
			return;
		}

		const cursorPos = this.cursorPosition;	
		this.opts.cursor.style.translate = `${cursorPos.x}px ${cursorPos.y}px`;
	}
}