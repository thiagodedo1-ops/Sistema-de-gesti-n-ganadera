import React, { useState } from 'react';
import { BaseDatosPorcina, EventoSanitarioOvino, Usuario } from '../../types/schema';
import { ShieldCheck } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

interface Props {
  db: BaseDatosPorcina;
  currentUser: Usuario | null;
  onSaveRecord: (table: keyof BaseDatosPorcina, record: any) => Promise<any>;
}

export const SanidadOvinaView: React.FC<Props> = ({ db, currentUser, onSaveRecord }) => {
  const { theme } = useTheme();
  const sanidad = db.Eventos_Sanitarios_Ovinos || [];
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="space-y-6">
      <div className={`bg-white border ${theme.border} rounded-xl p-5 shadow-xs`}>
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-bold text-[#14281d]">Manejo Sanitario & Señalada</h2>
          <button 
            onClick={() => setShowModal(true)}
            className={`px-4 py-2 text-xs font-semibold ${theme.badgeText} ${theme.secondaryBg} rounded-lg border ${theme.badgeBorder}`}
          >
            Registrar Evento
          </button>
        </div>
      </div>
      <div className={`bg-white border ${theme.border} rounded-xl overflow-hidden shadow-xs`}>
        <table className="w-full text-left text-xs text-[#14281d]">
          <thead className={`bg-[#f0f4ef] text-[#526b5c] font-semibold border-b ${theme.border}`}>
            <tr>
              <th className="py-2.5 px-4">Fecha</th>
              <th className="py-2.5 px-4">Tipo Evento</th>
              <th className="py-2.5 px-4 text-right">Cabezas</th>
              <th className="py-2.5 px-4">Producto</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#edf3ee]">
            {sanidad.map((san) => (
              <tr key={san.id}>
                <td className="py-3 px-4 font-mono">{san.fecha}</td>
                <td className="py-3 px-4 font-bold">{san.tipo_evento}</td>
                <td className="py-3 px-4 text-right">{san.cabezas_tratadas}</td>
                <td className="py-3 px-4">{san.producto_aplicado}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
