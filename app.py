from flask import Flask, request, jsonify
import cv2
import numpy as np
from supabase import create_client, Client
from datetime import datetime, timedelta, timezone

# ================= SUPABASE CONFIG =================
url = "https://npouyrppjqbxifuvpqan.supabase.co"
key = "sb_secret_i1bGnoLOPvDPJuHfiV4znw_ynOW3raJ"  # 🔴 Remplace par ta clé ANON
supabase: Client = create_client(url, key)


# ================= FLASK =================
app = Flask(__name__)

# ================= SAVE LOG =================
def save_log(code, nom, prenom, status):
    try:
        supabase.table("logs").insert({
            "code": code,
            "nom": nom,
            "prenom": prenom,
            "status": status,
            "created_at": datetime.now(timezone.utc).isoformat()
        }).execute()
    except Exception as e:
        print("❌ Erreur log :", e)

# ================= DELETE EXPIRED QR =================
def delete_expired_qr():
    try:
        now_utc = datetime.now(timezone.utc)
        all_qr = supabase.table("qr_code").select("*").execute()
        for qr in all_qr.data:
            expires_at_str = qr.get("expires_at")
            if expires_at_str:
                expires_dt = datetime.fromisoformat(expires_at_str)
                if expires_dt < now_utc:
                    supabase.table("qr_code").delete().eq("id", qr["id"]).execute()
                    print(f"🗑️ QR expiré supprimé : {qr['code']}")
    except Exception as e:
        print("❌ Erreur suppression QR expiré :", e)

# ================= ROUTE UPLOAD =================
@app.route('/upload', methods=['POST'])
def upload():
    try:
        delete_expired_qr()  # Nettoyage automatique avant chaque vérification

        # 🔥 Convert image
        nparr = np.frombuffer(request.data, np.uint8)
        frame = cv2.imdecode(nparr, cv2.IMREAD_COLOR)
        if frame is None:
            print("❌ Image invalide")
            save_log("unknown", "unknown", "unknown", "error")
            return jsonify({"status": "error"})

        # 🔍 QR detection
        detector = cv2.QRCodeDetector()
        data, bbox, _ = detector.detectAndDecode(frame)
        if not data:
            print("⚠️ Aucun QR détecté")
            save_log("unknown", "unknown", "unknown", "no_qr")
            return jsonify({"status": "no_qr"})

        # 🔥 Clean
        data = data.strip().replace("\n", "").replace("\r", "")
        print("QR détecté :", repr(data))

        parts = data.split("|")
        if len(parts) != 3:
            print("❌ Format QR invalide")
            save_log("unknown", "unknown", "unknown", "invalid_format")
            return jsonify({"status": "invalid"})

        code, nom, prenom = [p.strip() for p in parts]
        print("➡️ Code:", code)
        print("➡️ Nom:", nom)
        print("➡️ Prenom:", prenom)

        # ================= SUPABASE =================
        result = supabase.table("qr_code").select("*").eq("code", code).execute()
        print("📦 Résultat DB :", result.data)

        if not result.data:
            print("❌ QR invalide")
            save_log(code, nom, prenom, "invalid")
            return jsonify({"status": "invalid"})

        user = result.data[0]

        # 🔍 Vérification identité
        if user.get("nom", "").strip().lower() != nom.lower() or user.get("prenom", "").strip().lower() != prenom.lower():
            print("⚠️ Nom/prénom différent")

        # 🔹 Vérification expiration
        expires_str = user.get("expires_at")
        if expires_str:
            expires_dt = datetime.fromisoformat(expires_str)
            if expires_dt < datetime.now(timezone.utc):
                print("⛔ QR expiré")
                save_log(code, nom, prenom, "expired")
                return jsonify({"status": "expired"})

        # 🔐 Vérification autorisation
        if user.get("autorise", False):
            print("✅ ACCÈS AUTORISÉ")
            save_log(code, nom, prenom, "valid")
            return jsonify({"status": "valid"})
        else:
            print("⛔ ACCÈS REFUSÉ")
            save_log(code, nom, prenom, "denied")
            return jsonify({"status": "denied"})

    except Exception as e:
        print("❌ Erreur :", str(e))
        save_log("unknown", "unknown", "unknown", "error")
        return jsonify({"status": "error"})

# ================= GENERATE QR =================
@app.route('/generate/<int:user_id>', methods=['POST'])
def generate_qr(user_id):
    try:
        now_utc = datetime.now(timezone.utc)

        # 🔹 Supprimer tous les QR existants de l'employé avant d'en générer un nouveau
        supabase.table("qr_code").delete().eq("user_id", user_id).execute()

        # 🔹 Créer nouveau QR code
        new_code = str(user_id) + str(int(now_utc.timestamp()))  # code unique
        expires_at = now_utc + timedelta(days=7)
        supabase.table("qr_code").insert({
            "user_id": user_id,
            "code": new_code,
            "nom": f"user{user_id}",  # Remplacer par vrai nom
            "prenom": f"user{user_id}",  # Remplacer par vrai prénom
            "autorise": True,
            "created_at": now_utc.isoformat(),
            "expires_at": expires_at.isoformat()
        }).execute()
        print("✅ Nouveau QR généré :", new_code)
        return jsonify({"status": "created", "qr": new_code})

    except Exception as e:
        print("❌ Erreur génération QR :", e)
        return jsonify({"status": "error"})

# ================= RUN =================
if __name__ == "__main__":
    app.run(host='0.0.0.0', port=5000, debug=True)