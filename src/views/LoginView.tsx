/**
 * @file LoginView.tsx
 * @description Pantalla de Autenticación con Asignación Automática de Rango Operativo
 * Establecimiento Agropecuario Pozo del Carril · La Aguada
 * UNRC - FCE - Taller de Práctica Profesional II
 */

import React, { useState } from 'react';
import { 
  Lock, 
  User, 
  Eye, 
  EyeOff, 
  ShieldCheck, 
  AlertCircle, 
  ArrowRight, 
  CheckCircle2, 
  Shield 
} from 'lucide-react';
import ganaderiaImg from '../assets/images/ganaderia_integral_1792598800232.jpg';
import { BaseDatosPorcina } from '../types/schema';

interface Props {
  onLogin: (usuario: string, contrasena: string) => Promise<{ success: boolean; message?: string }>;
  db?: BaseDatosPorcina;
}

export const LoginView: React.FC<Props> = ({ onLogin }) => {
  const [usuario, setUsuario] = useState('');
  const [contrasena, setContrasena] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!usuario.trim() || !contrasena) {
      setErrorMsg('Debe completar tanto el usuario como la contraseña.');
      return;
    }

    setIsLoading(true);
    setErrorMsg(null);

    try {
      const result = await onLogin(usuario.trim(), contrasena);
      if (!result.success) {
        setErrorMsg(result.message || 'Credenciales no válidas. Verifique sus datos.');
      }
    } catch (err: any) {
      setErrorMsg(err?.message || 'Error de comunicación al verificar credenciales.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#091710] flex flex-col justify-center items-center p-4 sm:p-6 lg:p-8 font-sans selection:bg-[#205735] selection:text-white">
      {/* Fondo con ambientación agropecuaria */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#143524] via-[#0b1c13] to-[#040b07] opacity-95 pointer-events-none" />

      {/* Contenedor Central */}
      <div className="relative w-full max-w-5xl grid grid-cols-1 lg:grid-cols-12 bg-white rounded-3xl shadow-2xl border border-[#1e4430]/50 overflow-hidden">
        
        {/* Columna Izquierda: Imagen Panorámica Ganadera Integral y Credenciales Institucionales */}
        <div className="lg:col-span-6 bg-gradient-to-b from-[#0e2419] to-[#081710] text-white p-6 sm:p-8 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-[#193a28]">
          <div className="space-y-4">
            {/* Logotipo / Isotipo */}
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-[#1f5336] border border-[#2f784e] flex items-center justify-center text-white font-bold text-xl shadow-lg tracking-tight shrink-0">
                PC
              </div>
              <div>
                <span className="text-[10px] uppercase font-bold tracking-widest text-[#d4a872] block">
                  Establecimiento Agropecuario
                </span>
                <h1 className="text-base sm:text-lg font-bold text-white tracking-tight leading-snug">
                  Pozo del Carril – La Aguada
                </h1>
                <span className="text-[11px] text-[#86a893] font-medium">
                  Facultad de Ciencias Económicas · UNRC
                </span>
              </div>
            </div>

            {/* Alcance Institucional Ganadero */}
            <div className="pt-2 border-t border-[#183c28]">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#143d26] border border-[#24613d] text-[#6ee7b7] text-xs font-bold uppercase tracking-wider">
                <ShieldCheck className="w-3.5 h-3.5 text-[#34d399]" />
                <span>PRODUCCIÓN GANADERA</span>
              </div>
            </div>

            {/* Imagen Principal: Composición equilibrada Porcinos, Bovinos y Ovinos */}
            <div className="rounded-2xl bg-[#0b1f15] border border-[#23583d] overflow-hidden shadow-xl group">
              <div className="relative h-56 sm:h-64 w-full overflow-hidden bg-[#143525]">
                <img 
                  src={ganaderiaImg} 
                  alt="Producción Ganadera Integral: Porcinos, Bovinos y Ovinos en Pozo del Carril" 
                  className="w-full h-full object-cover opacity-95 group-hover:scale-105 transition-transform duration-700" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#06140d] via-transparent to-black/20" />
                
                {/* Etiquetas de las Tres Unidades Productivas */}
                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between gap-1.5 flex-wrap">
                  <div className="flex items-center gap-1.5 bg-[#0a1f13]/90 backdrop-blur-xs px-2.5 py-1 rounded-md border border-[#245b3a] text-[10px] font-semibold text-[#86efac]">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#22c55e] animate-pulse" />
                    <span>Porcinos</span>
                  </div>
                  <div className="flex items-center gap-1.5 bg-[#0a1f13]/90 backdrop-blur-xs px-2.5 py-1 rounded-md border border-[#245b3a] text-[10px] font-semibold text-[#d1fae5]">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#6ee7b7]" />
                    <span>Bovinos</span>
                  </div>
                  <div className="flex items-center gap-1.5 bg-[#0a1f13]/90 backdrop-blur-xs px-2.5 py-1 rounded-md border border-[#245b3a] text-[10px] font-semibold text-[#d1fae5]">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#6ee7b7]" />
                    <span>Ovinos</span>
                  </div>
                </div>
              </div>
            </div>

            <p className="text-xs text-[#8cb098] leading-relaxed">
              Sistema integral de administración ganadera, costos directos y Cuadro de Mando Integral para las unidades de negocio del establecimiento universitario.
            </p>
          </div>

          <div className="mt-6 pt-4 border-t border-[#173825] text-[11px] text-[#84a590] flex items-center justify-between">
            <span>Gestión Ganadera & CMI</span>
            <span className="text-[#6ee7b7] font-medium tracking-wide">FCE · UNRC</span>
          </div>
        </div>

        {/* Columna Derecha: Formulario de Inicio de Sesión */}
        <div className="lg:col-span-6 p-6 sm:p-10 flex flex-col justify-center bg-[#fafcfa]">
          <div className="max-w-md w-full mx-auto">
            <div className="mb-6">
              <span className="text-[11px] uppercase tracking-widest text-[#8a5b28] font-bold block mb-1">
                Acceso al Sistema
              </span>
              <h2 className="text-xl sm:text-2xl font-bold text-[#143222] tracking-tight">
                Iniciar Sesión · Unidad Productiva
              </h2>
              <p className="text-xs sm:text-sm text-[#4d6657] mt-1">
                Ingrese su usuario y contraseña. Su rango operativo se asignará automáticamente.
              </p>
            </div>

            {/* Formulario con evento onSubmit completo */}
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Campo Usuario */}
              <div>
                <label 
                  htmlFor="usuario-input" 
                  className="block text-xs font-semibold text-[#22402f] mb-1.5"
                >
                  Usuario de Granja
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-[#688a75] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input
                    id="usuario-input"
                    name="username"
                    type="text"
                    required
                    autoFocus
                    autoComplete="username"
                    enterKeyHint="next"
                    placeholder="Ingrese su nombre de usuario"
                    value={usuario}
                    onChange={(e) => {
                      setUsuario(e.target.value);
                      setErrorMsg(null);
                    }}
                    className="w-full pl-10 pr-3 py-2.5 text-xs sm:text-sm border border-[#c9d7c8] rounded-xl bg-white hover:bg-[#fcfdfc] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#235c39] focus:border-[#235c39] transition-all text-[#153422] placeholder:text-[#8ea496]"
                  />
                </div>
              </div>

              {/* Campo Contraseña con opción de ver contraseña */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label 
                    htmlFor="contrasena-input" 
                    className="block text-xs font-semibold text-[#22402f]"
                  >
                    Contraseña
                  </label>
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="text-[11px] text-[#225e3b] hover:text-[#18452b] font-semibold flex items-center gap-1 cursor-pointer transition-colors"
                  >
                    {showPassword ? (
                      <>
                        <EyeOff className="w-3.5 h-3.5" />
                        <span>Ocultar</span>
                      </>
                    ) : (
                      <>
                        <Eye className="w-3.5 h-3.5" />
                        <span>Ver contraseña</span>
                      </>
                    )}
                  </button>
                </div>

                <div className="relative">
                  <Lock className="w-4 h-4 text-[#688a75] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input
                    id="contrasena-input"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    required
                    autoComplete="current-password"
                    enterKeyHint="go"
                    placeholder="••••••••••••"
                    value={contrasena}
                    onChange={(e) => {
                      setContrasena(e.target.value);
                      setErrorMsg(null);
                    }}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        handleSubmit(e);
                      }
                    }}
                    className="w-full pl-10 pr-11 py-2.5 text-xs sm:text-sm border border-[#c9d7c8] rounded-xl bg-white hover:bg-[#fcfdfc] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#235c39] focus:border-[#235c39] transition-all text-[#153422] placeholder:text-[#8ea496]"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    tabIndex={-1}
                    aria-label={showPassword ? 'Ocultar contraseña' : 'Ver contraseña'}
                    title={showPassword ? 'Ocultar contraseña' : 'Ver contraseña'}
                    className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-[#6a8775] hover:text-[#19402a] transition-colors cursor-pointer rounded-lg hover:bg-[#edf4ee]"
                  >
                    {showPassword ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>

              {/* Mensaje de error amigable y descriptivo */}
              {errorMsg && (
                <div 
                  role="alert" 
                  className="p-3.5 rounded-xl bg-[#fdf2f2] border border-[#f8c8c8] text-xs text-[#8f2828] flex items-start gap-2.5 animate-in fade-in duration-200"
                >
                  <AlertCircle className="w-4 h-4 text-[#9e2a2b] shrink-0 mt-0.5" />
                  <div className="flex-1">
                    <span className="font-semibold block">Error de autenticación</span>
                    <span className="text-[#6d2c2c] text-[11px]">{errorMsg}</span>
                  </div>
                </div>
              )}

              {/* Botón Principal de Envío */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-3 px-4 bg-[#1f5438] hover:bg-[#17432c] active:bg-[#113321] text-white text-xs sm:text-sm font-bold rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed border border-[#163f2a]"
                >
                  {isLoading ? (
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      <span>Verificando credenciales y asignando rango...</span>
                    </div>
                  ) : (
                    <>
                      <span>Ingresar a Producción Ganadera</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Pie de pantalla */}
      <footer className="mt-6 text-center text-xs text-[#708b7b]">
        Sistema de Gestión Ganadera · Establecimiento Pozo del Carril – La Aguada | UNRC
      </footer>
    </div>
  );
};
