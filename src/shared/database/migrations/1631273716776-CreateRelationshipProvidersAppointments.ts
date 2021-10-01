import { MigrationInterface, QueryRunner, TableForeignKey } from 'typeorm';

export default class CreateRelationshipProvidersAppointments1631273716776
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createForeignKey(
      'appointments',
      new TableForeignKey({
        name: 'appointments_provider_id_fk',
        columnNames: ['provider_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'users',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey(
      'appointments',
      'appointments_provider_id_fk',
    );
  }
}
