export enum PropTypeEnum {
    Single = 0,
    Master = 1,
    Detail = 2,
    DictValue = 3,
    Enum = 4,
    CalcValue = 5
}

export const propTypeEnumToString = (value: PropTypeEnum): string => {
    let res: string = '';

    switch (value) {
                case PropTypeEnum.Single:
                    res = "Свойство примитивного типа";
                    break;
                case PropTypeEnum.Master:
                    res = "Свойство ссылка на Матера (объект-родитель)";
                    break;
                case PropTypeEnum.Detail:
                    res = "Свойство детейлов";
                    break;
                case PropTypeEnum.DictValue:
                    res = "Свойство - значение выбираемое из справочника";
                    break;
                case PropTypeEnum.Enum:
                    res = "Свойство перечисления";
                    break;
                case PropTypeEnum.CalcValue:
                    res = "Вычислимое свойство";
                    break;

        default:
            break;
    }

    return res;
}

export const propTypeEnumArray: string[] = ["Свойство примитивного типа", "Свойство ссылка на Матера (объект-родитель)", "Свойство детейлов", "Свойство - значение выбираемое из справочника", "Свойство перечисления", "Вычислимое свойство"];

export const initPropTypeEnum = PropTypeEnum.Single