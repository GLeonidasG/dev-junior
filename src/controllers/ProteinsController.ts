import Knex from '../db-connection';
import { Request, Response } from 'express';

class ProteinsController {

    public async index(req: Request, res: Response) {
        const { page, limit, offset } = req.query;
        const table = "rnacen.protein_info";

        if ( Number(page) < 0 ) return res.status(400).send("Bad request => Erro, o número da página não pode ser negativo.");
        if ( Number(limit) < 0 ) return res.status(400).send("Bad request => Erro, o limite de registros não pode ser negativo.");
        if ( Number(offset) < 0 ) return res.status(400).send("Bad request => Erro, o offset não pode ser negativo.");

        const queryPage = (page === undefined || Number(page) < 1) ? 1 : Number(page);
        const queryLimit = (limit === undefined || Number(limit) < 1) ? 15 : Number(limit);
        const queryOffset = (offset === undefined || Number(offset) < 1) ? ((queryPage - 1) * queryLimit) : (Number(offset) + queryLimit * (queryPage - 1));

        try {
            const count = await Knex(table).count({ count: '*' });

            if (Math.ceil(count[0].count / queryLimit) < queryPage)
                return res.status(400).send("Bad Request => Erro, a página informada não existe");
            if (count[0].count < queryOffset)
                return res.status(400).send("Bad Request => Erro, offset informado é maior que o número de registros");

            const next = (queryPage < Math.ceil(count[0].count / queryLimit)) && queryPage + 1;
            const previous = (queryPage > 1) && queryPage - 1;
            const current = `página ${queryPage} de ${Math.ceil((count[0].count / queryLimit) + queryOffset)}`;

            const proteins = await Knex(table).select('*')
                .limit(queryLimit)
                .offset(queryOffset);
            const results = {};

            Object.assign(results, { proteins });

            if (next) Object.assign(results, { next });
            if (previous) Object.assign(results, { previous });

            Object.assign(results, { current });

            return res.json(results).status(200).send("OK");
        } catch (error) {
            console.log(error);
            return res.status(500).send(`Internal Server Error => ${error}`);
        }
    }
    
    public async show(req: Request, res: Response) {
        const { id } = req.params;
        const table = "rnacen.protein_info";

        try {
            const protein = await Knex(table)
                .select('*')
                .where('protein_accession', id);

            if (protein.length === 0) return res.status(404).send(`Not found: Proteina com o ID informado não foi encontrado`);
            else return res.json(protein).status(200).send("OK");
            
        } catch (error) {
            console.log(error);
            return res.status(500).send(`Internal Serve Error: ${error}`);
        }

    }

}

export default new ProteinsController();