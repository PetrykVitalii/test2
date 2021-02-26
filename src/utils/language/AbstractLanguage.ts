export enum LANGUAGES {
  EN = 'EN',
  SG = 'SG',
  ID = 'ID',
  TH = 'TH',
  ZH = 'ZH'
}
type LanguagesEnumValues = keyof typeof LANGUAGES;
type ISelector = { [key in LanguagesEnumValues]: string };

export default abstract class AbstractLanguage {
  constructor(private ln: LanguagesEnumValues) {}

  protected getText(selector: ISelector) {
    return selector[this.ln];
  }
}
