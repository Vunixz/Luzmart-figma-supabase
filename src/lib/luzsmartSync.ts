
import { supabase } from "./supabaseClient";

type EstadoLuzSmart = {
  ldrValue: number;
  pirStates: boolean[];
  poleIntensities: number[];
};

export async function enviarEstadoLuzSmart(
  estado: EstadoLuzSmart
) {
  if (estado.pirStates.length !== 6) {
    throw new Error("São necessários 6 estados PIR.");
  }

  if (estado.poleIntensities.length !== 6) {
    throw new Error("São necessárias 6 intensidades.");
  }

  const { error } = await supabase.rpc(
    "atualizar_estado_luzsmart",
    {
      p_ldr_value: estado.ldrValue,
      p_pir_states: estado.pirStates,
      p_pole_intensities: estado.poleIntensities,
    }
  );

  if (error) {
    console.error("Erro ao enviar estado:", error.message);
    throw error;
  }
}
