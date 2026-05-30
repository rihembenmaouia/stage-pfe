import React from "react"
import { createPointage } from "../services/pointageService"

export default function QRScanner() {

  async function handleValidation() {

    const qrOk = true
    const faceOk = true
    const employeId = 1

    if (qrOk && faceOk) {

      await createPointage(employeId)

      alert("Présent ✅")
    } else {
      alert("Absent ❌")
    }
  }

  return (
    <div>
      <h1>QR Scanner</h1>

      <button onClick={handleValidation}>
        Valider pointage
      </button>
    </div>
  )
}
