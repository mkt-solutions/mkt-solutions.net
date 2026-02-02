
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import { GoogleGenAI, Type, FunctionDeclaration } from "@google/genai";
import { PRODUCTS } from '../constants.ts';

const enviarTranscricaoDeclaration: FunctionDeclaration = {
  name: 'enviarTranscricao',
  parameters: {
    type: Type.OBJECT,
    description: 'Envia os dados de contato do cliente e a transcrição da conversa para o setor de atendimento.',
    properties: {
      nome: { type: Type.STRING, description: 'Nome completo do cliente' },
      email: { type: Type.STRING, description: 'E-mail do cliente' },
      whatsapp: { type: Type.STRING, description: 'WhatsApp/Telefone do cliente' },
      resumo: { type: Type.STRING, description: 'Breve resumo da necessidade do cliente' },
      tag: { type: Type.STRING, description: 'Tag do lead (ex: "lead quente" se houver desejo explícito de reunião)' }
    },
    required: ['nome', 'email', 'whatsapp', 'resumo'],
  },
};

const getSystemInstruction = () => {
  const serviceContext = PRODUCTS.map(p => 
    `- ${p.name}: ${p.description}`
  ).join('\n');

  return `Você é o Boris, estrategista sênior da MKT-Solutions. Seu tom é de um parceiro de negócios experiente (Growth Partner), 35 anos de mercado.

REGRAS DE OURO (MUITO IMPORTANTE):
1. IDENTIDADE: Você é SEMPRE o Boris. Nunca esqueça seu nome.
2. EMAIL DE CONTATO: Se o cliente perguntar se pode enviar um e-mail ou qual o e-mail para contato direto, responda que ele pode enviar para centraldesuporte@mkt-solutions.com.
3. SEJA EXTREMAMENTE CONCISO: Use no máximo 2 ou 3 frases curtas por resposta.
4. CONTEÚDO DE VALOR: Entregue um insight técnico rápido antes de sugerir um plano.
5. HUMANO E EMPÁTICO: Use interjeições (Olha, Entendo, Poxa) para naturalidade.
6. CAPTURA DE DADOS E TAGGING: Peça Nome, E-mail e WhatsApp. 
   - Se o usuário demonstrar desejo EXPLÍCITO de marcar uma reunião após o insight, atribua a tag "lead quente" na função de envio.
7. FINALIZAÇÃO: Use 'enviarTranscricao' assim que tiver os dados.

Contexto dos nossos serviços:
${serviceContext}`;
};

export const sendMessageToGemini = async (
  history: {role: string, text: string}[], 
  newMessage: string
): Promise<{ text: string, functionCall?: any }> => {
  try {
    const apiKey = process.env.API_KEY;
    if (!apiKey) return { text: "Tive um erro de conexão. Pode tentar novamente?" };

    const ai = new GoogleGenAI({ apiKey });
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: [
        ...history.map(h => ({ role: h.role === 'model' ? 'model' : 'user', parts: [{ text: h.text }] })),
        { role: 'user', parts: [{ text: newMessage }] }
      ],
      config: {
        systemInstruction: getSystemInstruction(),
        tools: [{ functionDeclarations: [enviarTranscricaoDeclaration] }],
      },
    });

    const candidate = response.candidates?.[0];
    const parts = candidate?.content?.parts || [];
    
    let text = "";
    let functionCall = null;

    for (const part of parts) {
      if (part.text) text += part.text;
      if (part.functionCall) functionCall = part.functionCall;
    }

    return { text, functionCall };

  } catch (error) {
    console.error("Gemini API Error:", error);
    return { text: "Minha conexão oscilou. O que você dizia?" };
  }
};
