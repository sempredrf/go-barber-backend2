import { getHours, isBefore, startOfHour } from 'date-fns';
import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import Appointment from '../infra/typeorm/entities/Appointment';

import IAppointmentsRepository from '../repositories/IAppointmentsRepository';

interface IRequest {
  provider_id: string;
  user_id: string;
  date: Date;
}

@injectable()
class CreateAppointmentService {
  constructor(
    @inject('AppointmentsRepository')
    private appointmentsRepository: IAppointmentsRepository,
  ) {}

  public async execute({
    provider_id,
    user_id,
    date,
  }: IRequest): Promise<Appointment> {
    if (provider_id === user_id) {
      throw new AppError("You can't create an appointment with yourself.");
    }

    const appointmentDate = startOfHour(date);

    if (getHours(appointmentDate) < 8 || getHours(appointmentDate) > 17) {
      throw new AppError(
        "You can't create an appointment outside the range 8am to 5pm.",
      );
    }

    if (isBefore(appointmentDate, Date.now())) {
      throw new AppError("You can't create an appointment on a past date.");
    }

    const findAppoitmentInSameDate =
      await this.appointmentsRepository.findByDate(appointmentDate);

    if (findAppoitmentInSameDate) {
      throw new AppError('This appointment is already booked');
    }

    const appointment = await this.appointmentsRepository.create({
      provider_id,
      user_id,
      date: appointmentDate,
    });

    return appointment;
  }
}

export default CreateAppointmentService;
