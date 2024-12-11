"use client";
import React from "react";
import { useState } from "react";
import Image from "next/image";
import editIcon from "./assets/icons/edit-icon.svg";
import editIconPurple from "./assets/icons/edit-purple.svg";
import { useRouter } from "next/navigation";

const mockQuestoes = [
  { id: 1, titulo: "Caderno de questões 1", respondido: true, questoes: 10 },
  { id: 2, titulo: "Caderno de questões 2", respondido: false, questoes: 10 },
  { id: 3, titulo: "Caderno de questões 3", respondido: false, questoes: 6 },
];

const mockRespostas = [
  {
    caderno: "Caderno de questões 1",
    perguntas: [
      { titulo: "Título da pergunta 1", resposta: "Resposta da pergunta 1" },
      { titulo: "Título da pergunta 2", resposta: "Resposta da pergunta 2" },
      { titulo: "Título da pergunta 3", resposta: "Resposta da pergunta 3" },
    ],
  },
  {
    caderno: "Caderno de questões 2",
    perguntas: [
      { titulo: "Título da pergunta 3", resposta: "Resposta da pergunta 3" },
      { titulo: "Título da pergunta 4", resposta: "Resposta da pergunta 4" },
      { titulo: "Título da pergunta 5", resposta: "Resposta da pergunta 5" },
    ],
  },
  {
    caderno: "Caderno de questões 3",
    perguntas: [
      { titulo: "Título da pergunta 6", resposta: "Resposta da pergunta 6" },
      { titulo: "Título da pergunta 7", resposta: "Resposta da pergunta 7" },
      { titulo: "Título da pergunta 8", resposta: "Resposta da pergunta 8" },
    ],
  },
];

export default function Home() {
  const [abaAtiva, setAbaAtiva] = useState<"questoes" | "respostas">("questoes");
  const [mostrarNaoRespondidas, setMostrarNaoRespondidas] = useState(false);
  const [cadernoSelecionado, setCadernoSelecionado] = useState(mockRespostas[0]);
  const router = useRouter();

  const cadernosFiltrados = mostrarNaoRespondidas
    ? mockQuestoes.filter((caderno) => !caderno.respondido)
    : mockQuestoes;

  return (
    <div className="p-6">
      {/* Topbar */}
      <div className="bg-white shadow-sm py-4 mb-6"></div>

      {/* Menu de abas */}
      <div className="max-w-[1200px] mx-auto">
        <div className="flex flex-col mb-6 space-y-4">
          {/* Botões de abas */}
          <div className="flex space-x-6">
            <button
              onClick={() => setAbaAtiva("questoes")}
              className={`text-lg font-semibold ${
                abaAtiva === "questoes"
                  ? "text-[#502DB3] border-b-2 border-[#502DB3]"
                  : "text-gray-400"
              }`}
            >
              Questões
            </button>
            <button
              onClick={() => setAbaAtiva("respostas")}
              className={`text-lg font-semibold ${
                abaAtiva === "respostas"
                  ? "text-[#502DB3] border-b-2 border-[#502DB3]"
                  : "text-gray-400"
              }`}
            >
              Respostas
            </button>
          </div>
        </div>
      </div>
      {/* Conteúdo da aba Questões */}
      {abaAtiva === "questoes" && (
        <div className="max-w-[1200px] mx-auto">
          {/* Filtros acima dos cards */}
          <div className="flex items-center justify-start mb-6 space-x-4">
            <label className="flex items-center space-x-2 text-sm text-gray-600">
              <input
                type="checkbox"
                checked={mostrarNaoRespondidas}
                onChange={(e) => setMostrarNaoRespondidas(e.target.checked)}
                className="h-4 w-4 text-[#502DB3] border-gray-300 rounded focus:ring-[#502DB3]"
              />
              <span>Mostrar apenas cadernos não respondidos</span>
            </label>
          </div>

          {/* Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {cadernosFiltrados.map((caderno) => (
              <div
                key={caderno.id}
                className="border rounded-[20px] p-6 shadow-sm relative"
                style={{ borderColor: caderno.respondido ? "#e5e7eb" : "#ddd" }}
              >
                <div className="text-right mb-2">
                  <Image src={editIcon} alt="Ícone" width={20} height={20} />
                </div>
                <h2 className="text-lg font-semibold mb-2">{caderno.titulo}</h2>
                <span
                  className={`text-sm font-medium px-2 py-1 rounded inline-block mb-2 ${
                    caderno.respondido
                      ? "bg-green-100 text-green-600"
                      : "bg-yellow-100 text-yellow-600"
                  }`}
                >
                  {caderno.respondido ? "Respondido" : "Não respondido"}
                </span>
                <p className="text-sm text-gray-600 mb-4">{caderno.questoes} questões</p>
                <button
                  className={`px-4 py-2 w-full rounded-[42px] text-sm font-medium ${
                    caderno.respondido
                      ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                      : "bg-[#502DB3] text-white"
                  }`}
                  disabled={caderno.respondido}
                  onClick={() => router.push(`/cadernos/${caderno.id}`)}
                >
                  Responder
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Conteúdo da aba Respostas */}
      {abaAtiva === "respostas" && (
        <div className="max-w-[1200px] mx-auto">
          {/* Menu para selecionar caderno */}
          <div className="flex justify-start space-x-6 mb-6">
            {mockRespostas.map((caderno, index) => (
              <button
                key={index}
                onClick={() => setCadernoSelecionado(caderno)}
                className={`flex items-center space-x-2 text-sm font-semibold ${
                  cadernoSelecionado.caderno === caderno.caderno
                    ? "text-[#502DB3] border-b-2 border-[#502DB3]"
                    : "text-gray-400"
                }`}
              >
                <Image
                  src={cadernoSelecionado.caderno === caderno.caderno ? editIconPurple : editIcon}
                  alt="Ícone"
                  width={16}
                  height={16}
                  className={cadernoSelecionado.caderno === caderno.caderno ? "text-[#502DB3]" : "text-gray-400"}
                />
                <span>{caderno.caderno}</span>
              </button>
            ))}
          </div>

          {/* Perguntas e Respostas */}
          <div>
            {cadernoSelecionado.perguntas.map((pergunta, index) => (
              <div key={index} className="mb-6">
                <h3 className="text-base font-bold text-[black] mb-2">{pergunta.titulo}</h3>
                <p className="text-sm text-gray-700 mb-4">
                  <span className="font-semibold text-gray-500 block">Resposta:</span>
                  {pergunta.resposta}
                </p>
                <hr className="border-gray-300" />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
