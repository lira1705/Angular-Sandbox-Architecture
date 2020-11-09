import { AnalyticsInterface } from '../interfaces/analytics.interface';
import { v4 as uuid } from 'uuid';

export class BotModel  {
  private static readonly SHORT_NAME_KEY = 'shortName';
  private static readonly NAME_KEY = 'name';
  private static readonly DESCRIPTION_KEY = 'description';
  private static readonly IMAGE_KEY = 'image';
  private static readonly TEMPLATE_KEY = 'template';
  private static readonly CREATED_KEY = 'created';
  private static readonly UPDATED_KEY = 'updated';
  private static readonly PLAN_KEY = 'plan';
  private static readonly CULTURE_KEY = 'culture';
  private static readonly ANALYTICS_KEY = 'analytics';

  constructor(
    public id: string,
    public shortName: string,
    public name: string,
    public description: string,
    public image: string,
    public template: string,
    public created: Date,
    public updated: Date,
    public plan: string,
    public culture: string,
    public analytics: AnalyticsInterface,
    public favorite: boolean
  ) {
  }

  public static fromObject(obj: object): BotModel {
    const id = uuid();
    const shortName = obj[BotModel.SHORT_NAME_KEY];
    const name = obj[BotModel.NAME_KEY];
    const description = obj[BotModel.DESCRIPTION_KEY];
    const image = obj[BotModel.IMAGE_KEY];
    const template = obj[BotModel.TEMPLATE_KEY];
    const created = new Date(obj[BotModel.CREATED_KEY]);
    const updated = new Date(obj[BotModel.UPDATED_KEY]);
    const plan = obj[BotModel.PLAN_KEY];
    const culture = obj[BotModel.CULTURE_KEY];
    const analytics = obj[BotModel.ANALYTICS_KEY];
    const favorite = false;


    return new BotModel(id, shortName, name, description, image, template, created, updated, plan, culture, analytics, favorite);
  }

  public static fromList(objList: object[]): BotModel[] {
    const botList: BotModel[] = [];
    for (const obj of objList) {
      botList.push(BotModel.fromObject(obj));
    }
    return botList;
  }
}
