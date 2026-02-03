
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React from 'react';
import { Product, JournalArticle } from './types';

export const STRATEGIC_KEYWORDS = [
  "Marketing Digital",
  "Gestão de Tráfego",
  "Google Ads",
  "Landing Pages",
  "SEO Pro",
  "IA para Negócios",
  "Growth Hacking",
  "Conversão de Leads",
  "Performance Web",
  "Estratégia Digital",
  "ROI Driven",
  "Meta Ads"
];

export const PRODUCTS: Product[] = [
  {
    id: 's1',
    name: 'Landing Pages Pro',
    tagline: 'Design de Alta Conversão.',
    description: 'Landing pages otimizadas com hospedagem inclusa em nossos servidores de alta performance.',
    longDescription: 'Sua presença online precisa ser rápida e persuasiva. Desenvolvemos landing pages focadas em conversão, com layout mobile-first e tempos de carregamento ultra-rápidos. O plano inclui hospedagem premium em nosso servidor dedicado, garantindo 99.9% de uptime e segurança total para sua captação de leads.',
    price: 1200,
    category: 'Web',
    imageUrl: 'https://mkt-solutions.net/imgia/LP.jpg',
    features: ['Hospedagem Inclusa', 'Mobile Optimized', 'Copywriting Estratégico', 'SSL Grátis']
  },
  {
    id: 's2',
    name: 'Google Ads Performance',
    tagline: 'Apareça para quem busca.',
    description: 'Campanhas estratégicas de busca e display para colocar sua marca no topo do Google.',
    longDescription: 'Alcance clientes no momento exato em que eles procuram por seus serviços. Nossa gestão de Google Ads foca na redução do CPA (Custo por Aquisição) e no aumento da qualidade dos leads. Analisamos palavras-chave de intenção de compra para garantir que seu budget seja investido onde há retorno real.',
    price: 1500,
    category: 'Ads',
    imageUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=1000',
    features: ['Pesquisa & Display', 'Remarketing Inteligente', 'Otimização de Conversão', 'Relatórios Semanais']
  },
  {
    id: 's3',
    name: 'Social Ads 360',
    tagline: 'Engajamento que Vende.',
    description: 'Campanhas completas em Instagram, Facebook e TikTok para escalar seu faturamento.',
    longDescription: 'Domine o feed e os reels com anúncios que não parecem anúncios. Criamos estratégias segmentadas para Instagram, Facebook e TikTok, focando em diferentes etapas do funil de vendas. Desde o reconhecimento de marca até a conversão direta, utilizamos criativos dinâmicos para atrair o público certo.',
    price: 1800,
    category: 'Social',
    imageUrl: 'https://mkt-solutions.net/imgia/socialads2.jpg',
    features: ['Meta Ads (Insta/Face)', 'TikTok Ads', 'Criação de Criativos', 'Segmentação Avançada']
  },
  {
    id: 's7',
    name: 'Whatsapp Agente de IA',
    tagline: 'Seu Comercial no Automático.',
    description: 'Atendimento WhatsApp com inteligência artificial. Resolve tudo o que o cliente precisa por você 24/7.',
    longDescription: 'Não perca mais nenhuma venda por demora no atendimento. Nosso Agente de IA para WhatsApp é treinado com o conhecimento do seu negócio para responder dúvidas, enviar orçamentos e até fechar agendamentos de forma humana e natural, em qualquer horário do dia ou da noite.',
    price: 3200,
    category: 'IA',
    imageUrl: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=1000',
    features: ['Atendimento Humanoide', 'Disponibilidade 24/7', 'Fechamento de Vendas', 'Integração Direta']
  },
  {
    id: 's8',
    name: 'Email como Agente de IA',
    tagline: 'Inbox Inteligente.',
    description: 'Todas as informações solicitadas no email, respondidas instantaneamente pela inteligência artificial.',
    longDescription: 'Zere sua caixa de entrada com inteligência. Este agente monitora seus e-mails recebidos e redige respostas precisas para solicitações de suporte, dúvidas técnicas ou pedidos de orçamento, mantendo o tom de voz da sua marca e garantindo agilidade total na comunicação.',
    price: 2800,
    category: 'IA',
    imageUrl: 'https://images.unsplash.com/photo-1557200134-90327ee9fafa?auto=format&fit=crop&q=80&w=1000',
    features: ['Resposta Automática IA', 'Análise de Contexto', 'Triagem de Leads', 'Personalização de Tom']
  },
  {
    id: 's4',
    name: 'Implantação de Chatbot IA',
    tagline: 'Atendimento 24/7.',
    description: 'Automação inteligente com IA para qualificação de leads e atendimento automático no site.',
    longDescription: 'Transforme seu atendimento em uma máquina de vendas incansável. Implementamos chatbots equipados com inteligência artificial que entendem o contexto e as dúvidas dos seus clientes. Integrado ao seu site, a IA qualifica os leads antes mesmo de chegarem ao seu time comercial.',
    price: 2500,
    category: 'IA',
    imageUrl: 'https://mkt-solutions.net/imgia/chatbot.jpg',
    features: ['Inteligência Artificial', 'Integração Web', 'Qualificação Automática', 'Suporte Multilingue']
  },
  {
    id: 's6',
    name: 'Implantação de CRM',
    tagline: 'Domine seu Processo Comercial.',
    description: 'Estruturação completa de funis de venda e automação de follow-up em CRM.',
    longDescription: 'Um CRM mal configurado é apenas uma planilha cara. Nós implementamos a ferramenta ideal (Pipedrive, Bitrix24 ou RD Station) para o seu modelo de negócio. Configuramos automações de follow-up, pipelines de venda claros e dashboards de performance para que seu time foque no que realmente importa: fechar negócios sem perder nenhum lead por falta de contato.',
    price: 4500,
    category: 'CRM',
    imageUrl: 'https://mkt-solutions.net/imgia/crm.jpg',
    features: ['Pipedrive / Bitrix24', 'Automação de Follow-up', 'Treinamento de Equipe', 'Dashboards de Performance']
  },
  {
    id: 's5',
    name: 'Diagnóstico de Marketing',
    tagline: 'Visão 360º de Especialista.',
    description: 'Analisamos tudo o que você tem, desde o produto até a vida online da empresa e indicamos as mudanças que devem ser feitas.',
    longDescription: 'Nosso Diagnóstico de Marketing é uma auditoria profunda do seu ecossistema digital. Analisamos seu posicionamento de produto, funis de venda, tráfego pago, SEO e métricas de conversão. Ideal para quem busca uma segunda opinião estratégica ou deseja otimizar processos internos e de agências parceiras.',
    price: 3500,
    category: 'Strategy',
    imageUrl: 'https://mkt-solutions.net/imgia/marketing.jpg',
    features: ['Auditoria de Processos', 'Roadmap de Crescimento', 'Análise de Agência Atual', 'Otimização de Budget']
  }
];

