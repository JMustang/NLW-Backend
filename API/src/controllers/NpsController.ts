import { Response, Request } from "express";
import { getCustomRepository, Not, IsNull } from "typeorm";
import { SurveysUsersRepository } from "../repositories/SurveysUsersRepository";

/**
 * calculo de NPS
 * Detratores sao as notas de 0 a 6
 * passivos de 7 a 8
 * promotores sao de 9 a 10
 *
 * (numero de promotores - numero de detratores)/(numero de respondentes) x 100
 */

class NpsController {
  async execute(request: Request, response: Response) {
    const { survey_id } = request.params;
    const surveysUsersRepository = getCustomRepository(SurveysUsersRepository);
    const surveysUsers = await surveysUsersRepository.find({
      survey_id,
      value: Not(IsNull()),
    });
    const detractor = surveysUsers.filter(
      (survey) => survey.value >= 0 && survey.value <= 6
    ).length;
    const promoters = surveysUsers.filter(
      (survey) => survey.value >= 9 && survey.value <= 10
    ).length;
    const passive = surveysUsers.filter(
      (survey) => survey.value >= 7 && survey.value <= 8
    ).length;
    const totalAnswers = surveysUsers.length;
    const calculate = Number(
      (((promoters - detractor) / totalAnswers) * 100).toFixed(2)
    );

    return response.json({
      detractor,
      promoters,
      passive,
      totalAnswers,
      nps: calculate,
    });
  }
}

export { NpsController };
