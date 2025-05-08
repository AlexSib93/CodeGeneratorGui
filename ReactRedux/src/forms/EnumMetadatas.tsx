
import {  useContext, useEffect, useState } from "react";
import { EnumMetadata,  initEnumMetadata } from "../models/EnumMetadata";
import EnumMetadataService from "../services/EnumMetadataService";
import { Table } from "../components/Table";
import {Grid} from '../components/Grid';
import { setLoading, showErrorSnackbar, showSuccessSnackbar } from "../state/ui-state";
import { ContextApp } from "../state/state";
import EnumMetadataEditForm from "./EnumMetadataEditForm";

export interface IEnumMetadatasProps
{
    items: EnumMetadata[],
    autoFetch: boolean
}

export const EnumMetadatas = (props: IEnumMetadatasProps) => {

    const {state,dispatch} = useContext(ContextApp);
    const [item, setItem] = useState<EnumMetadata>(null);
    const [items, setItems] = useState<EnumMetadata[]>(props.items);


    useEffect(() => {
        if (props.autoFetch) {
            dispatch(setLoading(true));
            EnumMetadataService.getall().then((item) => {
                setItems(item);
            }).catch((err) => {
                dispatch(showErrorSnackbar(err));
            }).finally(() => {
                dispatch(setLoading(false));
            });
        }
    }, [])


    const addItem = () => {
        var newItem = { ...initEnumMetadata };
        setItem(newItem);
    }

    const handleAdd = (model: EnumMetadata) => {
        setItems([...items, model]);
    };

    const handleEdit = (model: EnumMetadata) => {
        var newItems = items.map(i => (i === item) ? model : i);
        setItems(newItems);
        setItem(null);
    };

    const handleDelete = (model: EnumMetadata) => {
        var newItems = items.filter(i => i !== model);
        setItems(newItems);
        EnumMetadataService.delete(model.idEnumMetadata);
    };

    const submitEditForm = (model: EnumMetadata) => {
        setItem(null);
            dispatch(setLoading(true));
        if (model && model.idEnumMetadata > 0) {
            EnumMetadataService.put(model)
                .then((item) => {
                    dispatch(showSuccessSnackbar('Объект успешно сохранен'));
                    handleEdit(item);
                }).catch((err) => {
                    dispatch(showErrorSnackbar(err));
                }).finally(() => {
                    dispatch(setLoading(false));
                });
        } else {
            EnumMetadataService
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
                <h1 className="h4 fw-normal">Тип-перечисление</h1>
            </div>
            <div className="card-text">
                <Grid items={items} onEdit={setItem} onDelete={handleDelete} onAdd={addItem}  enableFilters={true} props={[{Name:'idEnumMetadata', Caption: 'ID типа-перечисления', Visible: false, Type: 'int'}, {Name:'name', Caption: 'Наименование', Visible: true, Type: 'string'}, {Name:'caption', Caption: 'Отображаемое имя', Visible: true, Type: 'string'}]} />
            </div>
        </div>
      </div>
        </div>}
             {item && <div>
                <EnumMetadataEditForm model={item} onSave={submitEditForm} onCancel={cancelEdit} />
            </div> }
        </ div >
    };

  


