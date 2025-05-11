export enum ComponentTypeEnum {
     Unknown = 0,
    DetailTable = 1,
    Input = 2,
    DateTime = 3,
    NumericUpDown = 4,
    CancelButton = 5,
    SubmitButton = 6,
    SaveButton = 7,
    LookUp = 8,
    Grid = 9,
    EnumLookUp = 10
}

export const componentTypeEnumToString = (value: ComponentTypeEnum): string => {
    let res: string = '';

    switch (value) {
                case ComponentTypeEnum.DetailTable:
                    res = "Таблица детейлов";
                    break;
                case ComponentTypeEnum.Input:
                    res = "Текстовое поле ввода";
                    break;
                case ComponentTypeEnum.DateTime:
                    res = "Поле выбора даты";
                    break;
                case ComponentTypeEnum.NumericUpDown:
                    res = "Поле ввода числа";
                    break;
                case ComponentTypeEnum.CancelButton:
                    res = "Кнопка отмены";
                    break;
                case ComponentTypeEnum.SubmitButton:
                    res = "Кнопка отправки формы";
                    break;
                case ComponentTypeEnum.SaveButton:
                    res = "Кнопка сохранения";
                    break;
                case ComponentTypeEnum.LookUp:
                    res = "Выпадающий список для выбора из справочника";
                    break;
                case ComponentTypeEnum.Grid:
                    res = "Таблица с фильтрами и сортировкой";
                    break;
                case ComponentTypeEnum.EnumLookUp:
                    res = "Выпадающий список для выбора из типа-перечисления";
                    break;

        default:
            break;
    }

    return res;
}

export const componentTypeEnumArray: string[] = ["Таблица детейлов", "Текстовое поле ввода", "Поле выбора даты", "Поле ввода числа", "Кнопка отмены", "Кнопка отправки формы", "Кнопка сохранения", "Выпадающий список для выбора из справочника", "Таблица с фильтрами и сортировкой", "Выпадающий список для выбора из типа-перечисления"];

export const initComponentTypeEnum = ComponentTypeEnum.Unknown