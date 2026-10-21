import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import ItemCarrito from '../components/ItemCarrito';

describe('ItemCarrito', () => {
  it('PU-009: debe mostrar los datos del producto y avisar qué producto quitar', () => {
    // 1 - Preparación (Arrange)
    const producto = {
      id: 4,
      nombre: 'Aceite de Oliva Extra Virgen 500ml',
      categoria: 'Despensa',
      precio: 7990,
      imagenes: ['aceite.jpg']
    };
    const onQuitar = vi.fn();

    // 2 - Ejecución (Act)
    render(<ItemCarrito producto={producto} cantidad={2} onQuitar={onQuitar} />);
    fireEvent.click(screen.getByRole('button', { name: 'Quitar' }));

    // 3 - Verificación (Assert)
    expect(screen.getByText('Aceite de Oliva Extra Virgen 500ml')).toBeInTheDocument();
    expect(screen.getByText(/Cantidad: 2/)).toBeInTheDocument();
    expect(onQuitar).toHaveBeenCalledTimes(1);
    expect(onQuitar).toHaveBeenCalledWith(4);
  });
});
