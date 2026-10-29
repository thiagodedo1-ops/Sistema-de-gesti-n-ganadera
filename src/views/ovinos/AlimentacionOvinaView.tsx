import React, { useState } from 'react';
import { BaseDatosPorcina, Usuario } from '../../types/schema';
import { Utensils, Plus, CheckCircle2 } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

interface Props {
  db: BaseDatosPorcina;
  currentUser: Usuario | null;
  onSaveRecord: (table: keyof BaseDatosPorcina, record: any) => Promise<any>;
}

export const AlimentacionOvinaView: React.FC<Props> = ({ db, currentUser, onSaveRecord }) => {
  const { theme } = useTheme();
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  const consumos = db.Consumo_Alimento_Real || [];

  return (
    <div className="space-y-6">
      <div className={`bg-white border ${theme.border} rounded-xl p-5 shadow-xs`}>
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-xl font-bold text-[#14281d]">Alimentación, Pasturas & Suplementación Ovina</h2>
            <p className="text-xs text-[#526b5c] mt-1">Control de flushing pre-servicio, pasturas consociadas y suplementación invernal.</p>
          </div>
          <span className={`px-3 py-1 text-xs font-semibold ${theme.badgeBg} ${theme.badgeText} rounded-lg border ${theme.badgeBorder}`}>
            Flushing Activo
          </span>
        </div>
      </div>

      <div className={`bg-white border ${theme.border} rounded-xl overflow-hidden shadow-xs`}>
        <div className={`p-4 border-b ${theme.border} ${theme.secondaryBg} flex justify-between items-center`}>
          <span className="text-xs font-bold text-[#14281d] uppercase tracking-wider">Plan Alimentario y Raciones Majada</span>
          <span className="text-xs text-[#526b5c]">Maíz propio UNRC & Pellet de Soja</span>
        </div>
        <div className="p-6 text-center text-xs text-[#526b5c]">
          <p className="font-semibold text-[#14281d] mb-1">Dieta Balanceada Ovina (Sistema Intensivo / Pastoreo)</p>
          <p>Consumo diario estimado: 0.8 kg materia seca / cabeza / día + Pastura alfalfa / cebadilla.</p>
        </div>
      </div>
    </div>
  );
};
