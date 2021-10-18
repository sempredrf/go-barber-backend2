import AppError from '@shared/errors/AppError';

import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository';
import ListProviderMonthAvailabilityService from './ListProviderMonthAvailabilityService';

let fakeAppointmentsRepository: FakeAppointmentsRepository;
let listProviderMonthAvailability: ListProviderMonthAvailabilityService;

describe('ListProviderMonthAvailability', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository();
    listProviderMonthAvailability = new ListProviderMonthAvailabilityService(
      fakeAppointmentsRepository,
    );
  });

  it('should be able to list the month availability from provider', async () => {
    await fakeAppointmentsRepository.create({
      provider_id: 'user',
      date: new Date(2021, 9, 18, 8, 0, 0),
    });

    await fakeAppointmentsRepository.create({
      provider_id: 'user',
      date: new Date(2021, 9, 18, 10, 0, 0),
    });

    await fakeAppointmentsRepository.create({
      provider_id: 'user',
      date: new Date(2021, 9, 19, 10, 0, 0),
    });

    const availability = await listProviderMonthAvailability.execute({
      provider_id: 'user',
      year: 2021,
      month: 10,
    });

    expect(availability).toEqual(
      expect.arrayContaining([
        { day: 17, available: true },
        { day: 18, available: false },
        { day: 19, available: false },
        { day: 20, available: true },
      ]),
    );
  });
});