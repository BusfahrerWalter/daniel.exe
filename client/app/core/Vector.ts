import { random } from "./Util";

export class Vector {
	public static readonly zero = new Vector(0, 0);
	public static readonly one = new Vector(1, 1);

	public static readonly down = new Vector(0, -1);
	public static readonly up = new Vector(0, 1);
	public static readonly left = new Vector(-1, 0);
	public static readonly right = new Vector(1, 0);

	constructor(
		public readonly x: number = 0,
		public readonly y: number = 0
	) { }

	public get magnitude(): number {
		return Math.sqrt(this.x * this.x + this.y * this.y);
	}

	public get normalized(): Vector {
		const mag = this.magnitude;
		return mag === 0 ? Vector.zero : new Vector(this.x / mag, this.y / mag);
	}

	public get invert(): Vector {
		return new Vector(-this.x, -this.y);
	}

	public add(other: Vector): Vector {
		return new Vector(this.x + other.x, this.y + other.y);
	}

	public sub(other: Vector): Vector {
		return new Vector(this.x - other.x, this.y - other.y);
	}

	public mul(other: Vector | number): Vector {
		if (typeof other === "number") {
			return new Vector(this.x * other, this.y * other);
		}
		return new Vector(this.x * other.x, this.y * other.y);
	}

	public div(other: Vector | number): Vector {
		if (typeof other === "number") {
			return new Vector(this.x / other, this.y / other);
		}
		return new Vector(this.x / other.x, this.y / other.y);
	}

	public static distance(v1: Vector, v2: Vector): number {
		const vec = new Vector(v2.x - v1.x, v2.y - v1.y);
		return vec.magnitude;
	}

	public static random(xMin: number, xMax: number, yMin: number, yMax: number): Vector {
		return new Vector(
			random(xMin, xMax),
			random(yMin, yMax)
		);
	}

	public static dot(lhs: Vector, rhs: Vector): number {
		return lhs.x * rhs.x + lhs.y * rhs.y;
	}

	public static cross(a: Vector, b: Vector): number {
		return a.x * b.y - a.y * b.x
	}

	public static reflect(direction: Vector, normal: Vector): Vector {
		const dot = Vector.dot(direction, normal);
		const reflectedX = direction.x - 2 * dot * normal.x;
		const reflectedY = direction.y - 2 * dot * normal.y;
		return new Vector(reflectedX, reflectedY);
	}

	public static intersection(p1: Vector, v1: Vector, p2: Vector, v2: Vector): Vector | null {
		const r = v1.normalized;
		const s = v2.normalized;
		const pq = p2.sub(p1);

		const denom = Vector.cross(r, s);
		if (Math.abs(denom) < 1e-9) {
			return null; // parallel lines
		}

		const t = Vector.cross(pq, s) / denom;
		return new Vector(
			p1.x + r.x * t,
			p1.y + r.y * t
		);
	}
}