
import {  useContext, useEffect, useState } from "react";
import { ModelMetadata,  initModelMetadata } from "../models/ModelMetadata";
import ModelMetadataService from "../services/ModelMetadataService";
import { Table } from "../components/Table";
import {Grid} from '../components/Grid';
import { setLoading, showErrorSnackbar, showSuccessSnackbar } from "../state/ui-state";
import { ContextApp } from "../state/state";
import ModelMetadataEditForm from "./ModelMetadataEditForm";

export interface IModelMetadatasProps
{
    items: ModelMetadata[],
    autoFetch: boolean
}

export const ModelMetadatas = (props: IModelMetadatasProps) => {

    const {state,dispatch} = useContext(ContextApp);
    const [item, setItem] = useState<ModelMetadata>(null);
    const [items, setItems] = useState<ModelMetadata[]>(props.items);


    useEffect(() => {
        if (props.autoFetch) {
            dispatch(setLoading(true));
            ModelMetadataService.getall().then((item) => {
                setItems(item);
            }).catch((err) => {
                dispatch(showErrorSnackbar(err));
            }).finally(() => {
                dispatch(setLoading(false));
            });
        }
    }, [])


    const addItem = () => {
        var newItem = { ...initModelMetadata };
        setItem(newItem);
    }

    const handleAdd = (model: ModelMetadata) => {
        setItems([...items, model]);
    };

    const handleEdit = (model: ModelMetadata) => {
        var newItems = items.map(i => (i === item) ? model : i);
        setItems(newItems);
        setItem(null);
    };

    const handleDelete = (model: ModelMetadata) => {
        var newItems = items.filter(i => i !== model);
        setItems(newItems);
        ModelMetadataService.delete(model.idModelMetadata);
    };

    const submitEditForm = (model: ModelMetadata) => {
        setItem(null);
            dispatch(setLoading(true));
        if (model && model.idModelMetadata > 0) {
            ModelMetadataService.put(model)
                .then((item) => {
                    dispatch(showSuccessSnackbar('Объект успешно сохранен'));
                    handleEdit(item);
                }).catch((err) => {
                    dispatch(showErrorSnackbar(err));
                }).finally(() => {
                    dispatch(setLoading(false));
                });
        } else {
            ModelMetadataService
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
                <h1 className="h4 fw-normal">Модель</h1>
            </div>
            <div className="card-text">
                <Grid items={items} onEdit={setItem} onDelete={handleDelete} onAdd={addItem}  enableFilters={true} props={[{Name:'idModelMetadata', Caption: 'ID', Visible: false, Type: 'int'}, {Name:'name', Caption: 'Имя', Visible: true, Type: 'string'}, {Name:'initData', Caption: 'Начальные данные', Visible: true, Type: 'string'}, {Name:'nameSpace', Caption: 'Пространство имен', Visible: true, Type: 'string'}, {Name:'caption', Caption: 'Отображаемое имя', Visible: true, Type: 'string'}]} />
            </div>
        </div>
      </div>
        </div>}
             {item && <div>
                <ModelMetadataEditForm model={item} onSave={submitEditForm} onCancel={cancelEdit} />
            </div> }
        </ div >
    };

  


