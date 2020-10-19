import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';

import Orphanage from './Orphanage';

@Entity('images')
export default class Image {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @ManyToOne(() => Orphanage, orphanage => orphanage.images)
    @JoinColumn({ name: 'orphanageId' })
    orphanage: Orphanage;
}