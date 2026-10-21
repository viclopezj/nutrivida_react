import { describe, it, expect, beforeEach } from 'vitest';
import {
  obtenerCarrito,
  obtenerCantidadCarrito,
  agregarAlCarrito,
  quitarDelCarrito,
  vaciarCarrito
} from '../utils/carrito';

describe('carrito', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('PU-006: debe acumular las unidades por producto y sumar el total de unidades', () => {
    // 1 - Preparación (Arrange): carrito vacío en localStorage (beforeEach)

    // 2 - Ejecución (Act)
    agregarAlCarrito(1, 2);
    agregarAlCarrito(1, 3);
    agregarAlCarrito(4, 1);
    const carrito = obtenerCarrito();
    const total = obtenerCantidadCarrito();

    // 3 - Verificación (Assert)
    expect(carrito).toEqual([
      { id: 1, cantidad: 5 },
      { id: 4, cantidad: 1 }
    ]);
    // Suma de unidades (5 + 1), no de productos distintos (2)
    expect(total).toBe(6);
  });

  it('PU-007: debe tratar cantidad 0 como 1, quitar un producto y dejar el carrito vacío al vaciarlo', () => {
    // 1 - Preparación (Arrange)
    agregarAlCarrito(2, 3);
    agregarAlCarrito(5, 1);

    // 2 - Ejecución (Act)
    agregarAlCarrito(7, 0);
    const conProductoSiete = obtenerCarrito();
    const tras_quitar = quitarDelCarrito(2);
    vaciarCarrito();
    const carritoVacio = obtenerCarrito();
    const totalVacio = obtenerCantidadCarrito();

    // 3 - Verificación (Assert)
    expect(conProductoSiete.find((item) => item.id === 7)).toEqual({ id: 7, cantidad: 1 });
    expect(tras_quitar.find((item) => item.id === 2)).toBeUndefined();
    expect(tras_quitar).toEqual([
      { id: 5, cantidad: 1 },
      { id: 7, cantidad: 1 }
    ]);
    expect(carritoVacio).toEqual([]);
    expect(totalVacio).toBe(0);
  });
});
