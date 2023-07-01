class Node {
    constructor(x, y, f, g, h, k) {
    this.x = x;
    this.y = y;
    this.f = f;
    this.g = g;
    this.h = h;
    this.k = k;
    this.parent = null;
    }
    
    getX() {
        return this.x;
    }
    
    getY() {
        return this.y;
    }
    
    getF() {
        return this.f;
    }
    
    setF(f) {
        this.f = f;
    }
    
    getG() {
        return this.g;
    }
    
    setG(g) {
        this.g = g;
    }
    
    getH() {
        return this.h;
    }
    
    setH(h) {
        this.h = h;
    }

    getK() {
        return this.k;
    }
    
    setK(k) {
        this.k = k;
    }
    
    getParent() {
        return this.parent;
    }
    
    setParent(parent) {
        this.parent = parent;
    }
    
    equals(o) {
        if (this === o) {
            return true;
        }
        if (!(o instanceof Node)) {
            return false;
        }
        const node = o;
        return this.x === node.x && this.y === node.y; 
    }
}