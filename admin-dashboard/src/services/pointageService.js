import { supabase } from "../supabase"

export async function createPointage(employeId) {

  const qr_valide = true
  const face_valide = true

  const status = (qr_valide && face_valide)
    ? "present"
    : "absent"

  const { data, error } = await supabase
    .from("pointages")
    .insert([
      {
        employe_id: employeId,
        qr_valide,
        face_valide,
        status,
        date: new Date().toISOString().split("T")[0]
      }
    ])

  if (error) console.log(error)

  return data
}