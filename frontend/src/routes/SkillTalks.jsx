import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { MessageCircle, Send, Plus } from "lucide-react";

const API_URL = "http://localhost:5000";

export default function SkillTalks() {
  const usuarioLogado = JSON.parse(localStorage.getItem("usuarioLogado"));
  const meuEmail = usuarioLogado?.email;

  const [inbox, setInbox] = useState([]);
  const [profissionais, setProfissionais] = useState([]);
  const [contatoAtivo, setContatoAtivo] = useState(null);
  const [mensagens, setMensagens] = useState([]);
  const [texto, setTexto] = useState("");
  const [modalOpen, setModalOpen] = useState(false);

  const messagesEndRef = useRef(null);

  function parseTime(m) {
    const t =
      m.dataEnvio ??
      m.horario ??
      m.data ??
      m.timestamp ??
      m.createdAt ??
      null;
    const d = new Date(t);
    return isNaN(d) ? null : d;
  }

  function getAutor(m) {
    return (
      m.remetente ??
      m.autor ??
      m.de ??
      m.from ??
      m.sender ??
      null
    );
  }

  async function carregarInbox() {
    try {
      const resp = await axios.get(
        `${API_URL}/mensagens/inbox/${encodeURIComponent(meuEmail)}`
      );

      let items = Array.isArray(resp.data)
        ? resp.data
        : Object.values(resp.data || {});

      const norm = items
        .map((it) => {
          const contato =
            it.contato ??
            it.email ??
            (it.remetente !== meuEmail ? it.remetente : it.destinatario);

          const horarioDate = parseTime(it);
          return {
            contato,
            ultimaMensagem: it.ultimaMensagem ?? it.texto ?? "",
            horario: horarioDate ? horarioDate.toISOString() : null,
          };
        })
        .filter((i) => i.contato);

      norm.sort((a, b) => {
        const ta = a.horario ? new Date(a.horario).getTime() : 0;
        const tb = b.horario ? new Date(b.horario).getTime() : 0;
        return tb - ta;
      });

      setInbox(norm);
    } catch (err) {
      console.error("Erro inbox:", err);
    }
  }

  async function carregarProfissionais() {
    try {
      const resp = await axios.get(`${API_URL}/profissionais`);
      let arr = Array.isArray(resp.data)
        ? resp.data
        : Object.values(resp.data || {});

      arr = arr.filter(
        (p) => p.email.toLowerCase() !== meuEmail.toLowerCase()
      );

      setProfissionais(arr);
    } catch (err) {
      console.error("Erro profissionais:", err);
    }
  }

  async function carregarMensagens(emailContato) {
    try {
      const resp = await axios.get(
        `${API_URL}/mensagens/${encodeURIComponent(
          meuEmail
        )}/${encodeURIComponent(emailContato)}`
      );

      let msgs = Array.isArray(resp.data)
        ? resp.data
        : Object.values(resp.data || {});

      const norm = msgs
        .map((m) => {
          const horarioDate = parseTime(m);
          return {
            id: m.id ?? m._id ?? Math.random(),
            texto: m.texto ?? "",
            autor: getAutor(m),
            horario: horarioDate ? horarioDate.toISOString() : null,
          };
        })
        .sort((a, b) => {
          const ta = a.horario ? new Date(a.horario).getTime() : 0;
          const tb = b.horario ? new Date(b.horario).getTime() : 0;
          return ta - tb;
        });

      setMensagens(norm);
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    } catch (err) {
      console.error("Erro mensagens:", err);
    }
  }

  function abrirChat(email) {
    setContatoAtivo(email);
    carregarMensagens(email);
  }

  async function enviarMensagem(e) {
    e.preventDefault();
    if (!texto.trim()) return;

    try {
      await axios.post(`${API_URL}/mensagens`, {
        remetente: meuEmail,
        destinatario: contatoAtivo,
        texto: texto.trim(),
      });

      setTexto("");
      carregarMensagens(contatoAtivo);
      carregarInbox();
    } catch (err) {
      console.error("Erro ao enviar:", err);
    }
  }

  function getNome(email) {
    const p = profissionais.find(
      (x) => x.email.toLowerCase() === email.toLowerCase()
    );
    return p?.nome ?? email;
  }

  function formatTime(h) {
    if (!h) return "";
    const d = new Date(h);
    return d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  }

  useEffect(() => {
    carregarInbox();
    carregarProfissionais();

    const interval = setInterval(() => {
      carregarInbox();
      if (contatoAtivo) carregarMensagens(contatoAtivo);
    }, 4000);

    return () => clearInterval(interval);
  }, [contatoAtivo]);

  return (
    <div className="w-full h-screen pt-10 pb-5">
      <div className="max-w-7xl mx-auto grid grid-cols-12 gap-6 px-4 h-full">

        {/* SIDEBAR */}
        <aside className="col-span-4 h-full">
          <div className="bg-slate-800 backdrop-blur-lg rounded-2xl border shadow-xl p-4 h-full flex flex-col">
            <div className="flex items-center justify-between">
              <h2 className="font-bold text-lg text-white flex items-center gap-2">
                <MessageCircle className="w-5 h-5 text-cyan-600" />
                Conversas
              </h2>
              <button
                onClick={() => setModalOpen(true)}
                className="bg-cyan-600 hover:bg-cyan-700 px-3 py-2 rounded-xl flex items-center gap-1 shadow"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>

            <div className="mt-4 pr-1 space-y-2 flex-1 overflow-y-auto">
              {inbox.map((c) => (
                <button
                  key={c.contato}
                  onClick={() => abrirChat(c.contato)}
                  className={`w-full p-3 rounded-xl flex items-center gap-3 text-left
                    hover:bg-gray-100 dark:hover:bg-gray-700 transition
                    ${contatoAtivo === c.contato ? "bg-gray-200 dark:bg-gray-700" : ""}`}
                >
                  <div className="w-12 h-12 bg-cyan-100 dark:bg-cyan-900/30 rounded-full flex items-center justify-center text-cyan-700 font-bold">
                    {getNome(c.contato).charAt(0)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-white truncate">{getNome(c.contato)}</p>
                    <p className="text-xs text-white truncate">{c.ultimaMensagem}</p>
                  </div>
                  <span className="text-xs text-gray-400">{formatTime(c.horario)}</span>
                </button>
              ))}
            </div>
          </div>
        </aside>

        {/* CHAT */}
        <main className="col-span-8 h-full flex flex-col">
          <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-lg rounded-2xl border border-gray-200 dark:border-gray-700 shadow-xl flex flex-col h-full">
            {contatoAtivo ? (
              <>
                <header className="p-4 border-b border-gray-200 dark:border-gray-700 flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-cyan-200 dark:bg-cyan-900 flex items-center justify-center text-cyan-900 font-bold">
                    {getNome(contatoAtivo).charAt(0)}
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800 dark:text-white">{getNome(contatoAtivo)}</p>
                    <p className="text-xs text-gray-400">{contatoAtivo}</p>
                  </div>
                </header>

                <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
                  {mensagens.map((m) => {
                    const isMe = String(m.autor).toLowerCase() === String(meuEmail).toLowerCase();
                    return (
                      <div key={m.id} className={`flex ${isMe ? "justify-end" : "justify-start"}`}>
                        <div className={`max-w-[70%] px-4 py-3 rounded-2xl shadow-sm ${
                          isMe
                            ? "bg-cyan-600 text-white rounded-br-none"
                            : "bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white rounded-bl-none"
                        }`}>
                          <p className="text-sm">{m.texto}</p>
                          <p className="text-[10px] opacity-70 text-right mt-1">{formatTime(m.horario)}</p>
                        </div>
                      </div>
                    );
                  })}
                  <div ref={messagesEndRef} />
                </div>

                <form onSubmit={enviarMensagem} className="p-4 border-t border-gray-200 dark:border-gray-700 flex gap-2">
                  <input
                    value={texto}
                    onChange={(e) => setTexto(e.target.value)}
                    placeholder="Digite uma mensagem..."
                    className="flex-1 p-3 rounded-xl border bg-gray-50 dark:bg-gray-700"
                  />
                  <button className="bg-cyan-600 hover:bg-cyan-700 text-white rounded-xl px-4 flex items-center gap-2">
                    <Send className="w-4 h-4" /> Enviar
                  </button>
                </form>
              </>
            ) : (
              <div className="flex-1 flex flex-col justify-center items-center text-gray-500">
                <MessageCircle className="w-16 h-16 opacity-40 mb-3" />
                <p>Selecione uma conversa para começar</p>
              </div>
            )}
          </div>
        </main>
      </div>

      {/* MODAL NOVA CONVERSA */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 w-[600px] shadow-xl border border-gray-200 dark:border-gray-700">
            <h3 className="font-bold text-xl mb-4">Nova conversa</h3>
            <div className="max-h-[50vh] overflow-y-auto space-y-2 pr-2">
              {profissionais.map((p) => (
                <button
                  key={p.email}
                  onClick={() => {
                    setModalOpen(false);
                    abrirChat(p.email);
                  }}
                  className="w-full p-3 rounded-xl flex gap-3 hover:bg-gray-100 dark:hover:bg-gray-700 transition"
                >
                  <div className="w-12 h-12 bg-cyan-100 dark:bg-cyan-900/30 rounded-full flex items-center justify-center text-cyan-700 font-bold">
                    {p.nome.charAt(0)}
                  </div>
                  <div className="text-left">
                    <p className="font-semibold text-gray-900 dark:text-white">{p.nome}</p>
                    <p className="text-xs text-gray-500">{p.cargo}</p>
                  </div>
                </button>
              ))}
            </div>
            <div className="mt-4 flex justify-end">
              <button
                onClick={() => setModalOpen(false)}
                className="px-4 py-2 rounded-xl bg-gray-300 dark:bg-gray-700 hover:bg-gray-400 dark:hover:bg-gray-600"
              >
                Fechar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
