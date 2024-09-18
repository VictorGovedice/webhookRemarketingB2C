"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
let dadosRecebidos = []; // Array para armazenar todos os dados recebidos
// Endpoint para receber o Webhook e armazenar os dados
app.post('/webhookMsgWhatsapp', (req, res) => {
    try {
        // Desestruturando os dados recebidos do webhook
        const { contact_name, contact_phone, contact_email, deal_stage, deal_user, deal_status } = req.body;
        // Armazenar os dados recebidos no array
        const dados = {
            nome: contact_name,
            telefone: contact_phone,
            email: contact_email,
            etapa: deal_stage,
            vendedor: deal_user,
            status: deal_status
        };
        dadosRecebidos.push(dados);
        // Exibindo no console apenas para depuração (opcional)
        console.log('Dados recebidos do Clint:', dados);
        // Resposta da API
        res.status(200).json({
            message: 'Dados recebidos com sucesso.',
            dadosRecebidos: dados
        });
    }
    catch (error) {
        console.error('Erro ao processar o webhook:', error);
        res.status(500).json({ error: 'Erro ao processar o webhook.' });
    }
});
// Endpoint para visualizar todos os dados recebidos
app.get('/webhookMsgWhatsappData', (req, res) => {
    try {
        res.status(200).json({
            message: 'Todos os dados recebidos',
            dados: dadosRecebidos
        });
    }
    catch (error) {
        console.error('Erro ao buscar os dados:', error);
        res.status(500).json({ error: 'Erro ao buscar os dados.' });
    }
});
// Iniciar o servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
