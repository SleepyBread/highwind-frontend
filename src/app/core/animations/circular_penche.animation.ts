export function circularAnimation(orbitRadius: number, angle: number, orbitalAngle: number): [number, number, number] {
    const x = orbitRadius * Math.cos(angle); // Pos en X
    const y = orbitRadius * Math.sin(angle) * Math.sin(orbitalAngle); // Pos en Y
    const z = orbitRadius * Math.sin(angle); // Pos en Z

    return [x, y, z];
}