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
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2021, 9, 25, 12).getTime();
    });

    const appointment = await createAppointment.execute({
      date: new Date(2021, 9, 25, 14),
      provider_id: '123456',
      user_id: '1',
    });

    expect(appointment).toHaveProperty('id');
    expect(appointment.provider_id).toBe('123456');
  });

  it('should not to be able to create two appointments on the same time', async () => {
    const date = new Date(2021, 9, 26, 11);

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

  it('should be able to create a new appointment on a past date', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2021, 9, 25, 12).getTime();
    });

    await expect(
      createAppointment.execute({
        date: new Date(2021, 9, 25, 11),
        provider_id: '1234567',
        user_id: '1',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should be able to create a new appointment with same user as provider', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2021, 9, 25, 12).getTime();
    });

    await expect(
      createAppointment.execute({
        date: new Date(2021, 9, 25, 13),
        provider_id: '1234567',
        user_id: '1234567',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should be able to create a new appointment before 8h', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2021, 9, 25, 12).getTime();
    });

    await expect(
      createAppointment.execute({
        date: new Date(2021, 9, 26, 7),
        provider_id: 'provider_id',
        user_id: 'user_id',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should be able to create a new appointment after 17h', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2021, 9, 25, 12).getTime();
    });

    await expect(
      createAppointment.execute({
        date: new Date(2021, 9, 26, 18),
        provider_id: 'provider_id',
        user_id: 'user_id',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
