import AppError from '@shared/errors/AppError';

import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository';
import CreateAppointmentService from './CreateAppointmentService';

let fakeAppointmentsRepository: FakeAppointmentsRepository;
let createAppointment: CreateAppointmentService;

describe('CreateAppointment', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository();
    createAppointment = new CreateAppointmentService(
      fakeAppointmentsRepository,
    );
  });

  it('should be able to create a new appointment', async () => {
    const appointment = await createAppointment.execute({
      date: new Date(),
      provider_id: '123456',
      user_id: '1',
    });

    expect(appointment).toHaveProperty('id');
    expect(appointment.provider_id).toBe('123456');
  });

  it('should not to be able to create two appointments on the same time', async () => {
    const date = new Date(2021, 9, 13, 11);

    await createAppointment.execute({
      date,
      provider_id: '123456',
      user_id: '1',
    });

    await expect(
      createAppointment.execute({
        date,
        provider_id: '1234567',
        user_id: '1',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
