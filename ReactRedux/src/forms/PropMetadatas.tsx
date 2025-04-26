
import { useEffect,useState } from "react";
import { PropMetadata,  initPropMetadata } from "../models/PropMetadata";
import PropMetadataService from "../services/PropMetadataService";
import { Table } from "../components/Table";
import {Grid} from '../components/Grid';
import PropMetadataEditForm from "./PropMetadataEditForm";

export interface IPropMetadatasProps
{
    items: PropMetadata[],
    autoFetch: boolean
}

export const PropMetadatas = (props: IPropMetadatasProps) => {
    const [item, setItem] = useState<PropMetadata>(null);
    const [items, setItems] = useState<PropMetadata[]>(props.items);


    useEffect(() => {
        if (props.autoFetch) {
            PropMetadataService.getall().then((item) => {
                setItems(item);
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
        if (model && model.idPropMetadata > 0) {
            PropMetadataService.put(model).then((item) => {
                handleEdit(item);
            });
        } else {
            PropMetadataService.post(model).then((item) => {
                handleAdd(item);
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
                <Grid items={items} onEdit={setItem} onDelete={handleDelete} onAdd={addItem}  enableFilters={true} props={[{Name:'idPropMetadata', Caption: 'ID свойства', Visible: false, Type: 'int'}, {Name:'name', Caption: 'Наименование', Visible: true, Type: 'string'}, {Name:'type', Caption: 'Тип данных C#', Visible: true, Type: 'string'}, {Name:'caption', Caption: 'Отображаемое имя', Visible: true, Type: 'string'}]} />
            </div>
        </div>
      </div>
        </div>}
             {item && <div>
                <PropMetadataEditForm model={item} onSave={submitEditForm} onCancel={cancelEdit} />
            </div> }
        </ div >
    };

  


