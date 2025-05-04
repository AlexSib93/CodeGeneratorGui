
import {  useContext, useEffect, useState } from "react";
import { PropMetadata,  initPropMetadata } from "../models/PropMetadata";
import PropMetadataService from "../services/PropMetadataService";
import { Table } from "../components/Table";
import {Grid} from '../components/Grid';
import { setLoading, showErrorSnackbar, showSuccessSnackbar } from "../state/ui-state";
import { ContextApp } from "../state/state";
import PropMetadataEditForm from "./PropMetadataEditForm";

export interface IPropMetadatasProps
{
    items: PropMetadata[],
    autoFetch: boolean
}

export const PropMetadatas = (props: IPropMetadatasProps) => {

    const {state,dispatch} = useContext(ContextApp);
    const [item, setItem] = useState<PropMetadata>(null);
    const [items, setItems] = useState<PropMetadata[]>(props.items);


    useEffect(() => {
        if (props.autoFetch) {
            dispatch(setLoading(true));
            PropMetadataService.getall().then((item) => {
                setItems(item);
            }).catch((err) => {
                dispatch(showErrorSnackbar(err));
            }).finally(() => {
                dispatch(setLoading(false));
            });
        }
    }, [])


    const addItem = () => {
        var newItem = { ...initPropMetadata };
        setItem(newItem);
    }

    const handleAdd = (model: PropMetadata) => {
        setItems([...items, model]);
    };

    const handleEdit = (model: PropMetadata) => {
        var newItems = items.map(i => (i === item) ? model : i);
        setItems(newItems);
        setItem(null);
    };

    const handleDelete = (model: PropMetadata) => {
        var newItems = items.filter(i => i !== model);
        setItems(newItems);
        PropMetadataService.delete(model.idPropMetadata);
    };

    const submitEditForm = (model: PropMetadata) => {
        setItem(null);
            dispatch(setLoading(true));
        if (model && model.idPropMetadata > 0) {
            PropMetadataService.put(model)
                .then((item) => {
                    dispatch(showSuccessSnackbar('Объект успешно сохранен'));
                    handleEdit(item);
                }).catch((err) => {
                    dispatch(showErrorSnackbar(err));
                }).finally(() => {
                    dispatch(setLoading(false));
                });
        } else {
            PropMetadataService
            .post(model).then((item) => {
                handleAdd(item);
                dispatch(showSuccessSnackbar('Объект успешно создан'));
            }).catch((err) => {
                dispatch(showErrorSnackbar(err));
            }).finally(() => {
                dispatch(setLoading(false));
            });
        }

    }

    const cancelEdit = () => {
        setItem(null);
    }

    return <div className="table-responsive" >
        { !item && <div>
                  <div className="m-3 card">    
        <div className="card-body"> 
            <div className="card-title">
                <h1 className="h4 fw-normal">Свойство</h1>
            </div>
            <div className="card-text">
                <Grid items={items} onEdit={setItem} onDelete={handleDelete} onAdd={addItem}  enableFilters={true} props={[{Name:'idPropMetadata', Caption: 'ID свойства', Visible: false, Type: 'int'}, {Name:'name', Caption: 'Наименование', Visible: true, Type: 'string'}, {Name:'type', Caption: 'Тип данных C#', Visible: true, Type: 'string'}, {Name:'caption', Caption: 'Отображаемое имя', Visible: true, Type: 'string'}, {Name:'isPrimaryKey', Caption: 'Первичный ключ', Visible: true, Type: 'bool'}, {Name:'isVirtual', Caption: 'Свойство внешней связи', Visible: true, Type: 'bool'}, {Name:'visible', Caption: 'Отображать свойство в интерфейсе', Visible: true, Type: 'bool'}, {Name:'editable', Caption: 'Доступ к редактированию поля', Visible: true, Type: 'bool'}, {Name:'jsonIgnore', Caption: 'Не передавать на клиент', Visible: true, Type: 'bool'}, {Name:'isEnumerable', Caption: 'Перечисление', Visible: false, Type: 'bool'}, {Name:'isMasterProp', Caption: 'Ссылка на мастера', Visible: false, Type: 'bool'}, {Name:'isDetailsProp', Caption: 'Детейл', Visible: false, Type: 'bool'}, {Name:'isDictValueProp', Caption: 'Значение из справочника', Visible: false, Type: 'bool'}]} />
            </div>
        </div>
      </div>
        </div>}
             {item && <div>
                <PropMetadataEditForm model={item} onSave={submitEditForm} onCancel={cancelEdit} />
            </div> }
        </ div >
    };

  


