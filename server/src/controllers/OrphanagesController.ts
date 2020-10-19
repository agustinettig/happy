import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import * as Yup from 'yup';

import Orphanage from '../models/Orphanage';
import orphanagesView from '../views/orphanagesView';

export default {
    async index(request: Request, response: Response) {
        const repository = getRepository(Orphanage);
        const orphanages = await repository.find({
            relations: ['images']
        });

        return response.status(200).json(orphanagesView.renderMany(orphanages));
    },

    async show(request: Request, response: Response) {
        const { id } = request.params;
        const repository = getRepository(Orphanage);
        const orphanage = await repository.findOneOrFail(id, {
            relations: ['images']
        });

        return response.status(200).json(orphanagesView.render(orphanage));
    },

    async create(request: Request, response: Response) {
        const { name,
            latitude,
            longitude,
            about,
            instructions,
            openingHours,
            openOnWeekends } = request.body;

        const requestImages = request.files as Express.Multer.File[];
        const images = requestImages.map(img => {
            return { name: img.filename }
        })

        const data = {
            name,
            latitude,
            longitude,
            about,
            instructions,
            openingHours,
            openOnWeekends: openOnWeekends === 'true',
            images
        };

        const schema = Yup.object().shape({
            name: Yup.string().required(),
            latitude: Yup.number().required(),
            longitude: Yup.number().required(),
            about: Yup.string().required().max(300),
            instructions: Yup.string().required(),
            openingHours: Yup.string().required(),
            openOnWeekends: Yup.boolean().required(),
            images: Yup.array(Yup.object().shape({
                name: Yup.string().required()
            })).required()
        });

        await schema.validate(data, {
            abortEarly: false
        });

        const repository = getRepository(Orphanage);
        const orphanage = repository.create(data);

        await repository.save(orphanage);

        return response.status(201).json(orphanagesView.render(orphanage));
    }
}