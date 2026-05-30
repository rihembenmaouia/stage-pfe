import React, { useState } from "react"
import { supabase } from "../supabase"

export default function FaceScanner() {

  const [faceOk, setFaceOk] = useState(false)

  function detectFace() {
    setFaceOk(true)
    alert("Face reconnu ✅")
  }

  async function handleValidation() {

    const qrOk = true

    const employeNom = "Ben Maouia"
    const employePrenom = "Rihem"
    const employeeId = "EMP001"

    const imageUrl = "https://image.com/photo.jpg"
    const encoding = "face_encoding_data"

    const today = new Date().toISOString().split("T")[0]

    const currentHeure = new Date()
      .toLocaleTimeString("fr-FR", {
        hour: "2-digit",
        minute: "2-digit"
      })

    if (!qrOk || !faceOk) {
      alert("Face ou QR incorrect ❌")
      return
    }

    try {

      // chercher log aujourd'hui
      const { data: existingLogs, error: fetchError } =
        await supabase
          .from("logs")
          .select("*")
          .eq("employee_id", employeeId)
          .gte("created_at", `${today}T00:00:00`)
          .lte("created_at", `${today}T23:59:59`)
          .order("id", { ascending: false })

      if (fetchError) throw fetchError

      // premier pointage
      if (!existingLogs || existingLogs.length === 0) {

        const { error } = await supabase
          .from("logs")
          .insert([{
            status: "valide",
            nom: employeNom,
            prenom: employePrenom,
            employee_id: employeeId,
            face_encoding: encoding,
            image_url: imageUrl,
            entree1: currentHeure
          }])

        if (error) throw error

        alert(`Entrée matin enregistrée (${currentHeure}) 🌅`)
      }

      else {

        const log = existingLogs[0]

        // sortie midi
        if (!log.sortie1) {

          const { error } = await supabase
            .from("logs")
            .update({
              sortie1: currentHeure
            })
            .eq("id", log.id)

          if (error) throw error

          alert(`Sortie midi enregistrée (${currentHeure}) 🍔`)
        }

        // reprise
        else if (!log.entree2) {

          const { error } = await supabase
            .from("logs")
            .update({
              entree2: currentHeure
            })
            .eq("id", log.id)

          if (error) throw error

          alert(`Entrée après-midi enregistrée (${currentHeure}) 💻`)
        }

        // fin journée
        else if (!log.sortie2) {

          const { error } = await supabase
            .from("logs")
            .update({
              sortie2: currentHeure
            })
            .eq("id", log.id)

          if (error) throw error

          alert(`Fin journée enregistrée (${currentHeure}) 🚗`)
        }

        else {
          alert("4 pointages déjà effectués 🛑")
        }
      }

      setFaceOk(false)

    }

    catch (error) {

      console.error(error)

      alert("Erreur lors du pointage ❌")
    }
  }

  return (

    <div style={{ padding: 20 }}>

      <h2>Face Scanner</h2>

      <button onClick={detectFace}>
        Scanner visage 👤
      </button>

      <br /><br />

      <p>
        Status face:
        {faceOk ? " OK ✅" : " NON ❌"}
      </p>

      <button onClick={handleValidation}>
        Valider pointage
      </button>

    </div>
  )
}