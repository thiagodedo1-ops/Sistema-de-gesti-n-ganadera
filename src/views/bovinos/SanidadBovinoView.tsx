/**
 * @file SanidadBovinoView.tsx
 * @description Sub-módulo: Sanidad Oficial SENASA
 * Establecimiento Pozo del Carril · La Aguada (UNRC)
 * Libreta sanitaria obligatoria: Planes de vacunación oficial antiaftosa, carbunclo bacteridiano,
 * brucelosis, control de ecto/endoparásitos y registro de actas veterinarias oficiales.
 */

import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Plus, 
  Calendar, 
  FileText, 
  CheckCircle2, 
  AlertTriangle, 
  X, 
  Award,
  Search,
  Activity
} from 'lucide-react';
import { BaseDatosPorcina, EventoSanitarioBovino, Usuario } from '../../types/schema';
import { getRolePermissions } from '../../lib/permissions';
import { useTheme } from '../../context/ThemeContext';
import { RowActions } from '../../components/RowActions';
import { RecordDetailModal } from '../../components/RecordDetailModal';

interface Props {
  db: BaseDatosPorcina;
  currentUser: Usuario | null;
  onSaveRecord: (table: keyof BaseDatosPorcina, record: any) => Promise<any>;
}

export const SanidadBovinoView: React.FC<Props> = ({
  db,
  currentUser,
  onSaveRecord
}) => {
  const { theme } = useTheme();
  const permissions = getRolePermissions(currentUser);
  const eventos = db.Eventos_Sanitarios_Bovinos || [];
  const categorias = db.Categorias_Bovinas || [];
  const totalCabezas = categorias.reduce((acc, c) => acc + (c.cabezas || 0), 0);

  const [feedbackMsg, setFeedbackMsg] = useState<string | null>(null);
  const [showSanidadModal, setShowSanidadModal] = useState(false);

  const [editingSanidadId, setEditingSanidadId] = useState<string | null>(null);
  const [detailRecord, setDetailRecord] = useState<{ record: any; tableName: string; unit: 'PORCINOS' | 'BOVINOS' | 'OVINOS'; title: string } | null>(null);

  // Formulario Sanidad
  const [sanidadForm, setSanidadForm] = useState({
    tipo_evento: 'Vacunación Aftosa' as EventoSanitarioBovino['tipo_evento'],
    fecha: new Date().toISOString().split('T')[0],
    cabezas_tratadas: totalCabezas,
    producto_aplicado: 'Aftosa Bivalente Biogénesis Bagó',
    responsable: 'SENASA / Plan Local UNRC',
    certificado_senasa_nro: 'ACTA-2025-1420',
    observaciones: 'Campaña oficial obligatoria de otoño SENASA'
  });

  const handleEditarSanidad = (ev: EventoSanitarioBovino) => {
    setEditingSanidadId(ev.id);
    setSanidadForm({
      tipo_evento: ev.tipo_evento || 'Vacunación Aftosa',
      fecha: ev.fecha || new Date().toISOString().split('T')[0],
      cabezas_tratadas: Number(ev.cabezas_tratadas) || totalCabezas,
      producto_aplicado: ev.producto_aplicado || '',
      responsable: ev.responsable || '',
      certificado_senasa_nro: ev.certificado_senasa_nro || '',
      observaciones: ev.observaciones || ''
    });
    setShowSanidadModal(true);
  };

  const handleGuardarSanidad = async (e: React.FormEvent) => {
    e.preventDefault();
    const nuevoEvento: EventoSanitarioBovino = {
      id: editingSanidadId || `SAN_BOV_${Date.now()}`,
      ...sanidadForm,
      cabezas_tratadas: Number(sanidadForm.cabezas_tratadas)
    };
    await onSaveRecord('Eventos_Sanitarios_Bovinos', nuevoEvento);
    setEditingSanidadId(null);
    setShowSanidadModal(false);
    setFeedbackMsg(`Evento sanitario ${editingSanidadId ? 'actualizado' : 'registrado'} en libreta oficial SENASA (${nuevoEvento.certificado_senasa_nro || 'Acta Oficial'}).`);
    setTimeout(() => setFeedbackMsg(null), 3500);
  };

  return (
    <div className="space-y-6 max-w-[1440px] mx-auto pb-12 animate-fade-in">
      {/* Toast Feedback */}
      {feedbackMsg && (
        <div className="fixed top-5 right-5 z-50 bg-[#14281d] text-white px-4 py-2.5 rounded-lg shadow-lg text-xs font-semibold flex items-center gap-2 border border-[#2b583f] animate-fade-in">
          <CheckCircle2 className="w-4 h-4 text-[#78c293]" />
          <span>{feedbackMsg}</span>
        </div>
      )}

      {/* Encabezado */}
      <div className={`bg-white border ${theme.border} rounded-xl p-5 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4 font-sans`}>
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className={`p-1.5 ${theme.iconBg} rounded-lg`}>
              <ShieldCheck className="w-5 h-5" />
            </span>
            <span className="text-xs font-semibold uppercase tracking-wider text-[#5c3a21]">
              Producción Bovina · Pozo del Carril (UNRC)
            </span>
          </div>
          <h1 className="text-xl font-bold text-[#2c1d11] tracking-tight">
            Sanidad Oficial SENASA & Libreta Sanitaria
          </h1>
          <p className="text-xs text-[#5c3a21] mt-0.5">
            Registro de vacunaciones oficiales obligatorias, control de carbunclo, brucelosis y tratamientos veterinarios
          </p>
        </div>

        <button
          onClick={() => setShowSanidadModal(true)}
          className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold ${theme.primary} rounded-lg shadow-xs transition-colors cursor-pointer shrink-0`}
        >
          <Plus className="w-4 h-4" />
          <span>Registrar Evento Sanitario</span>
        </button>
      </div>

      {/* Tira de Resumen Sanitario */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-xl border border-[#e7d4c4] shadow-xs">
          <div className="text-[11px] font-semibold text-[#8c674e] uppercase">Fiebre Aftosa</div>
          <div className="text-xl font-bold text-[#78350f] mt-1 flex items-center gap-1.5">
            <CheckCircle2 className="w-5 h-5 text-emerald-600" />
            <span>Campaña Al Día</span>
          </div>
          <div className="text-[11px] text-[#5c3a21] mt-0.5">Inmunidad 100% rodeo activo</div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-[#e7d4c4] shadow-xs">
          <div className="text-[11px] font-semibold text-[#8c674e] uppercase">Carbunclo Bacteridiano</div>
          <div className="text-xl font-bold text-[#78350f] mt-1 flex items-center gap-1.5">
            <CheckCircle2 className="w-5 h-5 text-emerald-600" />
            <span>Certificado Vigente</span>
          </div>
          <div className="text-[11px] text-[#5c3a21] mt-0.5">Ley Provincial Córdoba</div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-[#e7d4c4] shadow-xs">
          <div className="text-[11px] font-semibold text-[#8c674e] uppercase">Eventos Asentados</div>
          <div className="text-2xl font-bold text-[#2c1d11] font-mono tabular-nums mt-1">
            {eventos.length} <span className="text-xs font-normal text-[#5c3a21]">actas</span>
          </div>
          <div className="text-[11px] text-[#5c3a21] mt-0.5">Libreta Sanitaria UNRC</div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-[#e7d4c4] shadow-xs">
          <div className="text-[11px] font-semibold text-[#8c674e] uppercase">Estado Sanitario General</div>
          <div className="text-xl font-bold text-[#78350f] mt-1">
            Excelente
          </div>
          <div className="text-[11px] text-[#5c3a21] mt-0.5">Sin restricciones para DTE</div>
        </div>
      </div>

      {/* Historial de Eventos Sanitarios */}
      <div className="bg-white border border-[#e7d4c4] rounded-xl p-5 shadow-xs">
        <div className="flex items-center justify-between pb-3 border-b border-[#f2e6de] mb-4">
          <div>
            <h2 className="text-base font-bold text-[#2c1d11]">Actas y Registros Veterinarios Oficiales</h2>
            <p className="text-xs text-[#5c3a21]">Libreta de tratamientos, vacunaciones y certificados de fiscalización</p>
          </div>
          <div className="text-xs font-mono text-[#5c3a21]">
            {eventos.length} registros cargados
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-[#e7d4c4] text-[#8c674e] font-semibold bg-[#fbf4ee]">
                <th className="py-2.5 px-3">Fecha</th>
                <th className="py-2.5 px-3">Tipo de Evento</th>
                <th className="py-2.5 px-3">Producto / Dosis</th>
                <th className="py-2.5 px-3 text-right">Cabezas Tratadas</th>
                <th className="py-2.5 px-3">Nº Certificado / Acta SENASA</th>
                <th className="py-2.5 px-3">Veterinario / Ente Actuante</th>
                <th className="py-2.5 px-3">Observaciones</th>
                <th className="py-2.5 px-3 text-center">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#f2e6de]">
              {eventos.map((ev) => (
                <tr key={ev.id} className="hover:bg-[#fbf4ee]/50 transition-colors">
                  <td className="py-2.5 px-3 font-mono text-[#5c3a21]">
                    {ev.fecha}
                  </td>
                  <td className="py-2.5 px-3 font-semibold text-[#2c1d11]">
                    {ev.tipo_evento}
                  </td>
                  <td className="py-2.5 px-3 text-[#5c3a21]">
                    {ev.producto_aplicado}
                  </td>
                  <td className="py-2.5 px-3 text-right font-mono tabular-nums font-bold text-[#2c1d11]">
                    {ev.cabezas_tratadas} cab
                  </td>
                  <td className="py-2.5 px-3 font-mono text-[#78350f] font-semibold">
                    {ev.certificado_senasa_nro || 'S/N'}
                  </td>
                  <td className="py-2.5 px-3 text-[#5c3a21]">
                    {ev.responsable}
                  </td>
                  <td className="py-2.5 px-3 text-[#5c3a21] max-w-xs truncate">
                    {ev.observaciones || '—'}
                  </td>
                  <td className="py-2.5 px-3 text-center">
                    <RowActions
                      unit="BOVINOS"
                      canEdit={permissions.canModifyRecords}
                      onViewDetail={() => setDetailRecord({ record: ev, tableName: 'Eventos_Sanitarios_Bovinos', unit: 'BOVINOS', title: `EVENTO SANITARIO BOVINO (${ev.certificado_senasa_nro || ev.id})` })}
                      onEdit={() => handleEditarSanidad(ev)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal Nuevo Evento Sanitario */}
      {showSanidadModal && (
        <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-lg w-full p-6 space-y-4 animate-scale-in border border-[#e7d4c4]">
            <div className="flex items-center justify-between pb-3 border-b border-[#f2e6de]">
              <div>
                <span className="text-[10px] uppercase font-bold tracking-wider text-[#78350f] block">
                  Unidad Productiva: Bovinos · Libreta Sanitaria
                </span>
                <h3 className="text-base font-bold text-[#2c1d11]">
                  BOVINOS · ASENTAR EVENTO SANITARIO SENASA
                </h3>
              </div>
              <button onClick={() => setShowSanidadModal(false)} className="text-[#8c674e] hover:text-[#2c1d11]">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleGuardarSanidad} className="space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[#526b5c] font-semibold mb-1">Fecha</label>
                  <input
                    type="date"
                    required
                    value={sanidadForm.fecha}
                    onChange={(e) => setSanidadForm({ ...sanidadForm, fecha: e.target.value })}
                    className="w-full px-3 py-1.5 border border-[#c8d9cc] rounded-lg text-[#14281d]"
                  />
                </div>
                <div>
                  <label className="block text-[#526b5c] font-semibold mb-1">Tipo de Evento</label>
                  <select
                    value={sanidadForm.tipo_evento}
                    onChange={(e) => setSanidadForm({ ...sanidadForm, tipo_evento: e.target.value as any })}
                    className="w-full px-3 py-1.5 border border-[#c8d9cc] rounded-lg text-[#14281d]"
                  >
                    <option value="Vacunación Aftosa">Vacunación Aftosa</option>
                    <option value="Carbunclo">Carbunclo Bacteridiano</option>
                    <option value="Brucelosis">Brucelosis (Vaquillonas)</option>
                    <option value="Desparasitación">Tratamiento Antiparasitario</option>
                    <option value="Tratamiento Cobre / Minerales">Suplementación Mineral / Cobre</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[#526b5c] font-semibold mb-1">Cabezas Tratadas</label>
                  <input
                    type="number"
                    min="1"
                    required
                    value={sanidadForm.cabezas_tratadas}
                    onChange={(e) => setSanidadForm({ ...sanidadForm, cabezas_tratadas: Number(e.target.value) })}
                    className="w-full px-3 py-1.5 border border-[#c8d9cc] rounded-lg text-[#14281d]"
                  />
                </div>
                <div>
                  <label className="block text-[#526b5c] font-semibold mb-1">Acta / Certificado SENASA</label>
                  <input
                    type="text"
                    required
                    value={sanidadForm.certificado_senasa_nro}
                    onChange={(e) => setSanidadForm({ ...sanidadForm, certificado_senasa_nro: e.target.value })}
                    className="w-full px-3 py-1.5 border border-[#c8d9cc] rounded-lg text-[#14281d] font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[#526b5c] font-semibold mb-1">Producto Aplicado / Laboratorio</label>
                <input
                  type="text"
                  required
                  value={sanidadForm.producto_aplicado}
                  onChange={(e) => setSanidadForm({ ...sanidadForm, producto_aplicado: e.target.value })}
                  className="w-full px-3 py-1.5 border border-[#c8d9cc] rounded-lg text-[#14281d]"
                />
              </div>

              <div>
                <label className="block text-[#526b5c] font-semibold mb-1">Veterinario / Responsable</label>
                <input
                  type="text"
                  value={sanidadForm.responsable}
                  onChange={(e) => setSanidadForm({ ...sanidadForm, responsable: e.target.value })}
                  className="w-full px-3 py-1.5 border border-[#c8d9cc] rounded-lg text-[#14281d]"
                />
              </div>

              <div>
                <label className="block text-[#526b5c] font-semibold mb-1">Observaciones</label>
                <input
                  type="text"
                  value={sanidadForm.observaciones}
                  onChange={(e) => setSanidadForm({ ...sanidadForm, observaciones: e.target.value })}
                  className="w-full px-3 py-1.5 border border-[#c8d9cc] rounded-lg text-[#14281d]"
                />
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-[#e5efe7]">
                <button
                  type="button"
                  onClick={() => setShowSanidadModal(false)}
                  className="px-3 py-1.5 text-xs text-[#526b5c] hover:bg-[#edf3ee] rounded-lg"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 text-xs font-semibold text-white bg-[#1c4b31] hover:bg-[#153a26] rounded-lg shadow-xs"
                >
                  Guardar Evento
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <RecordDetailModal
        isOpen={!!detailRecord}
        record={detailRecord?.record}
        tableName={detailRecord?.tableName || ''}
        unit={detailRecord?.unit || 'BOVINOS'}
        title={detailRecord?.title || ''}
        db={db}
        onClose={() => setDetailRecord(null)}
      />
    </div>
  );
};
