import { describe, it, expect, afterEach } from 'vitest';
import { render, screen, cleanup } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import RutaPrivada from '../components/RutaPrivada';
import { guardarSesion } from '../utils/sesion';

// Renderiza RutaPrivada protegiendo un contenido de prueba, con una ruta /login de prueba como destino de la redirección.
const renderizarRuta = () =>
  render(
    <MemoryRouter initialEntries={['/admin']}>
      <Routes>
        <Route path="/login" element={<p>Pantalla de login</p>} />
        <Route path="/admin" element={<RutaPrivada><p>Contenido protegido</p></RutaPrivada>} />
      </Routes>
    </MemoryRouter>
  );

describe('RutaPrivada', () => {
  afterEach(() => {
    cleanup();
    localStorage.clear();
  });

  it('PU-008: solo el admin con sesión ve el contenido; paciente y sin sesión van a /login', () => {
    // --- Escenario 1: admin ---
    // 1 - Preparación (Arrange)
    guardarSesion({ id: 1, nombre: 'Administrador NutriVida', correo: 'admin@duocuc.cl', contrasenia: 'Admin1234', rol: 'admin' });
    // 2 - Ejecución (Act)
    renderizarRuta();
    // 3 - Verificación (Assert)
    expect(screen.getByText('Contenido protegido')).toBeInTheDocument();
    expect(screen.queryByText('Pantalla de login')).not.toBeInTheDocument();
    cleanup();

    // --- Escenario 2: paciente ---
    localStorage.clear();
    guardarSesion({ id: 2, nombre: 'Ana Pérez González', correo: 'paciente@gmail.com', contrasenia: 'Paciente1234', rol: 'paciente' });
    renderizarRuta();
    expect(screen.getByText('Pantalla de login')).toBeInTheDocument();
    expect(screen.queryByText('Contenido protegido')).not.toBeInTheDocument();
    cleanup();

    // --- Escenario 3: sin sesión ---
    localStorage.clear();
    renderizarRuta();
    expect(screen.getByText('Pantalla de login')).toBeInTheDocument();
    expect(screen.queryByText('Contenido protegido')).not.toBeInTheDocument();
  });
});
