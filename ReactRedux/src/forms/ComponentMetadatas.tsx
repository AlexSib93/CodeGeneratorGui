
import {  useContext, useEffect, useState } from "react";
import { ComponentMetadata,  initComponentMetadata } from "../models/ComponentMetadata";
import ComponentMetadataService from "../services/ComponentMetadataService";
import { Table } from "../components/Table";
import {Grid} from '../components/Grid';
import { setLoading, showErrorSnackbar, showSuccessSnackbar } from "../state/ui-state";
import { ContextApp } from "../state/state";
import { componentTypeEnumArray, componentTypeEnumToString } from "../enums/ComponentTypeEnum";
import ComponentMetadataEditForm from "./ComponentMetadataEditForm";

export interface IComponentMetadatasProps
{
    items: ComponentMetadata[],
    autoFetch: boolean
}

export const ComponentMetadatas = (props: IComponentMetadatasProps) => {

    const {state,dispatch} = useContext(ContextApp);
    const [item, setItem] = useState<ComponentMetadata>(null);
    const [items, setItems] = useState<ComponentMetadata[]>(props.items);


    useEffect(() => {
        if (props.autoFetch) {
            dispatch(setLoading(true));
            ComponentMetadataService.getall().then((item) => {
                setItems(item);
            }).catch((err) => {
                dispatch(showErrorSnackbar(err));
            }).finally(() => {
                dispatch(setLoading(false));
            });
        }
    }, [])


    const addItem = () => {
        var newItem = { ...initComponentMetadata };
        setItem(newItem);
    }

    const handleAdd = (model: ComponentMetadata) => {
        setItems([...items, model]);
    };

    const handleEdit = (model: ComponentMetadata) => {
        var newItems = items.map(i => (i === item) ? model : i);
        setItems(newItems);
        setItem(null);
    };

    const handleDelete = (model: ComponentMetadata) => {
        var newItems = items.filter(i => i !== model);
        setItems(newItems);
        ComponentMetadataService.delete(model.idComponentMetadata);
    };

    const submitEditForm = (model: ComponentMetadata) => {
        setItem(null);
            dispatch(setLoading(true));
        if (model && model.idComponentMetadata > 0) {
            ComponentMetadataService.put(model)
                .then((item) => {
                    dispatch(showSuccessSnackbar('Объект успешно сохранен'));
                    handleEdit(item);
                }).catch((err) => {
                    dispatch(showErrorSnackbar(err));
                }).finally(() => {
                    dispatch(setLoading(false));
                });
        } else {
            ComponentMetadataService
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
                <h1 className="h4 fw-normal">Компонент формы</h1>
            </div>
            <div className="card-text">
                <Grid items={items} onEdit={setItem} onDelete={handleDelete} onAdd={addItem}  enableFilters={true} props={[{Name:'idComponentMetadata', Caption: 'ID компонента формы', Visible: false, Type: 'int'}, {Name:'name', Caption: 'Наименование', Visible: true, Type: 'string'}, {Name:'caption', Caption: 'Отображаемое имя', Visible: true, Type: 'string'}, {Name:'description', Caption: 'Описание', Visible: true, Type: 'string'}, {Name:'type', Caption: 'Тип компонента', Visible: true, Type: 'Set', ToString: componentTypeEnumToString, Values: componentTypeEnumArray }, {Name:'typeString', Caption: 'Тип компонента', Visible: true, Type: 'string'}, {Name:'modelProp', Caption: 'Компонент свойства модели', Visible: true, Type: 'bool'}]} />
            </div>
        </div>
      </div>
        </div>}
             {item && <div>
                <ComponentMetadataEditForm model={item} onSave={submitEditForm} onCancel={cancelEdit} />
            </div> }
        </ div >
    };

  


