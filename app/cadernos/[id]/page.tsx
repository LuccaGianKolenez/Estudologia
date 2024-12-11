"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import editIcon from "../../assets/icons/edit-icon.svg";
import clock from "../../assets/icons/clock.svg";
import logo from "../../assets/icons/logotipo.svg";
import trophyIcon from "../../assets/icons/trofeu.svg";
import { useRouter } from "next/navigation";
import { useParams } from "next/navigation";

const perguntasMock = [
  {
    titulo: "TÍTULO DA PERGUNTA 01/03",
    descricao:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis.",
  },
  {
    titulo: "TÍTULO DA PERGUNTA 02/03",
    descricao:
      "Curabitur blandit tempus porttitor. Integer posuere erat a ante venenatis dapibus posuere velit aliquet.",
  },
  {
    titulo: "TÍTULO DA PERGUNTA 03/03",
    descricao:
      "Nulla vitae elit libero, a pharetra augue. Donec sed odio dui. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.",
  },
];

export default function QuestaoPage() {
  const [resposta, setResposta] = useState("");
  const [contador, setContador] = useState(0);
  const [timeLeft, setTimeLeft] = useState(1500);
  const [showModal, setShowModal] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const maxCaracteres = 300;
  const router = useRouter();
  const params = useParams();
  const id = params?.id;

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);

      return () => clearInterval(timer); // Limpa o intervalo ao desmontar o componente
    }
  }, [timeLeft]);

  // Função para formatar o tempo em MM:SS
  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
  };

  const handleRespostaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const texto = e.target.value;
    if (texto.length <= maxCaracteres) {
      setResposta(texto);
      setContador(texto.length);
    }
  };

  return (
    <>
      {/* Topbar */}
      <div className="flex justify-center items-center mt-8">
        <Image src={logo} alt="Logo" className="h-auto" />
      </div>
      <div className="bg-white shadow-sm py-4 mb-6"></div>
      <div className="p-6 max-w-[800px] mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center">
            <Image src={editIcon} alt="Editar" width={16} height={16} className="mr-2" />
            <h1 className="text-lg font-bold">Título do caderno de questões {id}</h1>
          </div>
          <div className="flex items-center text-gray-600">
            <div className="flex items-center border border-gray-300 rounded-lg px-2 py-1">
              <Image src={clock} alt="Relógio" width={16} height={16} className="mr-2" />
              <span className="text-sm">{formatTime(timeLeft)}</span>
            </div>
          </div>
        </div>

        {/* Pergunta */}
        <div className="mb-6">
          <h2 className="text-sm font-bold text-gray-500 mb-2">
            {perguntasMock[currentQuestionIndex].titulo}
          </h2>
          <p className="text-gray-700 text-sm leading-relaxed">
            {perguntasMock[currentQuestionIndex].descricao}
          </p>
        </div>

        {/* Campo de resposta */}
        <div className="mb-6 relative">
          <textarea
            value={resposta}
            onChange={handleRespostaChange}
            placeholder="Escreva sua resposta aqui"
            className="w-full border rounded-lg p-4 text-gray-800 focus:ring-1 focus:ring-[#502DB3] focus:border-[#502DB3] outline-none text-sm bg-gray-100"
            rows={6}
          />
          <span className="absolute top-2 right-4 text-sm text-gray-500">
            {contador}/{maxCaracteres}
          </span>
        </div>

        <div className="mt-4">
          {/* Botão de Enviar Resposta */}
          <div className="flex justify-start">
            <button
              onClick={currentQuestionIndex === perguntasMock.length - 1 ? () => setShowModal(true) : () => alert('Resposta salva')}
              className="px-6 py-2 bg-[#502DB3] text-white rounded-lg text-sm focus:outline-none"
            >
              {currentQuestionIndex === perguntasMock.length - 1 ? "Enviar resposta e finalizar" : "Enviar resposta"}
            </button>
          </div>

          {/* Linha horizontal */}
          <div className="border-t border-gray-300 my-4"></div>

          {/* Navegação de perguntas */}
          <div className="flex justify-between items-center">
            {/* Botão "Anterior" */}
            {currentQuestionIndex > 0 ? (
              <button
                onClick={() => setCurrentQuestionIndex(currentQuestionIndex - 1)}
                className="text-gray-500 text-sm flex items-center hover:text-gray-700"
              >
                ← Anterior
              </button>
            ) : (
              <div></div> // Espaço vazio para manter alinhamento
            )}

            {/* Botão "Próxima" */}
            {currentQuestionIndex < perguntasMock.length - 1 ? (
              <button
                onClick={() => setCurrentQuestionIndex(currentQuestionIndex + 1)}
                className="text-gray-500 text-sm flex items-center hover:text-gray-700"
              >
                Próxima →
              </button>
            ) : (
              <div></div> // Espaço vazio para manter alinhamento
            )}
          </div>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-gray-700 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-[50px] p-8 text-center max-w-[500px] w-full">
            {/* Círculo amarelo com o troféu */}
            <div className="relative mx-auto mb-6 w-32 h-32 flex items-center justify-center bg-[#FFE5324F] rounded-full">
              <Image src={trophyIcon} alt="Troféu" width={80} height={80} />
            </div>

            {/* Conteúdo da modal */}
            <h2 className="text-2xl font-bold text-[#502DB3] mb-2">Agradecemos sua participação!</h2>
            <p className="text-gray-600 mb-4">Respostas enviadas com sucesso</p>
            <div className="flex justify-center items-center text-sm text-gray-500 mb-6">
              <Image src={clock} alt="Relógio" width={16} height={16} className="mr-2" />
              <span>40 min de prova</span>
            </div>
            <button
              onClick={() => router.push(`/`)}
              className="px-6 py-2 border border-[#502DB3] text-[#502DB3] rounded-lg text-sm hover:bg-gray-100"
            >
              Valeu!
            </button>
          </div>
        </div>
      )}
    </>
  );
}
