import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class images1602720286291 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'images',
            columns: [{
                name: 'id',
                type: 'integer',
                unsigned: true,
                isPrimary: true,
                isGenerated: true,
                generationStrategy: 'increment'
            },
            {
                name: 'name',
                type: 'varchar'
            },
            {
                name: 'orphanageId',
                type: 'integer'
            }
        ],
        foreignKeys: [
            {
                name: 'OrphanageImages',
                columnNames: ['orphanageId'],
                referencedTableName: 'orphanages',
                referencedColumnNames: ['id'],
                onUpdate: 'CASCADE',
                onDelete: 'CASCADE'
            }
        ]
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('images');
    }

}
