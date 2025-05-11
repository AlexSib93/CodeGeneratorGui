export enum UnitOfWorkEnum {
    MockUnit = 0,
    EfUnit = 1
}

export const unitOfWorkEnumToString = (value: UnitOfWorkEnum): string => {
    let res: string = '';

    switch (value) {
                case UnitOfWorkEnum.MockUnit:
                    res = "Хранилище в оперативной памяти Хоста";
                    break;
                case UnitOfWorkEnum.EfUnit:
                    res = "База данных с доступом через Entity FrameWork Core";
                    break;

        default:
            break;
    }

    return res;
}

export const unitOfWorkEnumArray: string[] = ["Хранилище в оперативной памяти Хоста", "База данных с доступом через Entity FrameWork Core"];

export const initUnitOfWorkEnum = UnitOfWorkEnum.MockUnit