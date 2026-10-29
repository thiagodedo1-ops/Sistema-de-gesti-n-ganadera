/**
 * @file AlimentacionPotrerosBovinoView.tsx
 * @description Sub-módulo: Alimentación, Potreros & Carga (EV/ha)
 * Establecimiento Pozo del Carril · La Aguada (UNRC)
 * Balance forrajero, receptividad en Equivalente Vaca por hectárea (EV/ha),
 * potreros de pastoreo directo (Alfalfa, Festuca, Verdeos) y raciones de confinamiento/feedlot.
 */

import React, { useState } from 'react';
import { 
  Wheat, 
  Layers, 
  Activity, 
  CheckCircle2, 
  AlertTriangle, 
  Compass, 
  Utensils, 
  Scale, 
  Sliders, 
  ArrowRight,
  Plus
} from 'lucide-react';
import { BaseDatosPorcina, PotreroBovino, DietaRacionBovina, Usuario } from '../../types/schema';
import { getRolePermissions } from '../../lib/permissions';
import { useTheme } from '../../context/ThemeContext';

interface Props {
  db: BaseDatosPorcina;
  currentUser: Usuario | null;
  onSaveRecord: (table: keyof BaseDatosPorcina, record: any) => Promise<any>;
}

export const AlimentacionPotrerosBovinoView: React.FC<Props> = ({
  db,
  currentUser,
  onSaveRecord
}) => {
  const { theme } = useTheme();
  const permissions = getRolePermissions(currentUser);
  const potreros = db.Potreros_Bovinos || [];
  const dietas = db.Dieta_Racion_Bovina || [];
  const categorias = db.Categorias_Bovinas || [];
  const transferencias = db.Transferencias_Granos?.filter(t => t.unidad_destino_id === 'UN_BOVINOS') || [];

  // Cálculos de carga
  const superficieTotalHa = 180;
  const totalEV = categorias.reduce((acc, c) => {
    let factor = 1.0;
    if (c.categoria.includes('Toro')) factor = 1.4;
    else if (c.categoria.includes('Vaca') || c.categoria.includes('Vientre')) factor = 1.0;
    else if (c.categoria.includes('Vaquillona')) factor = 0.8;
    else if (c.categoria.includes('Novillo')) factor = 0.9;
    else if (c.categoria.includes('Ternero')) factor = 0.5;
    return acc + (c.cabezas * factor);
  }, 0);
  const cargaMediaEVHa = totalEV / superficieTotalHa;

  const totalKgMaizPropio = transferencias.reduce((acc, t) => acc + (t.kg_transferidos || 0), 0);

  return (
    <div className="space-y-6 max-w-[1440px] mx-auto pb-12 animate-fade-in font-sans">
      {/* Encabezado */}
      <div className={`bg-white border ${theme.border} rounded-xl p-5 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4`}>
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className={`p-1.5 ${theme.iconBg} rounded-lg`}>
              <Wheat className="w-5 h-5" />
            </span>
            <span className="text-xs font-semibold uppercase tracking-wider text-[#5c3a21]">
              Producción Bovina · Pozo del Carril (UNRC)
            </span>
          </div>
          <h1 className="text-xl font-bold text-[#2c1d11] tracking-tight">
            Alimentación, Potreros & Carga (EV/ha)
          </h1>
          <p className="text-xs text-[#5c3a21] mt-0.5">
            Balance forrajero pastoril, receptividad EV/ha, raciones balanceadas de corral y aprovechamiento de grano propio
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <div className="px-3 py-1.5 bg-[#fbf4ee] border border-[#e7d4c4] rounded-lg text-xs">
            <span className="text-[#5c3a21]">Superficie Asignada: </span>
            <strong className="text-[#2c1d11] font-mono">180 ha</strong>
          </div>
        </div>
      </div>

      {/* Tira de Resumen Forrajero */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-xl border border-[#e7d4c4] shadow-xs">
          <div className="text-[11px] font-semibold text-[#8c674e] uppercase">Carga Media General</div>
          <div className="text-2xl font-bold text-[#78350f] font-mono tabular-nums mt-1">
            {cargaMediaEVHa.toFixed(2)} <span className="text-xs font-normal text-[#5c3a21]">EV/ha</span>
          </div>
          <div className="text-[11px] text-[#5c3a21] mt-0.5">Receptividad recomendada: 0.85 - 1.10</div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-[#e7d4c4] shadow-xs">
          <div className="text-[11px] font-semibold text-[#8c674e] uppercase">Potreros Ganaderos</div>
          <div className="text-2xl font-bold text-[#2c1d11] font-mono tabular-nums mt-1">
            {potreros.length} <span className="text-xs font-normal text-[#5c3a21]">sectores</span>
          </div>
          <div className="text-[11px] text-[#5c3a21] mt-0.5">Alfalfa, Festuca, Verdeos y Feedlot</div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-[#e7d4c4] shadow-xs">
          <div className="text-[11px] font-semibold text-[#8c674e] uppercase">Total Equivalente Vaca</div>
          <div className="text-2xl font-bold text-[#2c1d11] font-mono tabular-nums mt-1">
            {totalEV.toFixed(1)} <span className="text-xs font-normal text-[#5c3a21]">EV</span>
          </div>
          <div className="text-[11px] text-[#5c3a21] mt-0.5">Total rodeo bovino activo</div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-[#e7d4c4] shadow-xs">
          <div className="text-[11px] font-semibold text-[#8c674e] uppercase">Maíz Propio UNRC</div>
          <div className="text-2xl font-bold text-[#78350f] font-mono tabular-nums mt-1">
            {totalKgMaizPropio.toLocaleString('es-AR')} <span className="text-xs font-normal text-[#5c3a21]">kg</span>
          </div>
          <div className="text-[11px] text-[#5c3a21] mt-0.5">Transferido desde UN Agrícola</div>
        </div>
      </div>

      {/* Sección 1: Distribución por Potreros y Receptividad */}
      <div className="bg-white border border-[#e7d4c4] rounded-xl p-5 shadow-xs">
        <div className="flex items-center justify-between pb-3 border-b border-[#f2e6de] mb-4">
          <div>
            <h2 className="text-base font-bold text-[#2c1d11]">Potreros de Pastoreo y Corrales de Encierre</h2>
            <p className="text-xs text-[#5c3a21]">Recurso forrajero, receptividad en EV/ha y carga instantánea asignada</p>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-[#e7d4c4] text-[#8c674e] font-semibold bg-[#fbf4ee]">
                <th className="py-2.5 px-3">Potrero / Sector</th>
                <th className="py-2.5 px-3">Recurso Forrajero</th>
                <th className="py-2.5 px-3 text-right">Superficie</th>
                <th className="py-2.5 px-3 text-right">Receptividad Base</th>
                <th className="py-2.5 px-3 text-right">Cabezas Actuales</th>
                <th className="py-2.5 px-3 text-right">Carga Actual</th>
                <th className="py-2.5 px-3 text-center">Estado del Pastizal</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#f2e6de]">
              {potreros.map((p) => {
                const esSobrepastoreo = p.carga_actual_ev_ha > p.receptividad_ev_ha * 1.15;
                return (
                  <tr key={p.id} className="hover:bg-[#fbf4ee]/50 transition-colors">
                    <td className="py-2.5 px-3 font-bold text-[#2c1d11]">
                      {p.nombre}
                    </td>
                    <td className="py-2.5 px-3 text-[#5c3a21]">
                      {p.tipo_recurso}
                    </td>
                    <td className="py-2.5 px-3 text-right font-mono tabular-nums text-[#2c1d11]">
                      {p.superficie_ha} ha
                    </td>
                    <td className="py-2.5 px-3 text-right font-mono tabular-nums text-[#5c3a21]">
                      {p.receptividad_ev_ha.toFixed(2)} EV/ha
                    </td>
                    <td className="py-2.5 px-3 text-right font-mono tabular-nums font-semibold text-[#2c1d11]">
                      {p.cabezas_asignadas} cab
                    </td>
                    <td className="py-2.5 px-3 text-right font-mono tabular-nums font-bold">
                      <span className={esSobrepastoreo ? 'text-rose-600' : 'text-[#78350f]'}>
                        {p.carga_actual_ev_ha.toFixed(2)} EV/ha
                      </span>
                    </td>
                    <td className="py-2.5 px-3 text-center">
                      <span className="text-[11px] font-semibold text-[#78350f]">
                        {p.estado_pastura}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Sección 2: Raciones Formuladas y Dietas de Confinamiento */}
      <div className="bg-white border border-[#e7d4c4] rounded-xl p-5 shadow-xs">
        <div className="pb-3 border-b border-[#f2e6de] mb-4">
          <div className="flex items-center gap-2">
            <span className="p-1 bg-[#fbf4ee] text-[#78350f] rounded border border-[#e7d4c4]">
              <Utensils className="w-4 h-4" />
            </span>
            <h2 className="text-base font-bold text-[#2c1d11]">Dietas Balanceadas y Raciones de Corral</h2>
          </div>
          <p className="text-xs text-[#5c3a21] mt-0.5">
            Formulación zootécnica para adaptación, recría y terminación con grano de maíz propio y subproductos
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {dietas.map((d) => (
            <div key={d.id} className="p-4 bg-[#fbf4ee]/50 border border-[#e7d4c4] rounded-xl space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-[#f2e6de]">
                <div>
                  <h3 className="font-bold text-xs text-[#2c1d11]">{d.nombre}</h3>
                  <span className="text-[10px] text-[#5c3a21]">{d.etapa_destino}</span>
                </div>
                <div className="text-right">
                  <span className="text-[10px] text-[#5c3a21] block">ADPV Proyectado:</span>
                  <span className="font-mono text-xs font-bold text-[#78350f]">+{d.adpv_esperado_kg_dia} kg/día</span>
                </div>
              </div>

              {/* Ingredientes */}
              <div className="space-y-1 text-xs">
                <span className="text-[10px] uppercase font-bold text-[#8c674e] tracking-wider block">Ingredientes de la Ración:</span>
                {d.ingredientes.map((ing, idx) => (
                  <div key={idx} className="flex justify-between text-[#5c3a21]">
                    <span>{ing.insumo}</span>
                    <span className="font-mono tabular-nums">{ing.kg_dia_cab} kg/cab/día ({ing.porcentaje_ms}%)</span>
                  </div>
                ))}
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-[#f2e6de] text-xs">
                <span>Consumo MS: <strong className="font-mono">{d.kg_ms_dia_cab} kg MS/cab</strong></span>
                <span>Costo Ración: <strong className="font-mono text-[#2c1d11]">${d.costo_estimado_cab_dia}/cab/día</strong></span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
