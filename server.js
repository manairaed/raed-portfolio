import express from "express";
import nodemailer from "nodemailer";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";
dotenv.config();
const app = express();
app.use(cors());
app.use(bodyParser.json());

app.post("/send-email", async (req, res) => {
  const { subject, description, email, phone } = req.body;
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.USER_EMAIL,
      pass: process.env.USER_PASS,
    },

  }
);

  const htmlTemplate = `
    <div style="font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 20px;">
      <div style="max-width: 600px; margin: auto; background: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
        <div style="background-color: #003B48; color: white; padding: 20px; text-align: center;">
          <h2 style="margin: 0;">📬 Nouveau message de contact</h2>
        </div>
        <div style="padding: 20px; color: #333;">
          <p><strong>Objet :</strong> ${subject}</p>
          <p><strong>Description :</strong><br> ${description}</p>
          <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;" />
          <p><strong>Email :</strong> ${email}</p>
          <p><strong>Téléphone :</strong> ${phone || "Non fourni"}</p>
        </div>
        <div style="background-color: #f4f4f4; text-align: center; padding: 15px; font-size: 12px; color: #777;">
          <p>Ce message a été envoyé depuis le portfolio de <strong>Raed Manai</strong>.</p>
        </div>
      </div>
    </div>
  `;

  const mailOptions = {
    from: `"Portfolio Contact" <${email}>`,
    to: "manairaed1998@gmail.com",
    subject: `Nouveau message de contact : ${subject}`,
    html: htmlTemplate,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: "Email envoyé avec succès ✅" });
  } catch (error) {
    console.error("Erreur envoi email :", error);
    res.status(500).json({ message: "Erreur lors de l'envoi ❌" });
  }
});

app.listen(3030, () => console.log("✅ Serveur prêt sur http://localhost:3030"));
