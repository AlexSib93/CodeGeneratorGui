
import {  useContext, useEffect, useState } from "react";
import { FormMetadata,  initFormMetadata } from "../models/FormMetadata";
import FormMetadataService from "../services/FormMetadataService";
import { Table } from "../components/Table";
import {Grid} from '../components/Grid';
import { setLoading, showErrorSnackbar, showSuccessSnackbar } from "../state/ui-state";
import { ContextApp } from "../state/state";
import FormMetadataEditForm from "./FormMetadataEditForm";

export interface IFormMetadatasProps
{
    items: FormMetadata[],
    autoFetch: boolean
}

export const FormMetadatas = (props: IFormMetadatasProps) => {

    const {state,dispatch} = useContext(ContextApp);
    const [item, setItem] = useState<FormMetadata>(null);
    const [items, setItems] = useState<FormMetadata[]>(props.items);


    useEffect(() => {
        if (props.autoFetch) {
            dispatch(setLoading(true));
            FormMetadataService.getall().then((item) => {
                setItems(item);
            }).catch((err) => {
                dispatch(showErrorSnackbar(err));
            }).finally(() => {
                dispatch(setLoading(false));
            });
        }
    }, [])


    const addItem = () => {
        var newItem = { ...initFormMetadata };
        setItem(newItem);
    }

    const handleAdd = (model: FormMetadata) => {
        setItems([...items, model]);
    };

    const handleEdit = (model: FormMetadata) => {
        var newItems = items.map(i => (i === item) ? model : i);
        setItems(newItems);
        setItem(null);
    };

    const handleDelete = (model: FormMetadata) => {
        var newItems = items.filter(i => i !== model);
        setItems(newItems);
        FormMetadataService.delete(model.idFormMetadata);
    };

    const submitEditForm = (model: FormMetadata) => {
        setItem(null);
            dispatch(setLoading(true));
        if (model && model.idFormMetadata > 0) {
            FormMetadataService.put(model)
                .then((item) => {
                    dispatch(showSuccessSnackbar('Объект успешно сохранен'));
                    handleEdit(item);
                }).catch((err) => {
                    dispatch(showErrorSnackbar(err));
                }).finally(() => {
                    dispatch(setLoading(false));
                });
        } else {
            FormMetadataService
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
                <h1 className="h4 fw-normal">Форма</h1>
            </div>
            <div className="card-text">
                <Grid items={items} onEdit={setItem} onDelete={handleDelete} onAdd={addItem}  enableFilters={true} props={[{Name:'idFormMetadata', Caption: 'ID формы', Visible: false, Type: 'int'}, {Name:'name', Caption: 'Наименование', Visible: true, Type: 'string'}, {Name:'caption', Caption: 'Отображаемое имя', Visible: true, Type: 'string'}, {Name:'description', Caption: 'Описание', Visible: true, Type: 'string'}, {Name:'addToNavBar', Caption: 'Добавить в панель навигации', Visible: true, Type: 'bool'}]} />
            </div>
        </div>
      </div>
        </div>}
             {item && <div>
                <FormMetadataEditForm model={item} onSave={submitEditForm} onCancel={cancelEdit} />
            </div> }
        </ div >
    };

  