export const JOURNAL_ARTICLES: JournalArticle[] = [
    {
        id: 1,
        title: "A Psicologia do Clique",
        date: "24 de Julho, 2025",
        excerpt: "Como as cores e o layout influenciam a decisão de compra em milissegundos.",
        image: "https://images.unsplash.com/photo-1558655146-d09347e92766?auto=format&fit=crop&q=80&w=1000",
        content: React.createElement(React.Fragment, null,
            React.createElement("p", { className: "mb-6 first-letter:text-5xl first-letter:font-bold first-letter:mr-3 first-letter:float-left text-[#FF6600]" },
                "No mundo digital, a primeira impressão não é apenas visual; ela é biológica. O cérebro processa cores e formas muito antes de ler o seu título mais persuasivo."
            ),
            React.createElement("p", { className: "mb-8 text-[#555555]" },
                "Neste estudo, mostramos como a combination certa de contrastes pode aumentar sua taxa de conversão em até 40% sem alterar uma única linha de texto da sua oferta principal. O segredo está em entender o 'caminho visual' que o usuário percorre assim que a página carrega."
            )
        )
    },
    {
        id: 2,
        title: "SEO: A Maratona da Visibilidade",
        date: "05 de Agosto, 2025",
        excerpt: "Por que estar na primeira página do Google é o ativo mais valioso do seu negócio.",
        image: "https://images.unsplash.com/photo-1562577309-4932fdd64cd1?auto=format&fit=crop&q=80&w=1000",
        content: React.createElement(React.Fragment, null,
            React.createElement("p", { className: "mb-6 first-letter:text-5xl first-letter:font-bold first-letter:mr-3 first-letter:float-left text-[#FF6600]" },
                "Diferente dos anúncios pagos, o SEO é um investimento que se acumula. É a diferença entre alugar um terreno ou construir sua própria sede digital."
            ),
            React.createElement("p", { className: "mb-8 text-[#555555]" },
                "Estar no topo das buscas orgânicas gera uma autoridade que o dinheiro não compra diretamente. Discutimos aqui como a arquitetura do site, a qualidade do conteúdo e a velocidade de carregamento são os pilares para vencer a concorrência a longo prazo."
            )
        )
    },
    {
        id: 6,
        title: "O Mito da Postagem Diária",
        date: "28 de Agosto, 2025",
        excerpt: "Por que qualidade e estratégia de distribuição importam muito mais do que a frequência no seu feed.",
        image: "https://mkt-solutions.net/imgia/calendario2.jpg",
        content: React.createElement(React.Fragment, null,
            React.createElement("p", { className: "mb-6 first-letter:text-5xl first-letter:font-bold first-letter:mr-3 first-letter:float-left text-[#FF6600]" },
                "Cansou de ser escravo do algoritmo? Postar todos os dias sem um objetivo de negócio claro é o caminho mais rápido para o burnout e para o baixo engajamento."
            ),
            React.createElement("p", { className: "mb-8 text-[#555555]" },
                "A realidade atual exige conteúdo 'herói'. Postagens densas, úteis e que são distribuídas através de tráfego pago performam infinitamente melhor do que 30 posts superficiais no mês. Menos volume, mais intenção. Discutimos como criar um cronograma que trabalha para você, e não o contrário."
            )
        )
    }
];

export const BRAND_NAME = 'MKT-Solutions';
export const SLOGAN = 'web digital plans';
export const PRIMARY_COLOR = '#FF6600'; 
export const SECONDARY_COLOR = '#808080';
