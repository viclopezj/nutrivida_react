import { describe, it, expect, vi, afterEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import FormularioProducto from '../components/FormularioProducto';
import { mensajes } from '../utils/validaciones';

describe('FormularioProducto', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('PU-010: debe rechazar un precio inválido con alert y aceptar datos válidos llamando a onAgregar', () => {
    // 1 - Preparación (Arrange)
    const onAgregar = vi.fn();
    const alertSimulado = vi.spyOn(window, 'alert').mockImplementation(() => {});
    const { container } = render(<FormularioProducto onAgregar={onAgregar} />);
    const formulario = container.querySelector('#form-producto');

    // 2 - Ejecución (Act): nombre y descripción válidos, precio inválido (0)
    fireEvent.change(screen.getByLabelText('Nombre del producto'), { target: { value: 'Proteína de Soya 1kg' } });
    fireEvent.change(screen.getByLabelText('Descripción'), { target: { value: 'Proteína vegetal en polvo' } });
    fireEvent.change(screen.getByLabelText('Precio ($)'), { target: { value: '0' } });
    fireEvent.submit(formulario);

    // 3 - Verificación (Assert): precio inválido
    expect(alertSimulado).toHaveBeenCalledTimes(1);
    expect(alertSimulado).toHaveBeenCalledWith(mensajes.productoPrecio);
    expect(onAgregar).not.toHaveBeenCalled();

    // Se repite con datos válidos
    fireEvent.change(screen.getByLabelText('Precio ($)'), { target: { value: '9990' } });
    fireEvent.submit(formulario);

    expect(alertSimulado).toHaveBeenCalledTimes(1); // no hubo un nuevo alert
    expect(onAgregar).toHaveBeenCalledTimes(1);
    expect(onAgregar).toHaveBeenCalledWith(
      expect.objectContaining({
        nombre: 'Proteína de Soya 1kg',
        descripcion: 'Proteína vegetal en polvo',
        precio: 9990
      })
    );
  });
});
