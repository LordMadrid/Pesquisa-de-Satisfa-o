// Importa os módulos Firebase direto via CDN (sem npm)
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.14.0/firebase-app.js";
import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/10.14.0/firebase-firestore.js";

// ✅ Configuração atualizada do seu app Firebase
const firebaseConfig = {
  apiKey: "AIzaSyCCa5I58IgamYUsbQOQXrHx2gGxAnqHCM",
  authDomain: "pesquisa-de-satisfacao-baja.firebaseapp.com",
  projectId: "pesquisa-de-satisfacao-baja",
  storageBucket: "pesquisa-de-satisfacao-baja.firebasestorage.app",
  messagingSenderId: "11392515833",
  appId: "1:11392515833:web:d0a40b67b065dbccb7ac28"
};

// Inicializa o Firebase e o Firestore
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Função para salvar a resposta do formulário
async function salvarResposta() {
  const nome = document.getElementById("nome").value.trim();
  const nota = document.getElementById("nota").value;
  const comentario = document.getElementById("comentario").value.trim();

  const msgOk = document.getElementById("msgOk");
  const msgErro = document.getElementById("msgErro");

  msgOk.style.display = "none";
  msgErro.style.display = "none";

  try {
    await addDoc(collection(db, "respostasPesquisa"), {
      nome: nome || "(anônimo)",
      nota: Number(nota),
      comentario: comentario,
      criadoEm: new Date()
    });

    msgOk.style.display = "block";
    document.getElementById("nome").value = "";
    document.getElementById("nota").value = "5";
    document.getElementById("comentario").value = "";
  } catch (e) {
    console.error(e);
    msgErro.style.display = "block";
  }
}

// Botão para enviar
document.getElementById("salvarBtn").addEventListener("click", salvarResposta);
