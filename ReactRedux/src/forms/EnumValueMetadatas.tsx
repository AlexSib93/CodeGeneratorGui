
import {  useContext, useEffect, useState } from "react";
import { EnumValueMetadata,  initEnumValueMetadata } from "../models/EnumValueMetadata";
import EnumValueMetadataService from "../services/EnumValueMetadataService";
import { Table } from "../components/Table";
import {Grid} from '../components/Grid';
import { setLoading, showErrorSnackbar, showSuccessSnackbar } from "../state/ui-state";
import { ContextApp } from "../state/state";
import EnumValueMetadataEditForm from "./EnumValueMetadataEditForm";

export interface IEnumValueMetadatasProps
{
    items: EnumValueMetadata[],
    autoFetch: boolean
}

export const EnumValueMetadatas = (props: IEnumValueMetadatasProps) => {

    const {state,dispatch} = useContext(ContextApp);
    const [item, setItem] = useState<EnumValueMetadata>(null);
    const [items, setItems] = useState<EnumValueMetadata[]>(props.items);


    useEffect(() => {
        if (props.autoFetch) {
            dispatch(setLoading(true));
            EnumValueMetadataService.getall().then((item) => {
                setItems(item);
            }).catch((err) => {
                dispatch(showErrorSnackbar(err));
            }).finally(() => {
                dispatch(setLoading(false));
            });
        }
    }, [])


    const addItem = () => {
        var newItem = { ...initEnumValueMetadata };
        setItem(newItem);
    }

    const handleAdd = (model: EnumValueMetadata) => {
        setItems([...items, model]);
    };

    const handleEdit = (model: EnumValueMetadata) => {
        var newItems = items.map(i => (i === item) ? model : i);
        setItems(newItems);
        setItem(null);
    };

    const handleDelete = (model: EnumValueMetadata) => {
        var newItems = items.filter(i => i !== model);
        setItems(newItems);
        EnumValueMetadataService.delete(model.idEnumValueMetadata);
    };

    const submitEditForm = (model: EnumValueMetadata) => {
        setItem(null);
            dispatch(setLoading(true));
        if (model && model.idEnumValueMetadata > 0) {
            EnumValueMetadataService.put(model)
                .then((item) => {
                    dispatch(showSuccessSnackbar('Объект успешно сохранен'));
                    handleEdit(item);
                }).catch((err) => {
                    dispatch(showErrorSnackbar(err));
                }).finally(() => {
                    dispatch(setLoading(false));
                });
        } else {
            EnumValueMetadataService
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
                <h1 className="h4 fw-normal">Значение типа-перечисления</h1>
            </div>
            <div className="card-text">
                <Grid items={items} onEdit={setItem} onDelete={handleDelete} onAdd={addItem}  enableFilters={true} props={[{Name:'idEnumValueMetadata', Caption: 'ID значения типа-перечисления', Visible: false, Type: 'int'}, {Name:'name', Caption: 'Наименование', Visible: true, Type: 'string'}, {Name:'caption', Caption: 'Отображаемое имя', Visible: true, Type: 'string'}]} />
            </div>
        </div>
      </div>
        </div>}
             {item && <div>
                <EnumValueMetadataEditForm model={item} onSave={submitEditForm} onCancel={cancelEdit} />
            </div> }
        </ div >
    };

  


