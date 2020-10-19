import { Entity, PrimaryGeneratedColumn, Column, OneToMany, JoinColumn } from 'typeorm';

import Image from './Image';

@Entity('orphanages')
export default class Orphanage {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    latitude: number;

    @Column()
    longitude: number;

    @Column()
    about: string;

    @Column()
    instructions: string;

    @Column()
    openingHours: string;

    @Column()
    openOnWeekends: boolean;

    @OneToMany(() => Image, image => image.orphanage, {
        cascade: ['insert', 'update']
    })
    @JoinColumn({ name: 'orphanageId' })
    images: Image[];
}