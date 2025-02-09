export function circularAnimation(orbitRadius: number, angle: number): [number, number, number] {
    const x = orbitRadius * Math.cos(angle); // Pos en X
    const y = 0; // Pos en Y
    const z = orbitRadius * Math.sin(angle); // Pos en Z

    return [x, y, z];
}