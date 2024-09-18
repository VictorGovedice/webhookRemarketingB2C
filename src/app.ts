import express, { Request, Response } from 'express';

const app = express();
app.use(express.json());

interface DadosRecebidos {
    nome: string;
    telefone: string;
    email: string;
    etapa: string;
    vendedor: string;
    status: string;
}

let dadosRecebidos: DadosRecebidos[] = [];

// Endpoint recebe webhook
app.post('/node-app/webhookMsgWhatsapp', (req: Request, res: Response) => {
    try {

        const { contact_name, contact_phone, contact_email, deal_stage, deal_user, deal_status } = req.body;

        const dados: DadosRecebidos = {
            nome: contact_name,
            telefone: contact_phone,
            email: contact_email,
            etapa: deal_stage,
            vendedor: deal_user,
            status: deal_status
        };
        dadosRecebidos.push(dados);

        // Exibindo no cnls
        console.log('Dados recebidos do Clint:', dados);

        // res API
        res.status(200).json({
            message: 'Dados recebidos com sucesso.',
            dadosRecebidos: dados
        });
    } catch (error) {
        console.error('Erro ao processar o webhook:', error);
        res.status(500).json({ error: 'Erro ao processar o webhook.' });
    }
});

// Enpoint ver dados
app.get('/node-app/webhookMsgWhatsappData', (req: Request, res: Response) => {
    try {
        res.status(200).json({
            message: 'Todos os dados recebidos',
            dados: dadosRecebidos
        });
    } catch (error) {
        console.error('Erro ao buscar os dados:', error);
        res.status(500).json({ error: 'Erro ao buscar os dados.' });
    }
});

// Iniciar o servidor
const PORT = process.env.PORT || 3012;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
