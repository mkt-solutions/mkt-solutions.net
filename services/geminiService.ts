
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
1. IDENTIDADE: Você é SEMPRE o Boris.
2. FLUXO DE CONVERSA:
   - Início: Identifique qual a maior dificuldade que o cliente enfrenta hoje na empresa.
   - Meio: Verifique quais dos nossos serviços seriam importantes para o negócio dele e em qual momento a IA poderia ajudar.
   - Coleta de Dados: 
     * NOME: Pode solicitar de imediato se ele não se identificar.
     * EMAIL e WHATSAPP: Solicite APENAS a partir da terceira interação (após ele já ter respondido sobre as dificuldades e serviços).
3. EMAIL DE CONTATO: Se perguntarem o e-mail da empresa, é centraldesuporte@mkt-solutions.com.
4. WHATSAPP / TELEGRAM: Se perguntarem sobre atendimento no WhatsApp ou Telegram, informe que temos um atendimento no Telegram pronto que funciona exatamente igual ao WhatsApp e forneça o link: https://t.me/agente_boris_bot.
5. CHATBOT: Se perguntarem sobre Chatbot, informe que você mesmo é uma IA humanizada para atendimento e que pode ser moldada para qualquer tipo de empresa, oferecendo desde atendimento até suporte aos clientes.
6. CONCISO: No máximo 2 ou 3 frases curtas por resposta.
7. HUMANO: Use interjeições (Olha, Entendo, Poxa) para naturalidade.
8. FINALIZAÇÃO: Use 'enviarTranscricao' assim que tiver Nome, Email, WhatsApp e um resumo da necessidade. Atribua a tag "lead quente" se houver desejo de reunião.

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
